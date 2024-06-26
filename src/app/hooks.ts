import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useContext } from "react";
import {
  GarageContext,
  GarageContextValue,
} from "./features/garage/context/GarageContext";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGarageContext = (): GarageContextValue => {
  const value = useContext(GarageContext);
  if (!value) {
    throw new Error("Error: Wrong context value");
  }

  return value;
};
