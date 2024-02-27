// Your code here
let board = [
    '','','',
    '','','',
    '','',''
];

window.addEventListener('DOMContentLoaded', () => {
    setup();
});

const setup = () => {
    let turn = 'X';
    const xURL = 'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg';
    const oURL = 'https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg';

    let gameOver = false;

    const handleClick = e => {
        const id = e.target.id.split('-')[1];
        if(board[id] === '' && !gameOver) {
            if(turn === 'X') {
                console.log('X');
                board[id] = 'X';
                e.target.innerHTML = `<img src="${xURL}">`;
                gameOver = checkWin('X');
                turn = 'O';
            } else {
                console.log('O');
                board[id] = 'O';
                e.target.innerHTML = `<img src="${oURL}">`;
                gameOver = checkWin('O');
                turn = 'X';
            }
        }

        if(gameOver === 'tie') {
            const winningHeader = document.getElementById('winning-header');
            const winner = document.getElementById('winner');
            winner.innerHTML = 'None';
            winningHeader.setAttribute('class', 'show');
        } else if (gameOver) {
            const winningHeader = document.getElementById('winning-header');
            const winner = document.getElementById('winner');
            winner.innerHTML = turn === 'X' ? 'O' : 'X';
            winningHeader.setAttribute('class', 'show');
        }

    }

    const cell = document.querySelectorAll('.cell');

    cell.forEach(selection => {
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
