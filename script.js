
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
    const container = document.querySelector('.container');
    const startButton = document.querySelector('.start-game');
    const board = document.querySelector('.game-board')
    const soundStart = new Audio("audio/start-game-sound.wav")
    const soundClick = new Audio("audio/Click-Sound.wav");
    const soundSuccess = new Audio("audio/Success-Sound.wav");

    // Array to hold above game board space variables
    const gameSpaces = [undefined, pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9];

    // Array to hold markers that we will use to update the space variables
    const gameMarkers = [undefined, '', '', '', '', '', '', '', '', ''];

    // Add event listeners to all gameboard spaces
    for (i = 1; i < gameSpaces.length; i++) {
        let index = i
        gameSpaces[i].addEventListener('click', e => {
            // if statement to check if gameOn is true AND if the space is empty before executing code below
            if (gameOn && !gameMarkers[index]) {
                gameMarkers[index] = players.getPlayer().addMarker();
                gameSpaces[index].classList.add(players.getPlayer().addClass());
                soundClick.play();
                addMarkers();
                gameOverCheck();
                if (gameOn) {
                    players.switchPlayer();
                    players.switchIcon();
                }
        }});
    }

    //Function to update spaces with markers
    const addMarkers = function() {
        for (let i = 1; i < gameMarkers.length; i++) {
            gameSpaces[i].textContent = gameMarkers[i];
        }
    }

    // Function to reset markers and classes from board space divs when game is relayed
    const clearMarkers = function() {
        for (let i = 1; i < gameMarkers.length; i++) {
            gameMarkers[i] = '';
            // remove any classes that have been added to board space divs when 'Play Again?' button is pressed
            gameSpaces[i].classList.remove('x', 'o')
        }
        addMarkers();
    }

    // game logic variable
    let gameOn = false;

    // Make start button change gameOn to true and then hide itself.
    startButton.addEventListener('click', e => {
        gameOn = true;
        soundStart.play(); //play sound on button click
        // Board starts off semi-transparent; remove that effect
        board.classList.remove('board-off')
        players.setIcon();
        clearMarkers(); // make sure markers are cleared before starting the game
        startButton.id = ('hide');
        // reset activeplayer to Player 1 in event Player 2 wins a game and the 'Play Again?' button is pressed
        if (players.getPlayer().getName() === 'Player 2') {
            players.switchPlayer();
        }
        // remove game-result div if present
        if (container.childElementCount > 3) {
            container.lastChild.remove();
        }
    })

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
            gameOn = false;
            board.classList.add('board-off');
            // Unhide start button - change text to 'Play Again' rather than 'Start Game'
            startButton.removeAttribute('id');
            startButton.textContent = 'Play Again?';
            //create div to display winner
            declareResult.declareWinner().textContent=`${players.getPlayer().getName()} is the winner!`;
            container.appendChild(declareResult.declareWinner());
            soundSuccess.play();
        } else if (gameMarkers[1] !== '' && gameMarkers[2] !== '' && gameMarkers[3] !== '' &&
                   gameMarkers[4] !== '' && gameMarkers[5] !== '' && gameMarkers[6] !== '' &&
                   gameMarkers[7] !== '' && gameMarkers[8] !== '' && gameMarkers[9] !== ''){
            gameOn = false;
            board.classList.add('board-off');
            startButton.removeAttribute('id');
            startButton.textContent = 'Play Again?';
            //create div to display tie game
            container.appendChild(declareResult.declareTie());
            soundSuccess.play();
        }
    }
})();

const players = (() => {

    //target both player icon divs
    const getPlayerOne = document.querySelector('.player-one');
    const getPlayerTwo = document.querySelector('.player-two');

    // Player creator factory
    const addPlayer = (name, marker, markerclass) => {
        const getName = () => {return name};
        const addMarker = () => {return marker};
        const addClass = () => {return markerclass};
        return {getName, addMarker, addClass};
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

const declareResult = (() => {
    const winner = document.createElement('div');
    winner.classList.add('game-result');
    const declareWinner = () => {return winner};

    const tie = document.createElement('div');
    tie.classList.add('game-result');
    tie.textContent = 'Tie match!';
    const declareTie = () => {return tie};

    return {declareWinner, declareTie}
})();
