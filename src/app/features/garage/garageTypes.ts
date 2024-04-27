export enum AnimationState {
  Started = "started",
  Stopped = "stopped",
  Waiting = "waiting",
  Initial = "initial",
}

export type CarAnimation = {
  state?: AnimationState;
  translateX?: number | null;
};

export type Car = {
  color: string;
  name: string;
  id: number;
  animation: CarAnimation;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};
export type CurrentCar = Omit<Car, "id" | "animation"> & { id?: number };

export const initialCar: CurrentCar = { name: "", color: "#000000" };

export type CurrentCarPayload = {
  key: keyof Omit<Car, "id" | "isRunning" | "animation">;
  value: string;
};

export type StartEngineResponse = {
  velocity: number;
  distance: number;
};

export type PatchEnginePayload = {
  id: number;
  status: "started" | "stopped" | "drive";
};
