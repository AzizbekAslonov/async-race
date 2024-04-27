import { createContext } from "react";
import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {
  MutationActionCreatorResult,
  MutationDefinition,
} from "@reduxjs/toolkit/query";
import { Car, StartEngineResponse } from "../garageTypes";
import { NotificationInstance } from "antd/es/notification/interface";

export type CarAnimationState = {
  record?: { id: number };
  request?: MutationActionCreatorResult<
    MutationDefinition<
      number,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      StartEngineResponse,
      "api"
    >
  >;
};

export type GarageContextValue = {
  carsAnimationStates: CarAnimationState[];
  setCarsAnimationStates: (slicedCars: Car[]) => void;
  notificationApi: NotificationInstance;
};

export const GarageContext = createContext<GarageContextValue | null>(null);
