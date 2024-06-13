

const Board = (function() {
    let size = 3;
    const board = [];
    for(let i = 0; i < size; i++){
        board[i] = []
        for(let j = 0; j < size; j++)
            board[i].push("");
    }

    const clearboard = function (){
        for(let i = 0; i < size; i++){
            board[i] = []
            for(let j = 0; j < size; j++)
                board[i].push("");
        }
    }

    const setSize = function(n){
        size = n;
        clearboard();
    }

    const getSize = () => size;
    return {board, clearboard, setSize, getSize};
})();

console.log(Board.board);


Board.board[0][0] = "x";

console.log(Board.board)

