import { useMemo } from "react";
import { useTypedSelector } from "./useTypedSelector";
import { useActions } from "./useActions";

export const useConfig = () => {
  const {
    who_plays,
    bot_name,
    bot_avatar_url,
    bot_difficulty,
    bot_personality,
  } = useTypedSelector((state) => state.config);
  const {
    setPlayer,
    setBotName,
    setBotAvatarURL,
    setBotDifficulty,
    setBotPersonality,
  } = useActions();
  return useMemo(
    () => ({
      who_plays,
      bot_name,
      bot_avatar_url,
      bot_difficulty,
      bot_personality,
      setPlayer,
      setBotName,
      setBotAvatarURL,
      setBotDifficulty,
      setBotPersonality,
    }),
    [
      who_plays,
      bot_name,
      bot_avatar_url,
      bot_difficulty,
      bot_personality,
      setPlayer,
      setBotName,
      setBotAvatarURL,
      setBotDifficulty,
      setBotPersonality,
    ]
  );
};
