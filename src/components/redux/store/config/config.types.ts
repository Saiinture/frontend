export interface IConfig {
    who_plays: "white" | "black";
    bot_name: string;
    bot_avatar_url: string;
    bot_difficulty: "easy" | "medium" | "hard" | "very hard";

    bot_personality: string;
}