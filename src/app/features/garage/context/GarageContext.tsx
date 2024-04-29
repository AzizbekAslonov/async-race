import { createContext } from "react";
import { Car, CarAnimationState } from "../types/garageTypes";
import { NotificationInstance } from "antd/es/notification/interface";

export type GarageContextValue = {
  carsAnimationStates: CarAnimationState[];
  setCarsAnimationStates: (slicedCars: Car[]) => void;
  notificationApi: NotificationInstance;
};

export const GarageContext = createContext<GarageContextValue | null>(null);
