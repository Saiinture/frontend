import axios from "axios";
import {IBot} from "@/components/interfaces/Bot.ts";

export const getBots = async () => {
    const response = await axios.get<IBot[]>("https://api.saiinture.com/getAllBots");
    return response.data;
}

export const getBotById = async (bot_id: number) => {
    const response = await axios.get<IBot>(`https://api.saiinture.com/getBot/${bot_id}`);
    return response.data;
}