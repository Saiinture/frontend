import { Center, Heading, HStack, Image, VStack, Text, Button } from "@chakra-ui/react";
import styles from "./StartPage.module.css";
import Header from "../header/Header.tsx";

import WaveBackground from "./wave-background/WaveBackground.tsx";
import chess_board from "../../../assets/main-page-chess-board.png";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/auth-context/AuthContext.tsx";

const StartPage = () => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const handlePlayNow = () => {
  if (isAuthenticated) {
    navigate("/config");
  }
    else {
        alert("Please login to continue");
    }
  }
  return (
    <>
      <Header>
        <Center className={styles.container} h={"100vh"}>
          <HStack gap={"7rem"} position={"relative"} zIndex={1}>
            <VStack  alignItems={"flex-start"} gap={"1rem"}>
              <Heading color="#fff" className={styles.heading}>Play Chess <br /> Online</Heading>
              <Text color="#fff" className={styles.text}>Learn & Improve with AI Bots</Text>
              <Button colorScheme={"blue"} className={styles.button} disabled={!isAuthenticated} onClick={handlePlayNow}>PLAY NOW</Button>
            </VStack>
            <Image src={chess_board} zIndex={1} />
          </HStack>
          <WaveBackground className={styles.wave_background} />
        </Center>
      </Header>
    </>
  );
};

export default StartPage;
