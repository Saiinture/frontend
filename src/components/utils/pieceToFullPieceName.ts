function pieceToFullPieceName(piece: string) {
    let fullPieceName: string = "";

    if(piece === "wP") {
        fullPieceName = "white pawn";
    }
    else if(piece === "wN") {
        fullPieceName = "white knight";
    }
    else if(piece === "wB") {
        fullPieceName = "white bishop";
    }
    else if(piece === "wR") {
        fullPieceName = "white rook";
    }
    else if(piece === "wQ") {
        fullPieceName = "white queen";
    }
    else if(piece === "wK") {
        fullPieceName = "white king";
    }
    else if(piece === "bP") {
        fullPieceName = "black pawn";
    }
    else if(piece === "bN") {
        fullPieceName = "black knight";
    }
    else if(piece === "bB") {
        fullPieceName = "black bishop";
    }
    else if(piece === "bR") {
        fullPieceName = "black rook";
    }
    else if(piece === "bQ") {
        fullPieceName = "black queen";
    }
    else if(piece === "bK") {
        fullPieceName = "black king";
    }
    else {
        fullPieceName = "unknown piece";
    }
    return fullPieceName;
}

export default pieceToFullPieceName;