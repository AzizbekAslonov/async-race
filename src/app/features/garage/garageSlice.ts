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
}

const initialState: GarageState = {
  isOpen: false,
  isEditing: false,
  currentCar: { ...initialCar },
  currentPage: 1,
  cars: [],
  isCarsFetched: false,
  carPerPage: 7,
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
      state.cars = action.payload.map((item) => ({
        ...item,
        animation: { state: AnimationState.Initial },
      }));
      state.isCarsFetched = true;
    },
    setAllAnimationStateWaiting(state) {
      // state.cars.forEach((item) => {
      //   if (item.animationState !== "waiting") {
      //     item.animationState = "other";
      //   }
      //   // item.animationState = "waiting";
      // });
    },
    setCurrentCar(state, action: PayloadAction<CurrentCarPayload>) {
      state.currentCar[action.payload.key] = action.payload.value;
    },
    addNewCar(state, action: PayloadAction<Car>) {
      state.cars.push({
        ...action.payload,
        animation: { state: AnimationState.Initial },
      });

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
      const foundIndex = state.cars.findIndex(
        (c) => c.id === action.payload.id
      );
      state.cars[foundIndex].animation = {
        ...state.cars[foundIndex].animation,
        ...action.payload.value,
      };
    },
    updateCar(state, action: PayloadAction<Car>) {
      const foundIndex = state.cars.findIndex(
        (c) => c.id === action.payload.id
      );
      state.cars[foundIndex] = { ...action.payload };
      state.isOpen = false;
      state.currentCar = { ...initialCar };
    },
    setCarTranslate(
      state,
      action: PayloadAction<{ id: number; value: number }>
    ) {
      // const foundIndex = state.cars.findIndex(
      //   (c) => c.id === action.payload.id
      // );
      // state.cars[foundIndex].translateX = action.payload.value;
    },
    filterCars(state, action: PayloadAction<number>) {
      state.cars = state.cars.filter((c) => c.id !== action.payload);
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
  setAllAnimationStateWaiting,
  setCarTranslate,
  setAnimationState,
} = garageSlice.actions;
export const garageReducer = garageSlice.reducer;
