import { createContext } from "react";
import { CarAnimationState } from "../types/garageTypes";
import { NotificationInstance } from "antd/es/notification/interface";

export type GarageContextValue = {
  carsAnimationStates: CarAnimationState[];
  setCarsAnimationStates: () => void;
  notificationApi: NotificationInstance;
};

export const GarageContext = createContext<GarageContextValue | null>(null);
