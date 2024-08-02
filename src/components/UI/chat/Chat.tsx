import { FC, useEffect, useState } from "react";
import styles from "./Chat.module.css";
import MessageInput from "./message_input/MessageInput";
import Message from "./message/Message";
import Typing from "./typing/Typing";
import { GoTrash } from "react-icons/go";
import { useConfig } from "../../hooks/useConfig";
import { useGame } from "../../hooks/useGame.ts";
import {REQUEST} from '../../consts/chatGPTRequests';
import {useGameData} from "../../hooks/useGameData.ts";

interface ChatProps {
  onEndgameClick: () => void;
  isFirstMove: boolean;
}

const Chat: FC<ChatProps> = ({ onEndgameClick, isFirstMove }) => {
  const { who_plays, bot_personality, bot_name } = useConfig();
  const botName = bot_name ? bot_name : "Sam Smith";
    const botPersonality = bot_personality ? bot_personality : "Friendly 21 year old american student, not very serious, but friendly and love jokes";
  const { chat, setChat, isInitialized, setIsInitialized } = useGame();
  const userMove = useGameData();
  const fullColor = userMove.playerColor;
/*  console.log("fullColor: ", fullColor);
  console.log("userMove: ", userMove);*/

  //TODO: replace with API_KEY with 

  const API_KEY = "#";
  const systemMessage = {
    role: "system",
    content:
      "Your name is " + botName + " your personality " + botPersonality + " depending on personality use emoticons, use conversational style, without lists "
        + " start with greetings to user in your style, user's color is " + fullColor +
        ", but don't refer to him as " + fullColor+" you are expected to compare two boards you are send, one of which is before player move and the other is after player move " +
        ", remember message you will write next will be first message user will see " +
        " You must greet in one message because then in your next messages are expected to perform game analysis and write some sentences in your character"/* +
        " when analyzing the game, don't write about what move was made just the opinion and some emotions in your style "*/
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>(chat);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {}, [chat, isInitialized]);

  useEffect(() => {
    if (
      (userMove && userMove.playerColor === who_plays) ||
      !isInitialized
    ) {
      const message = REQUEST({...userMove, isFirstMove: isFirstMove}, botName, botPersonality);
      /*console.log("message SENT: ", message);*/
      handleSend(message, "system");
    }
    if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [userMove]);

  const handleSend = async (message: string, sender: string) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: sender,
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setChat(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function processMessageToChatGPT(chatMessages: any[]) {
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    // eslint-disable-next-line prefer-const
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setChat([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.message_container}>
          {messages.map((message, index) => (
            <Message
              key={index}
              message={message.message}
              sender={message.sender}
            />
          ))}
        </div>
        {isTyping && <Typing />}
        <MessageInput handleSend={handleSend} />
        <button className={styles.end_game} onClick={onEndgameClick}>
          <GoTrash />
          END GAME
        </button>
      </div>
    </>
  );
};

export default Chat;
