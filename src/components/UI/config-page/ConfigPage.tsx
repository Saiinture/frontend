import {
  Divider,
  Heading,
  VStack,
  HStack,
  Center,
  Button,
} from "@chakra-ui/react";
import styles from "./ConfigPage.module.css";
import Header from "../header/Header";
import BotCard from "./bot-card/BotCard";

/*import riana from "../../../assets/bot-images/Riyana Visha.png";
import william from "../../../assets/bot-images/William Peter.png";
import sam from "../../../assets/bot-images/Sam Smith.png";*/
import ChooseColor from "./choose-color/ChooseColor";
import { useConfig } from "../../hooks/useConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context/AuthContext.tsx";
import useGotBots from "../../../components/hooks/Query/useGotBots.ts";
import { useEffect, useState } from "react";
import { IBot } from "../../interfaces/Bot";
import { useGame } from "../../hooks/useGame.ts";

const ConfigPage = () => {
  const { who_plays, bot_name, setPlayer } = useConfig();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {data, isLoading, refetch} = useGotBots();
  const [bots, setBots] = useState<IBot[]>([]);
  // const bots = [
  //   {
  //     title: "Sam Smith",
  //     difficulty: "easy",
  //     personality: "21 years old man from Los Angeles, he's very friendly and loves to make some jokes from time-to-time",
  //     image: sam,
  //   },
  //   {
  //     title: "William Peter",
  //     difficulty: "medium",
  //     personality: "30 years old man from Great Britain, he's very serious and uses his academic knowledge to make a move",
  //     image: william,
  //   },
  //   {
  //     title: "Riyana Visha",
  //     difficulty: "hard",
  //     personality: "23 years old woman from Austria, she's very smart and serious, she doesn't joke a lot",
  //     image: riana,
  //   },
  //   {
  //       title: "Pete David",
  //       difficulty: "very hard",
  //       personality: "25 years old man from New York, he's very smart, but he's also like to do some jokes, he's very unpredictable",
  //       image: william,
  //   }
  // ];

  useEffect(() => {
    if (!data) {
      refetch();
    }
      if (data && !isLoading) {
            setBots(data);
      }
  }, [data, isLoading]);

  const { setFen, setChat, setIsInitialized, setFirstMoveMade } = useGame();

  const clickHandle = async () => {
    setFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setChat([] as any[]);
    setIsInitialized(false);
    setFirstMoveMade(false);
  };

  const startGame = async () => {
    if (isAuthenticated) {
      await clickHandle().then(() => navigate("/game"));
    } else {
      alert("Please login to continue");
    }
  };

  return (
    <>
      <Header>
        <VStack
          className={styles.container}
          height={"100vh"}
          justifyContent={"center"}
          gap={10}
        >
          <Heading color="#fff" w={"80%"}>
            New Game
            <Divider marginTop={5} />
          </Heading>
          <HStack flexWrap={"wrap"} gap={5} className={styles.bot_cards}>
            {bots.length !== 0 &&
              bots.map((bot) => (
              <BotCard
                key={bot.bot_id}
                title={bot.bot_name}
                personality={bot.persona}
                difficulty={bot.level === "very_hard" ? "very hard" : bot.level}
                image={bot.avatar_url}
                bot_name={bot_name}
              />
            ))}
          </HStack>

          <Center flexDirection={"column"} gap={4}>
            <ChooseColor who_plays={who_plays} setPlayer={setPlayer} />
            <Button
              className={styles.play_button}
              colorScheme={"blue"}
              isDisabled={Boolean(bot_name && bot_name.length < 0)}
              onClick={startGame}
              leftIcon={
                <svg
                  width="40"
                  height="48"
                  viewBox="0 0 40 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35.93 21.125H27.6606V4.25C27.6606 0.312504 25.2253 -0.484371 22.2548 2.46875L20.1139 4.60157L1.9963 22.6484C-0.492528 25.1094 0.551173 27.125 4.29779 27.125H12.5671V44C12.5671 47.9375 15.0024 48.7344 17.9729 45.7813L20.1139 43.6484L38.2314 25.6016C40.7203 23.1406 39.6766 21.125 35.93 21.125Z"
                    fill="white"
                  />
                </svg>
              }
            >
              Play
            </Button>
          </Center>
        </VStack>
      </Header>
    </>
  );
};

export default ConfigPage;
