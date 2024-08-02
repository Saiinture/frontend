import { useMemo } from "react";
import { useTypedSelector } from "./useTypedSelector";

export const useGameData = () => {
    const {
        playerColor,
        isFirstMove,
        piece,
        from,
        to,
        username,
        fenBefore,
        fenAfter
    } = useTypedSelector(
        (state) => state.gameData
    );

    return useMemo(
        () => ({
            playerColor,
            isFirstMove,
            piece,
            from,
            to,
            username,
            fenBefore,
            fenAfter
        }),
        [playerColor, isFirstMove, piece, from, to, username, fenBefore, fenAfter]
    );
}

