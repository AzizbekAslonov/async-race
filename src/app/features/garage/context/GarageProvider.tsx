import { ReactElement } from "react";
import { useAppSelector } from "../../../hooks";
import { GarageContext } from "./GarageContext";
import { notification } from "antd";
import { CarAnimationState } from "../types/garageTypes";

function GarageProvider({ children }: { children: ReactElement }) {
  const [notificationApi, contextHolder] = notification.useNotification();
  const carPerPage = useAppSelector((s) => s.garage.carPerPage);
  const carsAnimationStates: CarAnimationState[] = Array.from(
    { length: carPerPage },
    () => ({})
  );

  const setCarsAnimationStates = () => {
    for (let i = 0; i < carPerPage; i++) {
      carsAnimationStates[i] = {};
    }
  };

  return (
    <GarageContext.Provider
      value={{ setCarsAnimationStates, carsAnimationStates, notificationApi }}
    >
      {contextHolder}
      {children}
    </GarageContext.Provider>
  );
}

export default GarageProvider;
