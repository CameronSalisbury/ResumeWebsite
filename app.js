/*
TODO:
Include depth first AI
Include difficulty settings button(Depth level)
*/
const rows = 6;
const cols = 7;
const board = [];
let currentPlayer = 'red';
let isAIActive = true;
let score = 22;
let turn = 1;
let depth = 3; //Interchangable

//Create Board
const initBoard = () => {
    for (let r = 0; r < rows; r++) {
        board[r] = Array(cols).fill(null);
    }
};

//Calls this to update new "Stones" (thanks pascal)
const renderBoard = () => {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (board[r][c]) {
                cell.classList.add(board[r][c]);
            }
            cell.addEventListener('click', () => handleClick(c));
            boardElement.appendChild(cell);
        }
    }
};

//Processes turn order and if AI is active
const handleClick = (col) => {
    // Ensure the column is within bounds
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            renderBoard(); // Update the visual representation of the board
            
            // Check for a win condition after making the move
            if (checkWin()) {
                setTimeout(() => {
                    alert(`${currentPlayer} wins!`);
                    initBoard(); // Reset the board for a new game
                    renderBoard(); // Render the empty board
                }, 100);
                return; // End the function after announcing the win
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            // Check if it's the AI's turn and if AI is active
            if (currentPlayer === 'yellow' && isAIActive) {
                // AI makes a move after a delay
                setTimeout(() => {
                    aiMove();
                }, 150);
            }
            return; // End the function after processing the turn
        }
        
    }

};

//Checkwin Library
const checkWin = (boardToCheck = board) => {
    const checkDirection = (dr, dc) => {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const color = board[r][c];
                if (color && checkLine(r, c, dr, dc, color)) {
                    return true;
                }
            }
        }
        return false;
    };

    const checkLine = (r, c, dr, dc, color) => {
        for (let i = 0; i < 4; i++) {
            const nr = r + i * dr;
            const nc = c + i * dc;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || board[nr][nc] !== color) {
                return false;
            }
        }
        return true;
    };

    return checkDirection(0, 1) || // horizontal
           checkDirection(1, 0) || // vertical
           checkDirection(1, 1) || // diagonal down-right
           checkDirection(1, -1);  // diagonal down-left
};

//reset game button
const resetGame = () => {
    currentPlayer = 'red';
    initBoard();
    renderBoard();
};

//AI work, Would like to put this in a seperate JS file. We will see.
const aiMove = () => {
    let availableColumns = [];
    for (let c = 0; c < cols; c++) {
        if (!board[0][c]) {
            availableColumns.push(c);
        }
    }
    
    
    if (availableColumns.length > 0) {
        //AI code
        /*
        score is points given based of AI moves
        turn is used to suptrat from scroes
        depth is the difficulty
        */
        //Bogo search
        const chosenCol = availableColumns[Math.floor(Math.random() * availableColumns.length)];

        let chosenRow;
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][chosenCol]) {
                chosenRow = r;
                break;
            }
        }

        //for (i=0; i < depth; i++){
            if (simulateMove(chosenRow, chosenCol, currentPlayer)) {
                console.log(`Placing a ${currentPlayer} piece in column ${col} results in a win!`);
            }
        //};

        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][chosenCol]) {
                board[r][chosenCol] = 'yellow'; // Assuming AI is 'yellow'
                renderBoard();
                if (checkWin()) {
                    setTimeout(() => {
                        alert('AI wins!');
                        initBoard();
                        renderBoard();
                    }, 100);
                    return;
                }
                currentPlayer = 'red'; // Switch back to human player
                return;
            }
        }
    }
};

const copyBoard = (originalBoard) => {
    return originalBoard.map(row => row.slice());
};

const simulateMove = (row, col, color) => {
    //alert('test');
    const tempBoard = copyBoard(board); // Create a copy of the board
    tempBoard[row][col] = color; // Place the piece on the copy
    const result = checkWin(tempBoard); // Check win condition on the copy
    return result; // Return whether the move would result in a win
};



document.getElementById('reset').addEventListener('click', resetGame);

initBoard();
renderBoard();
