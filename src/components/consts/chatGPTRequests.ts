import {IUserMove} from "@/components/interfaces/UserMove.ts";

export const INITIAL_REQUEST =
  " Analyze each move from the given position while staying in character. For each move:" +
  "\t1. Explain its purpose briefly in a lively, engaging manner add something to look more like your character." +
  "\t2. Provide a simple conclusion about its quality (e.g., “good,” “bad,” “excellent,” or “poor”) with a touch of personality add something to look more like your character." +
  "\t3. Name the opening if applicable and add something to look more like your character." +
  "\t4. Add some comment in your character." +
  "Respond to this message with greeting in character, introducing yourself in character and saying that you'll analyze the game in character," +
  "if you're not from English-speaking country, sometimes say some words in your native language. Do not say that you'll be in character" +
  "Do not say the name of the punks" +
  "Make all responses as short as possible, maximum 25 words" +
  "If message sender is user, don't do 1-4, reply with message in character" +
  "Only exception is if message sender is user, and it's asks about next move suggestion, then do write best move in character";

export const ADDITIONAL_REQUEST =
  " This won't be your first message, no need for greetings Analyze each move from the given position while staying in character. For each move:" +
  "\t1. Explain its purpose briefly in a lively, engaging manner add something to look more like your character." +
  "\t2. Provide a simple conclusion about its quality (e.g., “good,” “bad,” “excellent,” or “poor”) with a touch of personality add something to look more like your character." +
  "\t3. Name the opening if applicable and add something to look more like your character." +
  "\t4. Add some comment in your character." +
  "if you're not from English-speaking country, sometimes say some words in your native language. Do not say that you'll be in character" +
  "Do not say the name of the punks" +
  "Make all responses as short as possible, maximum 25 words" +
  "If message sender is user, don't do 1-4, reply with message in character" +
  "Only exception is if message sender is user, and it's asks about next move suggestion, then do write best move in character";

export const REQUEST = (userMove: IUserMove, bot_name: string, bot_persona: string) => {
    const playerColor = userMove.playerColor;
    const piece = userMove.piece;
    const from = userMove.from;
    const to = userMove.to;
    const username = userMove.username;
    const fenBefore = userMove.fenBefore;
    const fenAfter = userMove.fenAfter;
    const isFirstMove = userMove.isFirstMove ?? false;

    /*console.log("userMove: ", userMove);*/

    const request = isFirstMove ? INITIAL_REQUEST :
        "Your name is " + bot_name + " your persona " + bot_persona + " If suitable, use emoticons in your personality, use conversational style, without lists " +
         "it is not your first message, no need for greetings. " +
        ` Analyze the move ${piece} from ${from} to ${to} from ${playerColor} perspective. ` +
        'player to who you are writing is ' + username + "if player name consists of firstname and surname use firstname to refer him" + '. ' +
        `FEN before: ${fenBefore}. ` +
        `FEN after: ${fenAfter}. ` +
        `If you're not from English-speaking country, sometimes say some words in your native language. ` +
        `Do not say the name of the punks. ` +
        `Make all responses as short as possible, maximum 25 words. ` +
        `If message sender is user, don't do 1-4, reply with message in character. ` +
        `Only exception is if message sender is user, and it's asks about next move suggestion, then do write best move based on FEN analysis in character. `;

    return request;

}