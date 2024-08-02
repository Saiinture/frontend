import { Image } from "@chakra-ui/react";
import styles from "./Player.module.css";
import { FC } from "react";
import placeholder_image from "../../../../assets/placeholder_avatar.jpg";

interface playerProps {
    name: string;
    title: string;
    image?: string | null;
}

const Player:FC<playerProps> = ({name, title, image}) => {
  return (
    <>
      <div className={styles.container}>
        <Image className={styles.image} src={image !== undefined && image !== null ? image : placeholder_image} alt="Player" />
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.title}>{title}</p>
      </div>
    </>
  );
};

export default Player;
