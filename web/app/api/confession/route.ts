import { NextResponse } from "next/server";
import { confessionSchema } from "../schema/schema";
import { readData } from "../utils/readData";
import { shuffleArray } from "../utils/shuffle";
import { rateLimiter } from "../utils/rateLimiter";

export const POST = async (req: Request) => {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("remote-addr") ||
      "unknown";
    try {
      await rateLimiter.consume(ip);
    } catch (rateLimitError) {
      const retryAfter =
        (rateLimitError as { msBeforeNext: number }).msBeforeNext / 1000;
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests chief. Please try again later.",
          retryAfter: `${Math.round(retryAfter)} seconds`,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { error, value } = confessionSchema.validate(body);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.details[0].message,
        },
        { status: 400 }
      );
    }

    const { skip = 0, take = 10, search = "", randomize = true } = value;

    const data = readData();
    let confessions = data.affirmations || [];

    if (search) {
      confessions = confessions.filter((confession: string) =>
        confession.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (randomize && skip === 0) {
      confessions = shuffleArray(confessions);
    }

    const paginatedConfessions = confessions.slice(skip, skip + take);

    return NextResponse.json({
      message: "Confessions retrieved successfully",
      success: true,
      data: {
        total: confessions.length,
        count: paginatedConfessions.length,
        confessions: paginatedConfessions,
      },
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      {
        message:
          err instanceof Error
            ? err.message
            : "Oh sugar. Failed to process request",
        success: false,
        data: {},
      },
      { status: 500 }
    );
  }
};
