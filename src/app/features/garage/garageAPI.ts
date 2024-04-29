import { api } from "../../api";
import { Car, CurrentCar } from "./types/garageTypes";
import { StartEngineResponse, Winner } from "./types/garagePayloads";

// const apiWithAuthTags = api.enhanceEndpoints({ addTagTypes: ['Auth'] });
export const garageAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<Car[], null>({
      query: () => ({
        url: "/garage",
      }),
    }),
    postCar: builder.mutation<Car, CurrentCar>({
      query: (body) => ({
        url: "/garage",
        method: "POST",
        body,
      }),
    }),
    putCar: builder.mutation<Car, { id: number; body: CurrentCar }>({
      query: ({ id, body }) => ({
        url: `/garage/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteCar: builder.mutation<{}, number>({
      query: (id) => ({
        url: `/garage/${id}`,
        method: "DELETE",
      }),
    }),
    startEngine: builder.mutation<StartEngineResponse, number>({
      query: (id) => ({
        url: `/engine`,
        method: "PATCH",
        params: { id, status: "started" },
      }),
    }),
    driveEngine: builder.mutation<void, number>({
      query: (id) => ({
        url: `/engine`,
        method: "PATCH",
        params: { id, status: "drive" },
      }),
    }),
    stopEngine: builder.mutation<void, number>({
      query: (id) => ({
        url: `/engine`,
        method: "PATCH",
        params: { id, status: "stopped" },
      }),
    }),
    getWinner: builder.query<Winner, number>({
      query: (id) => ({
        url: `/winners/${id}`,
      }),
    }),
    postWinner: builder.mutation<Winner, Winner>({
      query: (body) => ({
        url: `/winners`,
        method: "POST",
        body,
      }),
    }),
    putWinner: builder.mutation<Winner, Winner>({
      query: ({ id, ...rest }) => ({
        url: `/winners/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteWinner: builder.mutation<void, number>({
      query: (id) => ({
        url: `/winners/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCarsQuery,
  usePostCarMutation,
  useDeleteCarMutation,
  usePutCarMutation,
  useStopEngineMutation,
  useDriveEngineMutation,
  useStartEngineMutation,
  useLazyGetWinnerQuery,
  usePutWinnerMutation,
  usePostWinnerMutation,
  useDeleteWinnerMutation,
} = garageAPI;
