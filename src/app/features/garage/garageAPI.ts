import { api } from "../../api";
import { Car, CurrentCar } from "./garageTypes";
// import { PaginatedResponse, ResponseType } from "../types/common.types";
// import { GetOrderPayload, Order } from "src/pages/orders/order.types";

// const apiWithAuthTags = api.enhanceEndpoints({ addTagTypes: ['Auth'] });
export const garageAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<Car[], void>({
      query: () => ({
        url: "/garage",
      }),
    }),
    postCar: builder.mutation<Car, CurrentCar>({
      query: (body) => ({
        url: "/garage",
        method: "post",
        body,
      }),
    }),
    putCar: builder.mutation<Car, { id: number; body: CurrentCar }>({
      query: ({ id, body }) => ({
        url: `/garage/${id}`,
        method: "put",
        body,
      }),
    }),
    deleteCar: builder.mutation<{}, number>({
      query: (id) => ({
        url: `/garage/${id}`,
        method: "delete",
      }),
    }),
  }),
});

export const {
  useGetCarsQuery,
  usePostCarMutation,
  useDeleteCarMutation,
  usePutCarMutation,
} = garageAPI;
