import { create } from "zustand";
// import moment from "moment";
import type { TravelStore } from "../types/common";

const useStore = create<TravelStore>((set) => ({
  from: "",
  to: "",
  date: null,
  tripType: "one-way",
  passengers: {
    adult: 1,
    youth: 0,
    senior: 0,
  },
  selectedTrain: null,
  setTravelDetails: (details) => set((state) => ({ ...state, ...details })),
  setSelectedTrain: (train) => set({ selectedTrain: train }),
}));

export default useStore;
