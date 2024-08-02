/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGame } from "./game.types";

const initialState: IGame = {
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    chat: [],
    isInitialized: false,
    firstMoveMade: false,
}
export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setFen: (state: IGame, action:PayloadAction<string>) => {
            state.fen = action.payload;
        },
        setChat: (state: IGame, action:PayloadAction<any[]>) => {
            state.chat = action.payload;
        },
        setIsInitialized: (state: IGame, action:PayloadAction<boolean>) => {
            state.isInitialized = action.payload;
        },
        setFirstMoveMade: (state: IGame, action:PayloadAction<boolean>) => {
            state.firstMoveMade = action.payload;
        }
    }
})