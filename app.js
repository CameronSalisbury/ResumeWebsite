/*
TODO:
Include depth first AI
Include difficulty settings button(Depth level)
*/
const rows = 6;
const cols = 7;
const board = [];
let currentPlayer = 'red';
let isAIActive = false;

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
            return; // End the function after processing the turn
        }
        
    }


    // Check if it's the AI's turn and if AI is active
    if (currentPlayer === 'yellow' && isAIActive) {
        // AI makes a move after a delay
        setTimeout(() => {
            aiMove();
        }, 150);
    }
};

//Checkwin Library
const checkWin = () => {
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
    
    //Bogo AI
    if (availableColumns.length > 0) {
        const chosenCol = availableColumns[Math.floor(Math.random() * availableColumns.length)];
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

document.getElementById('reset').addEventListener('click', resetGame);

initBoard();
renderBoard();
