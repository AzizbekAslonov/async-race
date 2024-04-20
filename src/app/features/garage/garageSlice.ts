import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car, CurrentCarPayload, initialCar } from "./garageTypes";

interface GarageState {
  isOpen: boolean;
  currentCar: Car;
  isEditing: boolean;
}

const initialState: GarageState = {
  isOpen: false,
  isEditing: false,
  currentCar: { ...initialCar },
};

export const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Car | undefined>) {
      if (action.payload) {
        state.currentCar = action.payload;
      }
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    setCurrentCar(state, action: PayloadAction<CurrentCarPayload>) {
      state.currentCar[action.payload.key] = action.payload.value;
    },
  },
});

export const { openModal, closeModal, setCurrentCar } = garageSlice.actions;
export const garageReducer = garageSlice.reducer;
