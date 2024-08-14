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

const initBoard = () => {
    for (let r = 0; r < rows; r++) {
        board[r] = Array(cols).fill(null);
    }
};

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

const handleClick = (col) => {
    //   
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            renderBoard();
            if (checkWin()) {
                setTimeout(() => {
                    alert(`${currentPlayer} wins!`);
                    initBoard();
                    renderBoard();
                }, 100);
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            // Check if it's the AI's turn and AI is active
            if (currentPlayer === 'yellow' && isAIActive) {
                // AI makes a move after a delay
                setTimeout(() => {
                    aiMove();
                }, 150);
            }
            return;
        }
    }
};

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

const resetGame = () => {
    initBoard();
    renderBoard();
};

document.getElementById('reset').addEventListener('click', resetGame);

initBoard();
renderBoard();
