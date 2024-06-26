

const Board = (function() {
    let size = 3; // number of rows and columns on the board
    let board = []; // stores the values in the board

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
        for (let i = 0; i < size; i++){
            board.pop();
        }
        size = Number(n);
        makeBoard();
    }

    // getter for size
    const getSize = () => size;
    return {board, clearboard, setSize, getSize, makeBoard};
})();

const display = (function(){

// set up the button that resets the size of the board
const setSize = document.querySelector("form")
setSize.addEventListener("submit", function(e){
    if(e.preventDefault){
        e.preventDefault();
    }

    Board.setSize(document.getElementById("size").value);
    display.clearBoard();
    display.makeBoard();
    display.clearSymbols();
    Logic.resetGame();
});

// button that clears the board
const clear = document.querySelector(".clear");
clear.addEventListener("click", function(){
    Board.clearboard();
    display.clearSymbols();
    Logic.resetGame();
});

    // creates the elements to display the board to the screen
    const makeBoard = function (){
        const root = document.querySelector(".board");
        root.style["grid-template-columns"] = "repeat(" + Board.getSize().toString() + ", 100px)";
        root.style["grid-template-rows"] = "repeat(" + Board.getSize().toString() + ", 100px)";
        for (let i = 0; i < Board.getSize()**2; i++){
            const square = document.createElement("div");
            square.setAttribute("id", i.toString())
            square.classList.add("square");
            square.addEventListener("click", function(e){
                if ((Logic.getWon() == false) && (square.textContent == "")){   
                    let symbol = Logic.place();
                    square.textContent = symbol;
                    let id = Number(e.target.id);
                    Board.board[id] = symbol;
                    Logic.checkWinner(id);
                }
            })
            square.textContent = Board.board[i];
            root.appendChild(square);
        }
    }

    // clear the elements on the screen to make a new board
    const clearSymbols = function (){
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => square.textContent = "");
    }

    const clearBoard = function(){
        const root = document.querySelector(".board");
        root.replaceChildren();
    }
    return {makeBoard, clearBoard, clearSymbols}
})();

const Logic = (function(){
    let Xturn = true; //on true it is X's turn on false it is O's turn 
    let won = false;
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
        const turn = document.querySelector(".turn");
        if(Xturn){
            turn.textContent = "O's turn";
            Xturn = false;
            return "X";
        }
        else{
            turn.textContent = "X's turn";
            Xturn = true;
            return "O";
        }
    }

    // checks if the current board stat has a winner
    // location_changed is the index of the board array that has just been changed
    // returns nothing
    const checkWinner = function(location_changed){
        let i = 0;
        let size = Board.getSize();
        let currently_checking = location_changed;
        let symbol = Board.board[location_changed];
        let flag = true;
        //checking if row is a win
        while (i < size && flag){
            currently_checking++;
            if((currently_checking % size) == (0)){
                currently_checking = currently_checking - size;
            }
            if(Board.board[currently_checking] != symbol){
                flag = false;
            }
            else{
                i++
            }
        }
        if(i == size){
            const turn = document.querySelector(".turn");
            turn.textContent = ("The Winner is " + symbol);
            won = true;
            console.log("row");
            return;
        }

        currently_checking = location_changed;
        flag = true;
        i = 0;
        //checking if column is true
        while(i < size && flag){
            currently_checking = (currently_checking + size)% size**2;
            if(Board.board[currently_checking] != symbol){
                flag = false;
            }
            else{
                i++
            }
        }
        if(i == size){
            const turn = document.querySelector(".turn");
            turn.textContent = ("The Winner is " + symbol);
            won = true;
            console.log("column");
            return;
        }

        currently_checking = location_changed;
        flag = true;
        i = 0;
        // Check diagonal top left to bottom right
        if(currently_checking % (size +1) == 0){
            while(i < size && flag){
                currently_checking = currently_checking + size + 1;
                if(currently_checking > (size**2)-1){
                    currently_checking = 0;
                }
                if(Board.board[currently_checking] != symbol){
                    flag = false;
                }
                else{
                    i++
                }
            }
            if(i == size){
                const turn = document.querySelector(".turn");
                turn.textContent = ("The Winner is " + symbol);
                won = true;
                console.log("top left to bottum right");
                return;
            } 
        }

        currently_checking = location_changed;
        flag = true;
        i = 0;
        // Check diagonal top right to bottom left
        if((currently_checking % (size -1) == 0)&& currently_checking != 0){
            while(i < size && flag){
                currently_checking = currently_checking + size - 1;
                if(currently_checking > (size**2)-size){
                    currently_checking = size - 1;
                }
                if(Board.board[currently_checking] != symbol){
                    flag = false;
                }
                else{
                    i++
                }
            }
            if(i == size){
                const turn = document.querySelector(".turn");
                turn.textContent = ("The Winner is " + symbol);
                won = true;
                console.log("top right to bottom left");
                return;
            }
        }

    }

    // reset the win variable
    const resetGame = function (){
        won = false;
        const turn = document.querySelector(".turn");
        turn.textContent = (Logic.getTurn() + "'s turn");
    }

    // getter for won variable
    const getWon = () => won;
    return {getTurn, getWon, checkWinner, place, resetGame}
})();





Board.makeBoard();
display.makeBoard();

