import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

let cachedData: any = null;

function loadConfessions(forceReload: boolean = false) {
  if (!cachedData || forceReload) {
    try {
      const dataPath = path.join(process.cwd(), "app/data/data.json");
      if (!fs.existsSync(dataPath)) {
        console.error("Data file not found at:", dataPath);
        return [];
      }
      const fileContent = fs.readFileSync(dataPath, "utf-8");
      const data = JSON.parse(fileContent);
      cachedData = data.affirmations || [];

      console.log("Cached data:", cachedData);
      console.log("Cached data length:", cachedData.length);
    } catch (error) {
      console.error("Error loading confessions:", error);
      return [];
    }
  }
  return cachedData;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: Request) {
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    const confessions = loadConfessions(true);

    if (confessions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No confessions available",
          data: {
            total: 0,
            confessions: [],
          },
        },
        {
          status: 404,
          headers,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Confessions retrieved successfully",
        success: true,
        data: {
          total: confessions.length,
          confessions: confessions,
        },
      },
      {
        status: 200,
        headers,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message:
          err instanceof Error ? err.message : "Failed to retrieve confessions",
        success: false,
        data: {},
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}
