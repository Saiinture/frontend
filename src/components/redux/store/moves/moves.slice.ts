import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMove, IMoves } from "./moves.types";

const initialState: IMoves = { moves: [] as IMove[] };

export const movesSlice = createSlice({
  name: "moves",
  initialState,
  reducers: {
    addMove: (state: IMoves, action: PayloadAction<IMove>) => {
      state.moves.push(action.payload);
    },
    removeMove: (state: IMoves, action: PayloadAction<number>) => {
      state.moves = state.moves.filter((move: IMove) => move.id !== action.payload);
    },
    clearMoves: (state: IMoves) => {
      state.moves = [];
    },
    setMoves: (state: IMoves, action: PayloadAction<IMove[]>) => {
      state.moves = action.payload;
    },
  },
});
