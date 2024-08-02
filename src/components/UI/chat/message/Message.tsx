import { FC } from "react";
import styles from "./Message.module.css";

interface MessageProps {
  message: string;
  sender: string;
}

const Message: FC<MessageProps> = ({ message, sender }) => {
  return (
    <>
      <div
        className={
          sender === "ChatGPT" ? styles.bot_message :  sender === 'user' ? styles.user_message : styles.system
        }
      >
        {message}
      </div>
    </>
  );
};

export default Message;
