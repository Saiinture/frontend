import { useMemo } from "react";
import { useTypedSelector } from "./useTypedSelector";
import { useActions } from "./useActions";

export const useMoves = () => {
  const { moves } = useTypedSelector((state) => state.moves);
  const { addMove, removeMove, clearMoves, setMoves } = useActions();
  return useMemo(
    () => ({ moves, addMove, removeMove, clearMoves, setMoves }),
    [moves, addMove, removeMove, clearMoves, setMoves]
  );
};
