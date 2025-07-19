interface Passengers {
  adult: number;
  youth: number;
  senior: number;
}

/**
 * return total passengers
 * @param passengers
 * @returns
 */
export const totalPassengers = (passengers: Passengers) => {
  return passengers.adult + passengers.youth + passengers.senior;
};

/**
 * return passenger summary
 * @param passengers
 * @returns
 */
export const getPassengerSummary = (passengers: Passengers) => {
  return [
    passengers.adult > 0 &&
      `${passengers.adult} adult${passengers.adult > 1 ? "s" : ""}`,
    passengers.youth > 0 &&
      `${passengers.youth} youth${passengers.youth > 1 ? "s" : ""}`,
    passengers.senior > 0 &&
      `${passengers.senior} senior${passengers.senior > 1 ? "s" : ""}`,
  ]
    .filter(Boolean)
    .join(", ");
};
