import { useMemo } from "react";
import { useActions } from "./useActions";
import { useTypedSelector } from "./useTypedSelector";

export const useGame = () => {
  const { fen, chat, isInitialized, firstMoveMade } = useTypedSelector(
    (state) => state.game
  );
  const { setFen, setChat, setIsInitialized, setFirstMoveMade } = useActions();

  return useMemo(
    () => ({
      fen,
      chat,
      isInitialized,
      firstMoveMade,
      setFen,
      setChat,
      setIsInitialized,
      setFirstMoveMade,
    }),
    [
      fen,
      chat,
      isInitialized,
      firstMoveMade,
      setFen,
      setChat,
      setIsInitialized,
      setFirstMoveMade,
    ]
  );
};
