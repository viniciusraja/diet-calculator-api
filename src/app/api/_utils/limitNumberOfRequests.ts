import { NextResponse } from "next/server";
import { limiter } from "../_config/limiter";

const limitRoute = async (fn: (...params: any) => any) => {
  const remainingCalls = await limiter.removeTokens(1);

  if (remainingCalls < 0)
    return new NextResponse(null, {
      status: 429,
      statusText: "Too Many Requests",
      headers: {
        "Content-Type": "text/plain",
      },
    });

  return fn?.();
};

export default limitRoute;
