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
  fetchNewConfessions: () => Promise<{
    success: boolean;
    count: number;
    message: string;
  }>;
  shouldShowBanner: boolean;
  isLoading: boolean;
  error: Error | null;
}

const DB_VERSION = 1;
const DB_NAME = "holy-tab-db";
const STORE_NAME = "confessions";

const BANNER_INTERVAL_MS = 3 * 7 * 24 * 60 * 60 * 1000;
const LAST_BANNER_SHOWN_KEY = "holy-tab-last-banner-shown";
const CONFESSION_UPDATE_URL =
  "https://holytab.adedoyin.dev/api/confessions/update";

export function useConfessionDB(): UseConfessionDBReturn {
  const [db, setDB] = useState<IDBPDatabase | null>(null);
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [shouldShowBanner, setShouldShowBanner] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const checkBannerTiming = () => {
    const lastShown = localStorage.getItem(LAST_BANNER_SHOWN_KEY);
    if (!lastShown) {
      // Show banner if localStorage is cleared (user manually cleared or first time)
      setShouldShowBanner(true);
      return;
    }

    const lastShownTime = parseInt(lastShown, 10);
    const now = Date.now();
    const timeSinceLastShown = now - lastShownTime;

    if (timeSinceLastShown >= BANNER_INTERVAL_MS) {
      setShouldShowBanner(true);
    } else {
      setShouldShowBanner(false);
    }
  };

  const markBannerAsShown = () => {
    localStorage.setItem(LAST_BANNER_SHOWN_KEY, Date.now().toString());
    setShouldShowBanner(false);
  };

  const fetchNewConfessions = async (): Promise<{
    success: boolean;
    count: number;
    message: string;
  }> => {
    if (!db) throw new Error("Database not initialized");

    try {
      const response = await fetch(CONFESSION_UPDATE_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch confessions: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to fetch confessions");
      }

      const newConfessions = data.data.confessions;
      if (!newConfessions || newConfessions.length === 0) {
        return {
          success: false,
          count: 0,
          message: "No new confessions available to update.",
        };
      }

      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const existingConfessions = await store.getAll();
      const existingTexts = new Set(existingConfessions.map((c) => c.text));

      let addedCount = 0;
      const writeTx = db.transaction(STORE_NAME, "readwrite");
      const writeStore = writeTx.objectStore(STORE_NAME);

      for (const text of newConfessions) {
        if (!existingTexts.has(text)) {
          const confession: Omit<Confession, "id"> = {
            text,
            timestamp: Date.now(),
          };
          await writeStore.add(confession);
          addedCount++;
        }
      }

      const updatedConfessions = await writeStore.getAll();
      setConfessions(updatedConfessions);

      markBannerAsShown();

      if (addedCount === 0) {
        return {
          success: true,
          count: 0,
          message: "Your confessions are already up to date!",
        };
      }

      return {
        success: true,
        count: addedCount,
        message: `Successfully updated ${addedCount} new confessions!`,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update confessions";
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    if (isInitialized) return;

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

        const tx = database.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const items = await store.getAll();

        if (items.length === 0) {
          try {
            const response = await fetch(CONFESSION_UPDATE_URL, {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (response.ok) {
              const data = await response.json();
              if (data.success && data.data.confessions) {
                const writeTx = database.transaction(STORE_NAME, "readwrite");
                const writeStore = writeTx.objectStore(STORE_NAME);

                const existingConfessions = await writeStore.getAll();
                const existingTexts = new Set(
                  existingConfessions.map((c) => c.text),
                );

                for (const text of data.data.confessions) {
                  if (!existingTexts.has(text)) {
                    await writeStore.add({
                      text,
                      timestamp: Date.now(),
                    });
                  }
                }

                const newTx = database.transaction(STORE_NAME, "readonly");
                const newStore = newTx.objectStore(STORE_NAME);
                const newItems = await newStore.getAll();
                setConfessions(newItems);

                markBannerAsShown();
              } else {
                setConfessions([]);
              }
            } else {
              setConfessions([]);
            }
          } catch (err) {
            console.warn("Failed to fetch initial confessions:", err);
            setConfessions([]);
          }
        } else {
          setConfessions(items);
        }

        setIsLoading(false);
        setIsInitialized(true);

        checkBannerTiming();
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to initialize database"),
        );
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initDB();

    return () => {
      if (db) {
        db.close();
      }
    };
  }, [isInitialized]);

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

      const updatedConfessions = await store.getAll();
      setConfessions(updatedConfessions);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to add confession"),
      );
      throw err;
    }
  };

  const updateConfessions = async (newConfessions: string[]) => {
    if (!db) throw new Error("Database not initialized");

    try {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const existingConfessions = await store.getAll();
      const existingTexts = new Set(existingConfessions.map((c) => c.text));

      for (const text of newConfessions) {
        if (!existingTexts.has(text)) {
          const confession: Omit<Confession, "id"> = {
            text,
            timestamp: Date.now(),
          };
          await store.add(confession);
        }
      }

      const updatedConfessions = await store.getAll();
      setConfessions(updatedConfessions);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to update confessions"),
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
        err instanceof Error ? err : new Error("Failed to clear confessions"),
      );
      throw err;
    }
  };

  return {
    error,
    isLoading,
    confessions,
    addConfession,
    shouldShowBanner,
    clearConfessions,
    updateConfessions,
    fetchNewConfessions,
  };
}
