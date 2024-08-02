function difficultyToDepth(difficulty: string){

    let depth: number = 2;

    if(difficulty === "easy") {
        depth = 1;
    }else if (difficulty === "medium") {
        depth = 2
    }else if (difficulty === "hard") {
        depth = 3
    }
    else if (difficulty === "very hard") {
        depth = 4
    }
    else {
        depth = 2
    }


    return depth;
}

export default difficultyToDepth;