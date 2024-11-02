import { NextResponse } from "next/server";
import Joi from "joi";
import fs from "fs";
import path from "path";
import { confessionSchema } from "../schema/schema";

const dataPath = path.join(process.cwd() + "/data", "data.json");

const readData = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { error, value } = confessionSchema.validate(body);
    if (error) {
      return NextResponse.json(
        { error: error.details[0].message },
        { status: 400 }
      );
    }

    const { skip, take, search } = value;

    const data = readData();
    let confessions = data.affirmations;

    if (search) {
      confessions = confessions.filter((confession: string) =>
        confession.toLowerCase().includes(search.toLowerCase())
      );
    }

    const paginatedConfessions = confessions.slice(skip, skip + take);

    return NextResponse.json({
      message: "Confessions retrived successfully",
      success: true,
      data: {
        total: confessions.length,
        count: paginatedConfessions.length,
        confessions: paginatedConfessions,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to process request", data: {}, success: false },
      { status: 500 }
    );
  }
};
