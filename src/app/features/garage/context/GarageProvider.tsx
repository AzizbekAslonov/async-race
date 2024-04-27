import { ReactElement } from "react";
import { useAppSelector } from "../../../hooks";
import { Car } from "../garageTypes";
import { CarAnimationState, GarageContext } from "./GarageContext";
import { notification } from "antd";

function GarageProvider({ children }: { children: ReactElement }) {
  const [notificationApi, contextHolder] = notification.useNotification();
  const carPerPage = useAppSelector((s) => s.garage.carPerPage);
  const carsAnimationStates: CarAnimationState[] = Array.from(
    { length: carPerPage },
    () => ({})
  );

  const setCarsAnimationStates = (slicedCars: Car[]) => {
    slicedCars.forEach((_, index) => {
      carsAnimationStates[index] = {};
    });
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
