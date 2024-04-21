import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car, CurrentCar, CurrentCarPayload, initialCar } from "./garageTypes";

interface GarageState {
  isOpen: boolean;
  currentCar: CurrentCar | Car;
  isEditing: boolean;
  currentPage: number;
  cars: Car[];
}

const initialState: GarageState = {
  isOpen: false,
  isEditing: false,
  currentCar: { ...initialCar },
  currentPage: 1,
  cars: [],
};

export const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Car | undefined>) {
      if (action.payload) {
        // edit
        state.currentCar = action.payload;
        state.isEditing = true;
      } else {
        // create
        state.currentCar = { ...initialCar };
        state.isEditing = false;
      }
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCars(state, action: PayloadAction<Car[]>) {
      state.cars = action.payload;
    },
    setCurrentCar(state, action: PayloadAction<CurrentCarPayload>) {
      state.currentCar[action.payload.key] = action.payload.value;
    },
    updateCar(state, action: PayloadAction<Car>) {
      const foundIndex = state.cars.findIndex(
        (c) => c.id === action.payload.id
      );
      state.cars[foundIndex] = { ...action.payload };
      state.isOpen = false;
    },
    filterCars(state, action: PayloadAction<number>) {
      state.cars = state.cars.filter((c) => c.id !== action.payload);
    },
    addNewCar(state, action: PayloadAction<Car>) {
      state.cars.push(action.payload);

      state.isOpen = false;
      state.currentCar = { ...initialCar };
    },
  },
});

export const {
  openModal,
  closeModal,
  setCurrentCar,
  updateCar,
  setCurrentPage,
  setCars,
  addNewCar,
  filterCars,
} = garageSlice.actions;
export const garageReducer = garageSlice.reducer;
