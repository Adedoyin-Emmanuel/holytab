import { RateLimiterMemory } from "rate-limiter-flexible";

import {
  MAX_DURATION,
  BLOCK_DURATION,
  MAX_REQUEST_PER_MINUTE,
} from "./../constants";

export const rateLimiter = new RateLimiterMemory({
  duration: MAX_DURATION,
  points: MAX_REQUEST_PER_MINUTE,
  blockDuration: BLOCK_DURATION,
});
