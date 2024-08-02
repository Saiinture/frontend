/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Heading,
  VStack,
  Image,
  Text,
  HStack,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import styles from "./BotCard.module.css";
import { FC, useState } from "react";
import { useConfig } from "../../../hooks/useConfig";
import ModalForm from "../../modal/ModalForm";

interface BoardCardProps {
  title: string;
  difficulty: string;
  image: string;
  bot_name: string;
  personality: string;
}

const BotCard: FC<BoardCardProps> = ({
  title,
  difficulty,
  image,
  bot_name,
  personality,
}) => {
  const { setBotName, setBotAvatarURL, setBotDifficulty, setBotPersonality } =
    useConfig();

  const [showPersonality, setShowPersonality] = useState<boolean>(false);

  const clickHandle = () => {
    setBotName(title);
    setBotAvatarURL(image);
    setBotDifficulty(difficulty);
    setBotPersonality(personality);
  };

  const infoClickHandle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowPersonality((prev: boolean) => !prev);
  };
  return (
    <>
      <VStack
        className={styles.container}
        backgroundColor={bot_name === title ? "#2d4b2e" : "#171717"}
        onClick={clickHandle}
      >
        <Button
          colorScheme="blue"
          className={styles.info_button}
          onClick={infoClickHandle}
        >
          i
        </Button>
        <Image src={image} className={styles.image} />
        <Heading className={styles.heading}>{title}</Heading>
        <HStack alignItems={"center"} justifyContent={"center"}>
          <svg
            width="20"
            height="17"
            viewBox="0 0 20 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.35 3.52004L14.35 6.38004C13.82 6.76004 13.06 6.53004 12.83 5.92004L10.94 0.880039C10.62 0.0100391 9.38997 0.0100391 9.06997 0.880039L7.16998 5.91004C6.93998 6.53004 6.18997 6.76004 5.65998 6.37004L1.65998 3.51004C0.859975 2.95004 -0.200025 3.74004 0.129975 4.67004L4.28998 16.32C4.42998 16.72 4.80998 16.98 5.22998 16.98H14.76C15.18 16.98 15.56 16.71 15.7 16.32L19.86 4.67004C20.2 3.74004 19.14 2.95004 18.35 3.52004ZM12.5 12.75H7.49998C7.08998 12.75 6.74998 12.41 6.74998 12C6.74998 11.59 7.08998 11.25 7.49998 11.25H12.5C12.91 11.25 13.25 11.59 13.25 12C13.25 12.41 12.91 12.75 12.5 12.75Z"
              fill="white"
            />
          </svg>
          <Text className={styles.text}>{difficulty}</Text>
        </HStack>
      </VStack>

      <ModalForm
        isOpen={showPersonality}
        onClose={() => setShowPersonality(false)}
        headerChildren={
          <HStack justifyContent={"space-between"}>
            <Heading>{title}</Heading>

            <CloseButton onClick={() => setShowPersonality(false)} />
          </HStack>
        }
      >
        <Text>{personality}</Text>
      </ModalForm>
    </>
  );
};

export default BotCard;
