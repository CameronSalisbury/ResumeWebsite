const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = 1;
let gameEnded = false;

const gameBoard = document.getElementById('game-board');
const messageElement = document.getElementById('message');

// Initialize the board
function initializeBoard() {
    for (let row = 0; row < ROWS; row++) {
        board[row] = [];
        for (let col = 0; col < COLS; col++) {
            board[row][col] = 0;
        }
    }
}

// Render the board
function renderBoard() {
    gameBoard.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => dropToken(col));
            if (board[row][col] === 1) {
                const token = document.createElement('div');
                token.classList.add('token', 'player1');
                cell.appendChild(token);
            } else if (board[row][col] === 2) {
                const token = document.createElement('div');
                token.classList.add('token', 'player2');
                cell.appendChild(token);
            }
            gameBoard.appendChild(cell);
        }
    }
}

// Drop token in column
function dropToken(col) {
    if (gameEnded) return;
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            renderBoard();
            if (checkWin(row, col)) {
                gameEnded = true;
                messageElement.textContent = `Player ${currentPlayer} wins!`;
                return;
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            return;
        }
    }
}

// Check for win
function checkWin(row, col) {
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1]
    ];
    for (let [dx, dy] of directions) {
        let count = 1;
        for (let direction of [-1, 1]) {
            let r = row + direction * dx;
            let c = col + direction * dy;
            while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
                count++;
                r += direction * dx;
                c += direction * dy;
            }
        }
        if (count >= 4) return true;
    }
    return false;
}

// Reset the game
function resetGame() {
    initializeBoard();
    currentPlayer = 1;
    gameEnded = false;
    messageElement.textContent = '';
    renderBoard();
}

initializeBoard();
renderBoard();
