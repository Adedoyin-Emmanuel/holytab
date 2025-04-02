import { useState, useEffect } from "react";
import { openDB, IDBPDatabase } from "idb";

interface Confession {
  id: number;
  text: string;
  timestamp: number;
}

interface UseConfessionDBReturn {
  confessions: Confession[];
  addConfession: (text: string) => Promise<void>;
  updateConfessions: (newConfessions: string[]) => Promise<void>;
  clearConfessions: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

const DB_NAME = "holy-tab-db";
const STORE_NAME = "confessions";
const DB_VERSION = 1;

// Default confessions that will be loaded when the DB is first created
const DEFAULT_CONFESSIONS = [
  "I am the LORD, the God of all mankind. Is anything too hard for me?",
  "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
  "The LORD is my shepherd, I lack nothing.",
  "I can do all things through Christ who strengthens me.",
  "Greater is He that is in me than he that is in the world.",
];

export function useConfessionDB(): UseConfessionDBReturn {
  const [db, setDB] = useState<IDBPDatabase | null>(null);
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB(DB_NAME, DB_VERSION, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
              db.createObjectStore(STORE_NAME, {
                keyPath: "id",
                autoIncrement: true,
              });
            }
          },
        });
        setDB(database);

        // Load initial confessions
        const tx = database.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const items = await store.getAll();

        // If no confessions exist, add the default ones
        if (items.length === 0) {
          const writeTx = database.transaction(STORE_NAME, "readwrite");
          const writeStore = writeTx.objectStore(STORE_NAME);

          for (const text of DEFAULT_CONFESSIONS) {
            await writeStore.add({
              text,
              timestamp: Date.now(),
            });
          }

          // Get the newly added confessions
          const newTx = database.transaction(STORE_NAME, "readonly");
          const newStore = newTx.objectStore(STORE_NAME);
          const newItems = await newStore.getAll();
          setConfessions(newItems);
        } else {
          setConfessions(items);
        }

        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to initialize database")
        );
        setIsLoading(false);
      }
    };

    initDB();

    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  const addConfession = async (text: string) => {
    if (!db) throw new Error("Database not initialized");

    try {
      const confession: Omit<Confession, "id"> = {
        text,
        timestamp: Date.now(),
      };

      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      await store.add(confession);

      // Refresh confessions list
      const updatedConfessions = await store.getAll();
      setConfessions(updatedConfessions);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to add confession")
      );
      throw err;
    }
  };

  const updateConfessions = async (newConfessions: string[]) => {
    if (!db) throw new Error("Database not initialized");

    try {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      // Get existing confession texts
      const existingConfessions = await store.getAll();
      const existingTexts = new Set(existingConfessions.map((c) => c.text));

      // Only add confessions that don't already exist
      for (const text of newConfessions) {
        if (!existingTexts.has(text)) {
          const confession: Omit<Confession, "id"> = {
            text,
            timestamp: Date.now(),
          };
          await store.add(confession);
        }
      }

      // Refresh confessions list
      const updatedConfessions = await store.getAll();
      setConfessions(updatedConfessions);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to update confessions")
      );
      throw err;
    }
  };

  const clearConfessions = async () => {
    if (!db) throw new Error("Database not initialized");

    try {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      await store.clear();
      setConfessions([]);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to clear confessions")
      );
      throw err;
    }
  };

  return {
    confessions,
    addConfession,
    updateConfessions,
    clearConfessions,
    isLoading,
    error,
  };
}
