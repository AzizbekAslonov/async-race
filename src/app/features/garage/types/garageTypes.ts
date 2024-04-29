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
      void,
      "api"
    >
  >;
};

export type Car = {
  color: string;
  name: string;
  id: number;
};

export type CurrentCar = Omit<Car, "id"> & { id?: number };

export type PageCar = Car & {
  animation: CarAnimation;
};
