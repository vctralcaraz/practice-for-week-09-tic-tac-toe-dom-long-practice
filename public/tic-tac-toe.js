// Your code here
let board = [
    '','','',
    '','','',
    '','',''
];

let gameOver = false;
let turn = 'X';

window.addEventListener('DOMContentLoaded', () => {
    setup();
});

const setup = () => {
    const winningHeader = document.getElementById('winning-header');
    const winner = document.getElementById('winner');
    const cells = document.querySelectorAll('.cell');
    const newGameButton = document.getElementById('new-game');
    const giveUpButton = document.getElementById('give-up');

    newGameButton.disabled = true;
    giveUpButton.disabled = false;

    newGameButton.addEventListener('click', () => clearGame(cells));
    giveUpButton.addEventListener('click', function() {
        gameOver = true;
        winner.innerHTML = turn === 'X' ? 'O' : 'X';
        winningHeader.setAttribute('class', 'show');

        newGameButton.disabled = false;
        giveUpButton.disabled = true;
    });

    winningHeader.setAttribute('class', 'hide');
    winner.innerHTML = '';

    const handleClick = e => {
        const id = e.target.id.split('-')[1];
        if(board[id] === '' && !gameOver) {
            if(turn === 'X') {
                console.log('X');
                board[id] = 'X';
                e.target.innerHTML = `<img src="${getURL(board[id])}">`;
                console.log(board)
                gameOver = checkWin(board[id]);
                console.log(gameOver);
                turn = 'O';
            } else {
                console.log('O');
                board[id] = 'O';
                e.target.innerHTML = `<img src="${getURL(board[id])}">`;
                console.log(board)
                gameOver = checkWin(board[id]);
                console.log(gameOver);
                turn = 'X';
            }
        }

        // console.log('before gameOver actions', gameOver)
        if(gameOver === 'tie') {
            winner.innerHTML = 'None';
            winningHeader.setAttribute('class', 'show');

            newGameButton.disabled = false;
            giveUpButton.disabled = true;
        } else if (gameOver) {
            winner.innerHTML = turn === 'X' ? 'O' : 'X';
            winningHeader.setAttribute('class', 'show');

            newGameButton.disabled = false;
            giveUpButton.disabled = true;
        }
    }

    cells.forEach(selection => {
        selection.addEventListener('click', handleClick);
    });
}

const checkWin = (turn) => {
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    let check = [];

    for( let i = 0; i < board.length; i++) {
        if(board[i] === turn) {
            check.push(i);
        }
    }

    for( let j = 0; j < winConditions.length; j++) {
        let win = winConditions[j].every(el => check.includes(el));

        if(win) {
            return true;
        }
    }
    if(check.length >= 5) {
        return 'tie';
    }
    return false;
}

const clearGame = els => {
    board.length = 0;
    board = [
        '','','',
        '','','',
        '','',''
    ];

    els.forEach( el => {
        el.innerHTML = '';
    });

    gameOver = false;
    turn = 'X';

    setup();

    console.log('new game set');
}

const getURL = turn => `https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-${turn.toLowerCase()}.svg`
