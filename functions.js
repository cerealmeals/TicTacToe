const Board = (function() {
    let size = 3; // number of rows and columns on the board
    const board = []; // stores the values in the board
    makeBoard(); // make an initial board

    // make the inital array with no characters
    const makeBoard = function (){
        for(let i = 0; i < size*size; i++){
            board.push("");
        }
    }

    // clear the array to set up for another game
    const clearboard = function (){
        for(let i = 0; i < size*size; i++){
            board[i] = "";
        }
    }

    // set a new size for a new game
    const setSize = function(n){
        board.splice(0, board.length);
        size = n;
        makeBoard();
    }

    // getter for size
    const getSize = () => size;
    return {board, clearboard, setSize, getSize, makeBoard};
})();

const display = (function(){

    // creates the elements to display the board to the screen
    const createBoard = function (){
        const root = document.querySelector(".board");
        for (let i = 0; i < Board.getSize()**2; i++){
            const square = document.createElement("div");
            square.classList.add("square");
            square.addEventListener("click", function(){
                square.textContent = Logic.place();
                Logic
                Logic.checkWinner(Board);
            })
            square.textContent = Board.board[i];
            root.appendChild(square);
        }
    }

    // clear the elements on the screen to make a new board
    const clearboard = function (){

    }
    return {createBoard, clearboard}
})();

const Logic = (function(){
    let Xturn = true; //on true it is X's turn on false it is O's turn 

    //getting for who's turn it is, returns a string either X or O
    const getTurn = function(){
        if(Xturn){
            return "X";
        }
        else{
            return "O";
        }
    }

    // returns the turn and swaps who's turn it is
    const place = function (){
        if(Xturn){
            Xturn = false;
            return "X";
        }
        else{
            Xturn = true;
            return "O";
        }
    }

    // checks if the current board stat has a winner
    const checkWinner = function(){
        console.log("no logic implemented");
    }
    return {getTurn, checkWinner, place}
})();


console.log(Board.board);
