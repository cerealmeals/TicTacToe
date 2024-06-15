

const Board = (function() {
    let size = 3; // number of rows and columns on the board
    const board = []; // stores the values in the board

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
    const makeBoard = function (){
        const root = document.querySelector(".board");
        root.style["grid-template-columns"] = "repeat(" + Board.getSize().toString() + ", 100px)";
        root.style["grid-template-rows"] = "repeat(" + Board.getSize().toString() + ", 100px)";
        for (let i = 0; i < Board.getSize()**2; i++){
            const square = document.createElement("div");
            square.setAttribute("id", i.toString())
            square.classList.add("square");
            square.addEventListener("click", function(e){
                if (Logic.getWon() == false){   
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
    const clearBoard = function (){
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => square.textContent = "");
    }
    return {makeBoard, clearBoard}
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
            return;
        }

        currently_checking = location_changed;
        flag = true;
        i = 0;
        // Check diagonal top left to bottom right
        if(currently_checking % (size +1) == 0){
            while(i < size && flag){
                currently_checking += size + 1;
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
                return;
            } 
        }

        currently_checking = location_changed;
        flag = true;
        i = 0;
        // Check diagonal top right to bottom left
        if((currently_checking % (size -1) == 0)&& currently_checking != 0){
            while(i < size && flag){
                currently_checking += size - 1;
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
                return;
            }
        }

    }

    // getter for won variable
    const getWon = () => won;
    return {getTurn, getWon, checkWinner, place}
})();


// set up the button that resets the size of the board
const setSize = document.querySelector("form button")
setSize.addEventListener("submit", function(e){
    if(e.preventDefault){
        e.preventDefault();
    }

    Board.setSize(document.getElementById("size").value);
    display.makeBoard();

});

// button that clears the board
const clear = document.querySelector(".info.clear");
clear.addEventListener("click", function(){
    Board.clearboard();
    display.clearBoard()
});


Board.makeBoard();
display.makeBoard();

