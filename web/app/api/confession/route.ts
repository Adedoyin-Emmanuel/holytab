import { NextResponse } from "next/server";
import { confessionSchema } from "../schema/schema";
import { readData } from "../utils/readData";
import { shuffleArray } from "../utils/shuffle";

export const POST = async (req: Request) => {
  try {
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
