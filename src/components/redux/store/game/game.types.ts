export interface IGame {
    fen: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chat: any[];
    isInitialized: boolean;
    firstMoveMade: boolean;
}