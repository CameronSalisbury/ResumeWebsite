// AI move function
const aiMove = () => {
    let availableColumns = [];
    for (let c = 0; c < cols; c++) {
        if (!board[0][c]) {
            availableColumns.push(c);
        }
    }
    /*
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
    */
    if (availableColumns.length > 0) {
        //Put AI stuff here?

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