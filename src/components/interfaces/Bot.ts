export interface IBot {
    id: number;
    bot_id: string;
    bot_name: string;
    level: "easy" | "medium" | "hard" | "very hard" | "very_hard";
    persona: string;
    avatar_url: string;
}