import { FC, useState } from "react";
import styles from "./MessageInput.module.css";
import { HiPaperAirplane } from "react-icons/hi2";

interface messageInputProps {
  handleSend: (message: string, sender: string) => void;
}

const MessageInput: FC<messageInputProps> = ({ handleSend }) => {
  const [message, setMessage] = useState<string>("");
  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.message_input}
          placeholder="Type your message"
          type="text"
          name=""
          id=""
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={styles.button}
          type="button"
          disabled={message.length === 0}
          onClick={() => {
            handleSend(message, 'user');
            setMessage("");
          }}
        >
          Send <HiPaperAirplane />{" "}
        </button>
      </div>
    </>
  );
};

export default MessageInput;
