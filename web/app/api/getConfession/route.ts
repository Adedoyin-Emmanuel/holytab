import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Load confessions from the data file
    const dataPath = path.join(process.cwd(), "app/data/data.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(fileContent);
    const confessions = data.affirmations || [];

    if (confessions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No confessions available",
        },
        { status: 404 }
      );
    }

    // Get a random confession
    const randomIndex = Math.floor(Math.random() * confessions.length);
    const confession = confessions[randomIndex];

    return NextResponse.json(
      {
        success: true,
        confession,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error loading confession:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to load confession",
      },
      { status: 500 }
    );
  }
}
