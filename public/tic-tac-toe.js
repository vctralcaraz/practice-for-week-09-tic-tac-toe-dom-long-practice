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

    const handleClick = (e) => {
        // console.log(e.target.id);
        const id = e.target.id.split('-')[1];
        if(board[id] === '') {
            if(turn === 'X') {
                console.log('X');
                board[id] = 'X';
                e.target.innerHTML = `<img src="${xURL}">`;
                turn = 'O';
            } else {
                console.log('O');
                board[id] = 'O';
                e.target.innerHTML = `<img src="${oURL}">`;
                turn = 'X';
            }
        }

    }

    const cell = document.querySelectorAll('.cell');

    cell.forEach(selection => {
        selection.addEventListener('click', handleClick);
    });
}
