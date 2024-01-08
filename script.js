function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }
    
    const getBoard = () => board;

    const markCell = (row, column, activePlayerMark) => {
        if(board[row][column].getValue() !== 0) return;
        board[row][column].addMark(activePlayerMark);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((rowCell) => rowCell.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

    return {getBoard, markCell, printBoard}
}


function Cell(){
    let value = 0;

    const addMark = (playerMark) => {
        value = playerMark;
    };

    const getValue = () => value;

    return {
        addMark, 
        getValue
    }
}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
){
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: "X"
        },
        {
            name: playerTwoName,
            mark: "O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;
    
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} marked row ${row} column ${column}`);
        board.markCell(row, column, getActivePlayer().mark);
        
        switchPlayerTurn();
        printNewRound();
    }
    printNewRound();
    return {
        playRound,
        getActivePlayer
    }
}

const game = gameController();

