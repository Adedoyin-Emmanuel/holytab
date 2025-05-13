import { NextResponse } from "next/server";

import { rateLimiter } from "./../utils/rateLimiter";

export const rateLimiterMiddleware = async (req: Request) => {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("remote-addr") ||
    "unknown";

  try {
    await rateLimiter.consume(ip);
    return null;
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
};
