import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WinnersState {
  pageSize: number;
  currentPage: number;
}

const initialState: WinnersState = {
  pageSize: 10,
  currentPage: 1,
};

export const winnersSlice = createSlice({
  name: "winners",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = winnersSlice.actions;
export const winnerReducer = winnersSlice.reducer;
