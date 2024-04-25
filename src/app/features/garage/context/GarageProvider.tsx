import { ReactElement } from "react";
import { useAppSelector } from "../../../hooks";
import { Car } from "../garageTypes";
import { CarAnimationState, GarageContext } from "./GarageContext";

function GarageProvider({ children }: { children: ReactElement }) {
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
      value={{ setCarsAnimationStates, carsAnimationStates }}
    >
      {children}
    </GarageContext.Provider>
  );
}

export default GarageProvider;
