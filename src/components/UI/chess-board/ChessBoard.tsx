/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chessboard } from "react-chessboard";
import styles from "./ChessBoard.module.css";
import { Chess, Color } from "chess.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useEffect, useState } from "react";
import Player from "./player/Player";
import { useConfig } from "../../hooks/useConfig";
import Chat from "../chat/Chat";
import Header from "../header/Header";
import EndgameDialog from "./endgame-dialog/EndgameDialog";
import { useAuth } from "../../contexts/auth-context/AuthContext.tsx";
import useGetUser from "../../hooks/Query/useGetUser.ts";
import difficultyToDepth from "../../utils/difficultyToDepth.ts";
import sam from "../../../assets/bot-images/Sam Smith.png";
import { useGame } from "../../hooks/useGame.ts";
import pieceToFullPieceName from "../../utils/pieceToFullPieceName.ts";
import {useActions} from "../../hooks/useActions.ts";


const ChessBoard = () => {
  const {
    fen,
    setFen,
    firstMoveMade,
    setChat,
    setIsInitialized,
    setFirstMoveMade,
  } = useGame();
  const { bot_avatar_url, bot_difficulty, who_plays, bot_name } = useConfig();

  const [game, setGame] = useState(new Chess(fen));
  const [position, setPosition] = useState<string>(fen);
  const [showPromotion, setShowPromotion] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");
  const { user } = useAuth();
  const {
    data: backendUser,
    isLoading,
    isError,
  } = useGetUser((user && user.uid) || "");
  const { setUserMove, setPlayerColor, setUserName } = useActions();
  const botColor: Color = who_plays === "white" ? "b" : "w";
  setPlayerColor(who_plays);
  const username = (backendUser && backendUser.username) || user?.displayName;
  setUserName(username);

  const [difficulty] = useState<string>(bot_difficulty ?? "easy");
  const [botName] = useState(bot_name ?? "Sam Smith");
  const [botAvatarURL] = useState<string>(bot_avatar_url ?? sam);
  const timerToMakeRandomMove = 1500;
  const [needToMakeRandomMove, setNeedToMakeRandomMove] =
    useState<boolean>(false);
  const [canChangeRandomMove, setCanChangeRandomMove] = useState<boolean>(true);
  const [firstMove, setFirstMove] = useState<boolean>(true);

  useEffect(() => {
    if (!firstMoveMade && who_plays === "black") {
      makeAIMove(fen);
      setFirstMoveMade(true);
    }
  }, [firstMoveMade]);

  function makeRandomMove(fen: string) {
    const gameCopy = new Chess(fen);
    const possibleMoves = gameCopy.moves();
    if (
      gameCopy.isGameOver() ||
      gameCopy.isDraw() ||
      possibleMoves.length === 0
    )
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);

    gameCopy.move(possibleMoves[randomIndex]);
    /*console.log("random move: " + possibleMoves[randomIndex]);*/
    setGame(gameCopy);
    setPosition(gameCopy.fen());
    setFen(gameCopy.fen());
    looseWin(gameCopy);
  }

  useEffect(() => {
    if (needToMakeRandomMove && game.turn() === botColor) {
      /*console.log("making random move");*/
      makeRandomMove(fen);
      setNeedToMakeRandomMove(false);
    }
  }, [needToMakeRandomMove]);

  const makeAIMove = async (fen: string) => {
    /*const moves = await fetch(
      `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=${difficultyToDepth(
        bot_difficulty
      )}`,
      {
        method: "GET",
      }
    )*/
    const moves = await fetch("https://chess-api.com/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fen: fen,
        depth: difficultyToDepth(bot_difficulty),
        maxThinkingTime: 600,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        /*console.log(data);*/
        const from = data.from;
        const to = data.to;
        const promotion = data.promotion;
        const result = {
          from: from,
          to: to,
          promotion: promotion,
        };
        /*console.log(result);*/
        return result;
      });
    if (needToMakeRandomMove) {
      /*console.log("stockfish move cancelled");*/
      return;
    }
    setTimeout(() => {
      const gameCopy = new Chess(fen);
      gameCopy.move({
        from: moves.from,
        to: moves.to,
        promotion: moves.promotion,
      });

      setGame(gameCopy);
      setPosition(gameCopy.fen());
      setFen(gameCopy.fen());
      looseWin(gameCopy);
    }, 200);
  };
  // @ts-ignore
  const makeBotMove = async (fen: string) => {
    makeAIMove(fen).then(() => {
      /*console.log("Stockfish move made");*/
      setCanChangeRandomMove(false);
    });
    new Promise((resolve) => {
      /*console.log("waiting for random move");*/
      setTimeout(() => {
        if (!canChangeRandomMove) return;
        /*console.log("allowing random move");*/
        setNeedToMakeRandomMove(true);
        resolve("resolved");
      }, timerToMakeRandomMove);
    });
  };

  const onDrop = async (
    sourceSquare: string,
    targetSquare: string,
    piece: string
  ): Promise<boolean> => {
    const gameCopy = new Chess(game.fen());
    try {
      // Attempt to make the move
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1]?.toLowerCase() ?? "q",
      });

      // If the move is invalid, it returns null
      if (move === null) {
        // Handle the invalid move case
        console.warn("Invalid move attempted:", {
          sourceSquare,
          targetSquare,
          piece,
        });
        return false;
      }

      // If the move is valid
      setFirstMove(false);
      if (move.promotion) setShowPromotion(true);
      setGame(gameCopy);
      setPosition(gameCopy.fen());
      setFen(gameCopy.fen());
      looseWin(gameCopy);
      // Log move details
      /*console.log("piece:", piece);
      console.log("sourceSquare:", sourceSquare);
        console.log("targetSquare:", targetSquare);
        console.log("username:", username);
        console.log("fenBefore:", move.before);
        console.log("fenAfter:", move.after);
        console.log("pieceToFullPieceName:", pieceToFullPieceName(piece));*/
          setUserMove({
            playerColor: who_plays,
            piece: pieceToFullPieceName(piece),
            from: sourceSquare,
            to: targetSquare,
            username: username ?? "User",
            fenBefore: move.before,
            fenAfter: move.after
            });

          await makeAIMove(gameCopy.fen());

      return true;
    } catch (error) {
      // Handle unexpected errors

      return false;
    }
  };

  const looseWin = (gameInstance: Chess) => {
    if (gameInstance.isCheckmate()) {
      setStatus(gameInstance.turn() === "w" ? "Black wins!" : "White wins!");
    } else if (gameInstance.isDraw()) {
      setStatus("Draw!");
    } else if (gameInstance.isStalemate()) {
      setStatus("Stalemate!");
    } else if (gameInstance.isInsufficientMaterial()) {
      setStatus("Draw due to insufficient material!");
    } else if (gameInstance.isThreefoldRepetition()) {
      setStatus("Draw by threefold repetition!");
    } else {
      setStatus("");
    }
  };

  const restartGame = async () => {
    const newGame = new Chess();
    setGame(newGame);
    setPosition("start");
    setStatus("");
    setShowPromotion(false);
    setFen(newGame.fen());
    setChat([] as any[]);
    setIsInitialized(false);
    setFirstMoveMade(false);
  };

  const onClose = async () => {
    await restartGame().then(() => {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  };

  return (
    <>
      <Header>
        <div className={styles.container}>
          <div className={styles.board_container}>
            <Player
              name={botName}
              title={difficulty + " AI bot"}
              image={botAvatarURL}
            />
            <Chessboard
              id="PlayVsStockfish"
              customDarkSquareStyle={{ backgroundColor: "#739552" }}
              customLightSquareStyle={{ backgroundColor: "#ebecd0" }}
              position={position}
              animationDuration={600}
              // @ts-ignore
              onPieceDrop={(sourceSquare, targetSquare, piece) => {
                if (game.turn() === botColor) {
                  return false;
                } else {
                  return onDrop(sourceSquare, targetSquare, piece);
                }
              }}
              promotionDialogVariant={"vertical"}
              showPromotionDialog={showPromotion}
              boardOrientation={who_plays}
            />
            {!isLoading && !isError && (
              <Player
                name={
                  (backendUser && backendUser.username) ||
                  user?.displayName ||
                  "User"
                }
                title="Player"
                image={user?.photoURL}
              />
            )}
          </div>
          <Chat
            onEndgameClick={() => setStatus("You have resigned")}
            isFirstMove={firstMove}
          />
        </div>
        <EndgameDialog
          isOpen={Boolean(status)}
          onClose={onClose}
          restart={restartGame}
          status={status}
        />
      </Header>
    </>
  );
};

export default ChessBoard;
