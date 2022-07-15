
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
    const startButton = document.querySelector('.start-game');
    const board = document.querySelector('.game-board')
    let gameOn = false; 
    let gameOver = false;

    const gameStatus = () => {return gameOn};

    // Make start button change gameOn to true and remove button

    startButton.addEventListener('click', e => {
        gameOn = true;
        board.classList.remove('board-off')
        players.setIcon();
        clearMarkers();
        startButton.id = ('hide');
    })

    // Array to hold above game board space variables
    const gameSpaces = [undefined, pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9];

    for (i = 1; i < gameSpaces.length; i++) {
        let index = i
        gameSpaces[i].addEventListener('click', e => {
            // if statement to check if gameOver is false AND if the space is empty
            if (gameOn && !gameOver && !gameMarkers[index]) {
                gameMarkers[index] = players.getPlayer().addMarker();
                gameSpaces[index].classList.add(players.getPlayer().addClass());
                addMarkers();
                gameOverCheck();
                if (!gameOver) {
                    players.switchPlayer();
                    players.switchIcon();
                }
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

    const clearMarkers = function() {
        for (let i = 1; i < gameMarkers.length; i++) {
            gameMarkers[i] = '';
        }
        addMarkers();
    }

    // Check if there is a winner or tie
    const gameOverCheck = function() {
        if ((gameMarkers[1] === gameMarkers[2] && gameMarkers[1] === gameMarkers[3] && gameMarkers[1] !== '') ||
            (gameMarkers[4] === gameMarkers[5] && gameMarkers[4] === gameMarkers[6] && gameMarkers[4] !== '') ||
            (gameMarkers[7] === gameMarkers[8] && gameMarkers[7] === gameMarkers[9] && gameMarkers[7] !== '') ||
            (gameMarkers[1] === gameMarkers[4] && gameMarkers[1] === gameMarkers[7] && gameMarkers[1] !== '') ||
            (gameMarkers[2] === gameMarkers[5] && gameMarkers[2] === gameMarkers[8] && gameMarkers[2] !== '') ||
            (gameMarkers[3] === gameMarkers[6] && gameMarkers[3] === gameMarkers[9] && gameMarkers[3] !== '') ||
            (gameMarkers[1] === gameMarkers[5] && gameMarkers[1] === gameMarkers[9] && gameMarkers[1] !== '') ||
            (gameMarkers[7] === gameMarkers[5] && gameMarkers[7] === gameMarkers[3] && gameMarkers[7] !== '')) {
            console.log("Winner");
            gameOn = false;
            gameOver = true;
            board.classList.add('board-off');
            startButton.removeAttribute('id');
            startButton.textContent = 'Play Again?';
        } else if (gameMarkers[1] !== '' && gameMarkers[2] !== '' && gameMarkers[3] !== '' &&
                   gameMarkers[4] !== '' && gameMarkers[5] !== '' && gameMarkers[6] !== '' &&
                   gameMarkers[7] !== '' && gameMarkers[8] !== '' && gameMarkers[9] !== ''){
            console.log("Tie-game")
            gameOn = false;
            gameOver = true;
            board.classList.add('board-off');
            startButton.removeAttribute('id');
            startButton.textContent = 'Play Again?';
        }
        else {
            console.log("Game-On")
        }
    }

    return {addMarkers, gameOverCheck} //Remove gameOverCheck return when finished testing
})();

const players = (() => {

    //target both player icon divs
    const getPlayerOne = document.querySelector('.player-one');
    const getPlayerTwo = document.querySelector('.player-two');

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

    const setIcon = () => {
        getPlayerOne.classList.add('players-turn');
        getPlayerTwo.classList.remove('players-turn');
    }

    const switchIcon = function() {
        if (activePlayer === player2) {
            getPlayerTwo.classList.add('players-turn'); getPlayerOne.classList.remove('players-turn');
        }
        else if (activePlayer === player1) {
            getPlayerOne.classList.add('players-turn'); getPlayerTwo.classList.remove('players-turn');
        }
    }
    const getPlayer = () => {return activePlayer};

    return {switchPlayer, getPlayer, setIcon, switchIcon};
})();
