/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserMove } from "./gameData.types";

const initialState: IUserMove = {
    playerColor: "white",
    piece: "",
    from: "",
    to: "",
    username: "",
    fenBefore: "",
    fenAfter: "",
}
export const gameDataSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setUserMove: (state, action: PayloadAction<IUserMove>) => {
            state.playerColor = action.payload.playerColor;
            state.piece = action.payload.piece;
            state.from = action.payload.from;
            state.to = action.payload.to;
            state.username = action.payload.username;
            state.fenBefore = action.payload.fenBefore;
            state.fenAfter = action.payload.fenAfter;
        },
        setPlayerColor: (state, action: PayloadAction<"white" | "black">) => {
            state.playerColor = action.payload;
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }
    },
});