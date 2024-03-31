let currentPlayer = 'X';
let cells = document.querySelectorAll('.cell');
let gameEnded = false;

function handleClick(index) {
    if (!gameEnded && !cells[index].innerText) {
        cells[index].innerText = currentPlayer;
        if (checkWinner()) {
            gameEnded = true;
            displayMessage(`${currentPlayer} wins!`);
            highlightWinner();
            return;
        }
        if (checkDraw()) {
            gameEnded = true;
            displayMessage("It's a draw!");
            highlightDraw();
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O' && !gameEnded) {
            computerMove();
        }
    }
}

function computerMove() {
    let emptyCells = [];
    cells.forEach((cell, index) => {
        if (cell.innerText === '') {
            emptyCells.push(index);
        }
    });
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let chosenCell = emptyCells[randomIndex];
    cells[chosenCell].innerText = 'O';
    if (checkWinner()) {
        gameEnded = true;
        displayMessage('Computer wins!');
        highlightWinner();
        return;
    }
    if (checkDraw()) {
        gameEnded = true;
        displayMessage("It's a draw!");
        highlightDraw();
        return;
    }
    currentPlayer = 'X';
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        return combo.every(index => cells[index].innerText === currentPlayer);
    });
}

function checkDraw() {
    return Array.from(cells).every(cell => cell.innerText);
}

function highlightWinner() {
    cells.forEach(cell => {
        if (cell.innerText === currentPlayer) {
            cell.classList.add('winner');
        }
    });
}

function highlightDraw() {
    cells.forEach(cell => {
        cell.classList.add('draw');
    });
}

function displayMessage(message) {
    let messageElement = document.getElementById('message');
    messageElement.innerText = message;
}
function resetGame() {
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('winner', 'draw');
    });
    gameEnded = false;
    displayMessage('');
}
