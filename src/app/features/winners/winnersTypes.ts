export type Car = {
  color: string;
  name: string;
};

export const initialCar: Car = { name: "", color: "#000000" };

export type CurrentCarPayload = {
  key: keyof Car;
  value: string;
};
