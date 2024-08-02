import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConfig } from "./config.types";

const initialState: IConfig = {
  who_plays: "white",
  bot_name: "",
  bot_avatar_url: "https://robohash.org/ai",
  bot_difficulty: "easy",
  bot_personality: "",
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setPlayer: (state: IConfig, action: PayloadAction<string>) => {
      state.who_plays = action.payload as IConfig["who_plays"];
    },
    setBotName: (state: IConfig, action: PayloadAction<string>) => {
      state.bot_name = action.payload as IConfig["bot_name"];
    },
    setBotAvatarURL: (state: IConfig, action: PayloadAction<string>) => {
      state.bot_avatar_url = action.payload as IConfig["bot_avatar_url"];
    },
    setBotDifficulty: (state: IConfig, action: PayloadAction<string>) => {
      state.bot_difficulty = action.payload as IConfig["bot_difficulty"];
    },
    setBotPersonality: (state: IConfig, action: PayloadAction<string>) => {
      state.bot_personality = action.payload as IConfig["bot_personality"];
    }
  },
});
