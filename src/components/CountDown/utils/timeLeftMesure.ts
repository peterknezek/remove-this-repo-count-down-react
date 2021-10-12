import { Duration, LocalTime } from "@js-joda/core";

/**
 * Measure the time between start and stop.
 * @param amount whole time
 * @param start when start countdonw
 * @param end shen stop contdown
 * @returns time which left
 */
export const timeLeftMesure = (
  amount: Duration,
  start: LocalTime,
  end: LocalTime
): Duration => {
  const slot = Duration.between(start, end);
  const timeLeft = amount.minus(slot);

  return timeLeft;
};
