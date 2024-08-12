const aiMove = () => {
    // Simple AI to pick a random column
    let availableColumns = [];
    for (let c = 0; c < cols; c++) {
        if (!board[0][c]) {
            availableColumns.push(c);
        }
    }

    const col = availableColumns[Math.floor(Math.random() * availableColumns.length)];
    handleClick(col);
};