export interface IUserMove {
    playerColor: "white" | "black";
    username: string;
    piece: string;
    from: string;
    to: string;
    fenBefore: string;
    fenAfter: string;
    isFirstMove?: boolean;
}