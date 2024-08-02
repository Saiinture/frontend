export interface IMove{
    id: number;
    pice: string;
    piece_color: string;
    from: string;
    to: string;
}

export interface IMoves {
    moves: IMove[];
}