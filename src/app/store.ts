import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";
import { garageReducer } from "./features/garage/garageSlice";
import { winnerReducer } from "./features/winners/winnersSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    garage: garageReducer,
    winners: winnerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
