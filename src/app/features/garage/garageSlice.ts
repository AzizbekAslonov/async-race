import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AnimationState,
  Car,
  CarAnimation,
  CurrentCar,
  CurrentCarPayload,
  initialCar,
} from "./garageTypes";

interface GarageState {
  isOpen: boolean;
  currentCar: CurrentCar | Car;
  isEditing: boolean;
  currentPage: number;
  cars: Car[];
  isCarsFetched: boolean;
  carPerPage: number;
  winner: Car | null;
  isRaceStarted: boolean;
  pageCars: Car[];
}

const initialState: GarageState = {
  isOpen: false,
  isEditing: false,
  currentCar: { ...initialCar },
  currentPage: 1,
  cars: [],
  pageCars: [],
  isCarsFetched: false,
  carPerPage: 7,
  winner: null,
  isRaceStarted: false,
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
        state.isEditing = false;
      }
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
      if (state.isEditing) {
        state.currentCar = { ...initialCar };
      }
      state.isEditing = false;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCars(state, action: PayloadAction<Car[]>) {
      state.cars = action.payload;
      state.isCarsFetched = true;
    },
    appendCars(state, action: PayloadAction<Car[]>) {
      state.cars = state.cars.concat(action.payload);
    },
    setPageCars(state, action: PayloadAction<number | undefined>) {
      if (action.payload) state.currentPage = action.payload;
      const slidedCars = state.cars.slice(
        (state.currentPage - 1) * state.carPerPage,
        state.currentPage * state.carPerPage
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
    setAllAnimationStateWaiting(state) {
      state.pageCars = state.pageCars.map((item) => ({
        ...item,
        animation: { state: AnimationState.Initial },
      }));
    },
    startRace(state) {
      state.winner = null;
      state.isRaceStarted = true;
      state.pageCars.forEach((car) => {
        car.animation.state = AnimationState.Started;
        car.animation.translateX = null;
      });
    },
    setWinner(state, action: PayloadAction<Car | null>) {
      state.winner = action.payload;
    },
    stopRace(state) {
      state.isRaceStarted = false;
      state.pageCars.forEach((car) => {
        car.animation.state = AnimationState.Stopped;
      });
    },
    setCurrentCar(state, action: PayloadAction<CurrentCarPayload>) {
      state.currentCar[action.payload.key] = action.payload.value;
    },
    addNewCar(state, action: PayloadAction<Car>) {
      state.cars.push(action.payload);

      state.isOpen = false;
      state.currentCar = { ...initialCar };
    },
    setAnimationState(
      state,
      action: PayloadAction<{
        id: number;
        value: CarAnimation;
      }>
    ) {
      const foundIndex = state.pageCars.findIndex(
        (c) => c.id === action.payload.id
      );
      state.pageCars[foundIndex].animation = {
        ...state.pageCars[foundIndex].animation,
        ...action.payload.value,
      };
    },
    updateCar(state, action: PayloadAction<Car>) {
      const indexInCars = state.cars.findIndex(
        (c) => c.id === action.payload.id
      );
      state.cars[indexInCars] = action.payload;
      state.isOpen = false;
      state.currentCar = { ...initialCar };
    },
    filterCars(state, action: PayloadAction<number>) {
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
  updateCar,
  setCurrentPage,
  setCars,
  appendCars,
  addNewCar,
  filterCars,
  setAllAnimationStateWaiting,
  setAnimationState,
  startRace,
  stopRace,
  setPageCars,
  setWinner,
} = garageSlice.actions;
export const garageReducer = garageSlice.reducer;
