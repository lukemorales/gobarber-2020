export const INITIAL_WORKING_HOUR = 8;

export const FINAL_WORKING_HOUR = 18;

export const TOTAL_WORKING_HOURS = 10;

export const WORKING_HOURS = Array.from(
  { length: TOTAL_WORKING_HOURS },
  (_, index) => index + INITIAL_WORKING_HOUR,
);
