import { Button, Heading, HStack, VStack } from "@chakra-ui/react";
import WhiteKing from "./chess-piece-svgs/WhiteKing";
import BlackKing from "./chess-piece-svgs/BlackKing";
import styles from "./ChooseColor.module.css";
import { FC } from "react";

interface ChooseColorProps {
  who_plays: string;
  setPlayer: (player: string) => void;
}

const ChooseColor: FC<ChooseColorProps> = ({ who_plays, setPlayer }) => {
  return (
    <>
      <VStack>
        <Heading className={styles.heading}>I PLAY AS</Heading>
        <HStack gap={5} marginTop={3} marginBottom={3}>
          <Button
            backgroundColor={who_plays === "white" ? "#2d4b2e" : "#000"}
            onClick={() => setPlayer("white")}
            className={styles.white_king_button}
          >
            <WhiteKing className={styles.king_svg} />
          </Button>
          <Button
            backgroundColor={who_plays === "black" ? "#2d4b2e" : "#fff"}
            onClick={() => setPlayer("black")}
            className={styles.black_king_button}
          >
            <BlackKing className={styles.king_svg} />
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default ChooseColor;
