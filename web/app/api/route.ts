import { NextResponse } from "next/server";

export default async function GET(req: Request) {
  return NextResponse.json({
    message:
      "Hi welcome to the Holy Tabs API. This API powers HolyTab chrome extension and web app. Please do not abuse. Thank you and God bless you.",
    data: {},
    status: 200,
  });
}
