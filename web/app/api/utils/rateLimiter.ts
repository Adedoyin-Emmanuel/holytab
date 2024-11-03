import { RateLimiterMemory } from "rate-limiter-flexible";
import {
  MAX_DURATION,
  MAX_REQUEST_PER_MINUTE,
  BLOCK_DURATION,
} from "./../constants";

export const rateLimiter = new RateLimiterMemory({
  points: MAX_REQUEST_PER_MINUTE,
  duration: MAX_DURATION,
  blockDuration: BLOCK_DURATION,
});
