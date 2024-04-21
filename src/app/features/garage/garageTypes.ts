export type Car = {
  color: string;
  name: string;
  id: number;
};
export type CurrentCar = Omit<Car, "id"> & { id?: number };

export const initialCar: CurrentCar = { name: "", color: "#000000" };

export type CurrentCarPayload = {
  key: keyof Omit<Car, "id">;
  value: string;
};
