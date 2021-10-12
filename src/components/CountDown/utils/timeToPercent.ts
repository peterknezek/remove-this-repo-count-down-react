import { Duration } from "@js-joda/core";

export const timeToPercent = (full: Duration, actual: Duration): number => {
  return actual.toNanos() / (full.toNanos() / 100);
};
