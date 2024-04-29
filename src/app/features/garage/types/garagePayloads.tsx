import { Car, CarAnimation } from "./garageTypes";

export type SetCurrentCarPayload = {
  key: keyof Omit<Car, "id">;
  value: string;
};
export type SetAnimationStatePayload = {
  id: number;
  value: CarAnimation;
};
export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type StartEngineResponse = {
  velocity: number;
  distance: number;
};
