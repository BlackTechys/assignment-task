export interface Passengers {
  adult: number;
  youth: number;
  senior: number;
}

export interface Train {
  id: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  changes: number;
  standardPrice: number;
  plusPrice: number;
  originalPrice?: number;
  isRecommended?: boolean;
  isCheapest?: boolean;
}

export interface TravelStore {
  from: string;
  to: string;
  date: moment.Moment | null;
  tripType: "one-way" | "return";
  passengers: Passengers;
  selectedTrain: Train | null;
  setTravelDetails: (
    details: Partial<{
      from: string;
      to: string;
      date: moment.Moment | null;
      tripType: "one-way" | "return";
      passengers: Passengers;
    }>
  ) => void;
  setSelectedTrain: (train: Train | null) => void;
}
