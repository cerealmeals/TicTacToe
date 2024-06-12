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

let arr = [""];
let x = 0;
console.log(arr[0]);
console.log(x);
console.log(Board.board);

arr[0] = "x";
x = 1;
Board.board[0][0] = "x";

console.log(arr[0])
console.log(x)
console.log(Board.board)