
const gameBoard = (() => {
    // Query HTML DOM to create position variables for our game board
    const pos1 = document.getElementById('p1');
    const pos2 = document.getElementById('p2');
    const pos3 = document.getElementById('p3');
    const pos4 = document.getElementById('p4');
    const pos5 = document.getElementById('p5');
    const pos6 = document.getElementById('p6');
    const pos7 = document.getElementById('p7');
    const pos8 = document.getElementById('p8');
    const pos9 = document.getElementById('p9');

    // Array to hold above game board space variables
    const gameSpaces = [undefined, pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9];

    for (i = 1; i < gameSpaces.length; i++) {
        let index = i
        gameSpaces[i].addEventListener('click', e => {
        if (!gameMarkers[index]) {
            gameMarkers[index] = players.getPlayer().addMarker();
            gameSpaces[index].classList.add(players.getPlayer().addClass());
            addMarkers();
            players.switchPlayer();
        }});
    }

    // Array to hold markers that we will use to update the space variables
    const gameMarkers = [undefined, '', '', '', '', '', '', '', '', ''];

    //Function to update spaces with markers
    const addMarkers = function() {
        for (let i = 1; i < gameMarkers.length; i++) {
            gameSpaces[i].textContent = gameMarkers[i];
        }
    }

    return {addMarkers}
})();

const players = (() => {
    // Player creator factory
    const addPlayer = (name, marker, markerclass) => {
        const addMarker = () => {return marker};
        const addClass = () => {return markerclass};
        return {addMarker, addClass};
    }
    
    // Create players - possibly adjust this process later if desired
    const player1 = addPlayer('Player 1', 'X', 'x');
    const player2 = addPlayer('Player 2', 'O', 'o');

    // Active player variable - will be used at game start and in the following function
    let activePlayer = player1;

    // Switch who's turn it is
    const switchPlayer = () => (activePlayer === player1) ? activePlayer = player2 : activePlayer = player1;

    const getPlayer = () => {return activePlayer};

    return {switchPlayer, getPlayer}
})();
