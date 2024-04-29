import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnimationState, Car, CurrentCar, PageCar } from "./types/garageTypes";
import {
  SetCurrentCarPayload,
  SetAnimationStatePayload,
} from "./types/garagePayloads";

interface GarageState {
  isOpen: boolean;
  currentCar: CurrentCar;
  currentPage: number;
  cars: Car[];
  isCarsFetched: boolean;
  carPerPage: number;
  hasWinner: boolean;
  isRaceStarted: boolean;
  pageCars: PageCar[];
}
const initialCar: CurrentCar = { name: "", color: "#000000" };
const initialState: GarageState = {
  isOpen: false,
  currentCar: { ...initialCar },
  currentPage: 1,
  cars: [],
  pageCars: [],
  isCarsFetched: false,
  carPerPage: 7,
  hasWinner: false,
  isRaceStarted: false,
};

export const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<CurrentCar | undefined>) {
      if (action.payload) state.currentCar = action.payload;
      state.isOpen = true;
    },
    closeModal(state) {
      if (state.currentCar.id) {
        state.currentCar = { ...initialCar };
      }
      state.isOpen = false;
    },
    setCars(state, action: PayloadAction<Car[]>) {
      state.cars = action.payload;
      state.isCarsFetched = true;
    },
    appendCars(state, action: PayloadAction<Car[]>) {
      state.cars = state.cars.concat(action.payload);
    },
    updatePageCars(state, action: PayloadAction<number | undefined>) {
      if (action.payload) state.currentPage = action.payload;
      const slidedCars = state.cars.slice(
        (state.currentPage - 1) * state.carPerPage,
        state.currentPage * state.carPerPage,
      );
      state.pageCars = slidedCars.map((car) => {
        const found = state.pageCars.find((i) => i.id === car.id);
        if (found) {
          return { ...car, animation: found.animation };
        } else {
          return { ...car, animation: { state: AnimationState.Initial } };
        }
      });
    },
    startRace(state) {
      state.hasWinner = false;
      state.isRaceStarted = true;
      state.pageCars.forEach((car) => {
        car.animation.state = AnimationState.Started;
        car.animation.translateX = null;
      });
    },
    stopRace(state) {
      state.isRaceStarted = false;
      state.pageCars.forEach((car) => {
        car.animation.state = AnimationState.Stopped;
      });
    },
    setHasWinner(state, action: PayloadAction<boolean>) {
      state.hasWinner = action.payload;
    },
    setCurrentCar(state, action: PayloadAction<SetCurrentCarPayload>) {
      state.currentCar[action.payload.key] = action.payload.value;
    },
    addNewCar(state, action: PayloadAction<Car>) {
      state.cars.push(action.payload);

      state.isOpen = false;
      state.currentCar = { ...initialCar };
    },
    setAnimationState(state, action: PayloadAction<SetAnimationStatePayload>) {
      const foundIndex = state.pageCars.findIndex(
        (c) => c.id === action.payload.id,
      );
      state.pageCars[foundIndex].animation = {
        ...state.pageCars[foundIndex].animation,
        ...action.payload.value,
      };
    },
    editExistingCar(state, action: PayloadAction<Car>) {
      const index = state.cars.findIndex((c) => c.id === action.payload.id);
      state.cars[index] = action.payload;
      state.isOpen = false;
      state.currentCar = { ...initialCar };
    },
    removeCar(state, action: PayloadAction<number>) {
      state.cars = state.cars.filter((c) => c.id !== action.payload);
      if (state.pageCars.length === 1 && state.currentPage !== 1) {
        state.currentPage--;
      }
    },
  },
});

export const {
  openModal,
  closeModal,
  setCurrentCar,
  editExistingCar,
  setCars,
  appendCars,
  addNewCar,
  removeCar,
  setAnimationState,
  startRace,
  stopRace,
  updatePageCars,
  setHasWinner,
} = garageSlice.actions;
export const garageReducer = garageSlice.reducer;
