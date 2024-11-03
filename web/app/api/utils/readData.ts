import fs from "fs";
import path from "path";

export const dataPath = path.join(process.cwd(), "app/data", "data.json");
export const readData = () => {
  try {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, JSON.stringify({ affirmations: [] }), "utf-8");
      return { affirmations: [] };
    }

    const fileContent = fs.readFileSync(dataPath, "utf-8");

    if (!fileContent.trim()) {
      const defaultData = { affirmations: [] };
      fs.writeFileSync(dataPath, JSON.stringify(defaultData), "utf-8");
      return defaultData;
    }

    try {
      return JSON.parse(fileContent);
    } catch (parseError) {
      const defaultData = { affirmations: [] };
      fs.writeFileSync(dataPath, JSON.stringify(defaultData), "utf-8");
      return defaultData;
    }
  } catch (error) {
    throw new Error("Failed to read data file");
  }
};
