function updateBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const campo = document.getElementById(`input${i}${j}`);
            board[i][j] = campo.value;
        }
    }
}
function disableInput() {
    inputs.forEach(function (inputItem) {
        inputItem.setAttribute("disabled", inputItem.disabled)
    })
}
function checkWinner() {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] !== "") {
        disableInput()
        winnerOfTheRound.value = playerOnTheTurn.value
        document.getElementById('input00').classList.add('win')
        document.getElementById('input11').classList.add('win')
        document.getElementById('input22').classList.add('win')
        
        return
    }
    else if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        disableInput()
        document.getElementById('input02').classList.add('win')
        document.getElementById('input11').classList.add('win')
        document.getElementById('input20').classList.add('win')
        return
    }
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
            disableInput()
            for (let j = 0; j < 3; j++) {
                const campo = document.getElementById(`input${i}${j}`);
                campo.classList.add('win');
            }
            return
        }
    }
    for (let j = 0; j < 3; j++) {
        if (board[0][j] === board[1][j] && board[1][j] === board[2][j] && board[0][j] !== "") {
            disableInput()
            for (let i = 0; i < 3; i++) {
                const campo = document.getElementById(`input${i}${j}`);
                campo.classList.add('win');
            }
            return
            
        }
    }
}
function resetGame() {
    inputs.forEach(function (inputItem) {
        inputItem.value = ""
        inputItem.removeAttribute('disabled')
        inputItem.classList.remove('win')
    })
    winnerOfTheRound.value = ""
}
const board = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"]
];
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const inputs = document.getElementsByName('inputGame')
const winnerOfTheRound = document.getElementById('winnerOfTheRound')
let playerActual = "X"
let playerOnTheTurn = document.getElementById("playerOnTheTurn")
document.getElementById('startGame').addEventListener('click', function () {
    if (player1.value !== "" && player2.value !== "") {
        inputs.forEach(function (inputItem) {
            inputItem.removeAttribute("disabled");
            playerOnTheTurn.value = player1.value
        })
    }
})

inputs.forEach(function (inputItem) {
    inputItem.addEventListener('input', function (ev) {
        ev.target.value = ev.target.value.toUpperCase();
        if (playerActual === 'X' && ev.target.value === 'O') {
            ev.target.value = ''
        }
        else if (playerActual === 'O' && ev.target.value === 'X') {
            ev.target.value = ''
        }
        else if (ev.target.value === 'X' || ev.target.value === 'O') {
            updateBoard();
            checkWinner()
            playerActual = playerActual === 'X' ? 'O' : 'X'
            playerOnTheTurn.value = playerOnTheTurn.value === player1.value ? player2.value : player1.value
            ev.target.setAttribute('disabled', ev.target.disabled)
        }
        else {
            ev.target.value = '';
        }

    })
})
document.getElementById('button-reset').addEventListener('click', resetGame)
