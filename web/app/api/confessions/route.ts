import { NextResponse } from "next/server";
import { confessionSchema } from "../schema/schema";
import { shuffleArray } from "../utils/shuffle";
import { rateLimiterMiddleware } from "../middlewares/limiter";
import path from "path";
import fs from "fs";

let cachedData: any = null;
let lastIndex = 0;

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
    // Add CORS headers to the response
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    const rateLimitResponse = await rateLimiterMiddleware(req);
    if (rateLimitResponse) {
      return new NextResponse(JSON.stringify(rateLimitResponse.body), {
        status: rateLimitResponse.status,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
    }

    const body = await req.json();
    const { error, value } = confessionSchema.validate(body);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.details[0].message,
        },
        {
          status: 400,
          headers,
        }
      );
    }

    const { skip = 0, take = 10, search = "", mode = "random" } = value;
    let confessions = loadConfessions();

    if (confessions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No confessions available",
          data: {
            total: 0,
            count: 0,
            confessions: [],
          },
        },
        {
          status: 404,
          headers,
        }
      );
    }

    if (search) {
      confessions = confessions.filter((confession: string) =>
        confession.toLowerCase().includes(search.toLowerCase())
      );
    }

    let selectedConfessions: string[];
    if (mode === "random") {
      selectedConfessions = shuffleArray([...confessions]).slice(0, take);
    } else {
      const startIndex = skip % confessions.length;
      selectedConfessions = [];
      for (let i = 0; i < take; i++) {
        const index = (startIndex + i) % confessions.length;
        selectedConfessions.push(confessions[index]);
      }
      lastIndex = (startIndex + take) % confessions.length;
    }

    return NextResponse.json(
      {
        message: "Confessions retrieved successfully",
        success: true,
        data: {
          total: confessions.length,
          count: selectedConfessions.length,
          confessions: selectedConfessions,
          nextIndex: mode === "sequential" ? lastIndex : undefined,
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
          err instanceof Error
            ? err.message
            : "Oh sugar. Failed to process request",
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
