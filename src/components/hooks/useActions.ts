import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { configSlice } from "../redux/store/config/config.slice";
import { movesSlice } from "../redux/store/moves/moves.slice";
import { gameSlice } from "../redux/store/game/game.slice";
import {gameDataSlice} from "../redux/store/game-data/gameData.slice.ts";

const rootAction = {
  ...configSlice.actions,
  ...movesSlice.actions,
  ...gameSlice.actions,
  ...gameDataSlice.actions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
