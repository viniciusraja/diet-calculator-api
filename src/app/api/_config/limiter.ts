import { RateLimiter } from "limiter";

export const limiter = new RateLimiter({
  tokensPerInterval: 50,
  interval: "min",
  fireImmediately: true,
});
