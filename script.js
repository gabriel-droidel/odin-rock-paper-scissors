
function getComputerChoice()
{
    const randomNumber = Math.floor(Math.random() * 3) + 1; // Get random number from interval 1-3

    switch (randomNumber){
        case 1:
            return 'rock';
        case 2:
            return 'paper';
        case 3:
            return 'scissors';
    }
}

function playRound(playerOne, playerTwo)
{
    // Handle winning cases
    if (((playerOne==='rock')&&(playerTwo==='scissors'))
    ||((playerOne==='scissors')&&(playerTwo==='paper'))
    ||((playerOne==='paper')&&(playerTwo==='rock')))
    {
        return 'The Player';
    } else if (playerOne===playerTwo) // Handle draw case
        return 'Draw';
    else
        return 'The Computer';
}

function keepScore(winner,game)
{
        if(winner=='The Player')
            game.player++;
        else if(winner=='The Computer') 
            game.computer++;
        console.log(game);
        return game;
        
}

function playGame(){
    const game = {
        player:0, 
        computer:0, 
        round:1, 
        playerChoice:undefined, 
        computerChoice:undefined,
        maxRound : parseInt(document.querySelector('#rounds-slider').value,),
        computerEmojis: {rock: '🪨', paper: '📄', scissors: '✂️'},
        playerEmojis: {rock:'✊', paper: '✋',scissors : '✌️'}
    };
    createGameBoard(game);
    console.log(`Final game ${game}`);
}

//DOM Manipulation

document.addEventListener('DOMContentLoaded', ()=>{
    const startGameButton = document.querySelector('#start-game-button'); // add button to start playing the game
    startGameButton.addEventListener('click', () =>playGame());
})
document.addEventListener('DOMContentLoaded', ()=>{
    const roundsSlider = document.querySelector("#rounds-slider");
    const roundsDisplay = document.querySelector("#rounds-display");

    roundsSlider.addEventListener('input', ()=>{
        const rounds = roundsSlider.value;
        roundsDisplay.textContent=rounds;
    });
});

function createGameBoard(game)
{
    const pageContent = document.querySelector('.content');
    pageContent.textContent=''; // clear the page
    const messageSelection = document.createElement('div');
    messageSelection.textContent='Choose your pick!';
    const choicesBox = document.createElement('div');
    choicesBox.classList.add('choices-box');

    if (game.round > game.maxRound) {  // Stop the game after 5 rounds
      displayGameOver(game);
        return;
    }

    displayScore(game);
    pageContent.appendChild(messageSelection);
    pageContent.appendChild(choicesBox);

    const choices = [
        {name: 'Rock', action: chooseRock, display:'✊'}, 
        {name: 'Paper', action: choosePaper, display:'✋'}, 
        {name: 'Scissors', action: chooseScissors,display:'✌️'}];
    choices.forEach(choice =>{
        const button = document.createElement('button');
        button.textContent=choice.display; // get selection name from object inside the array
        button.classList.add('choice-button');
        button.addEventListener('click', ()=> choice.action(game)); // get custom function for each selection
        choicesBox.appendChild(button);
    })

}
function chooseRock(game)
{
    game.computerChoice=getComputerChoice();
    game.playerChoice = 'rock'
    const winner = playRound(game.playerChoice,game.computerChoice);
    keepScore(winner,game);
    displayResults(winner, game);
    game.round++;
}
function choosePaper(game)
{
    game.computerChoice=getComputerChoice();
    game.playerChoice = 'paper'
    const winner = playRound(game.playerChoice,game.computerChoice);
    keepScore(winner,game);
    displayResults(winner, game);
    game.round++;
}
function chooseScissors(game)
{
    game.computerChoice=getComputerChoice();
    game.playerChoice = 'scissors'
    const winner = playRound(game.playerChoice,game.computerChoice);
    keepScore(winner,game);
    displayResults(winner, game);
    game.round++;
}

function displayResults(winner, game)
{
    const pageContent = document.querySelector('.content');
    pageContent.textContent='';
    const nextRoundButton = document.createElement('button');
    nextRoundButton.textContent='Next Round';

    const messageSelection = document.createElement('div');

    if(winner==='Draw')
        messageSelection.textContent=`No winner! It's a draw!`;
    else
        messageSelection.textContent=`${winner} won this round!`;

    nextRoundButton.addEventListener('click', ()=> createGameBoard(game));
    displayRoundSelection(game);   
    displayScore(game);
    pageContent.appendChild(messageSelection);
    pageContent.appendChild(nextRoundButton);   
}

function displayScore(game)
{
    const pageContent = document.querySelector('.content');
    const scoreDisplay = document.createElement('div');
    const roundDisplay = document.createElement('h2');

    roundDisplay.textContent=`Round ${game.round}`;
    scoreDisplay.textContent=`Score:
    Player : ${game.player}
    Computer: ${game.computer}`;
    pageContent.appendChild(roundDisplay);
    pageContent.appendChild(scoreDisplay);
}

function displayGameOver(game) {
    const pageContent = document.querySelector('.content');
    pageContent.innerHTML = ''; // Clear the page content
    
    const gameOverContainer = document.createElement('div');
    gameOverContainer.classList.add('game-over-container');
    
    const finalResults = document.createElement('div');
    const finalResultText = document.createElement('h2');
    finalResultText.textContent=`It's the end of the game!`;
    finalResults.classList.add('final-results');
    finalResults.textContent = `Player: ${game.player}      |     Computer: ${game.computer}`;
    
    const startNewGameButton = document.createElement('button');
    startNewGameButton.textContent = 'Start a New Game';
    startNewGameButton.classList.add('new-game-button');
    startNewGameButton.addEventListener('click', () => {
        location.reload(); // Reload the page to restart the game
    });
    
    gameOverContainer.appendChild(finalResultText);
    gameOverContainer.appendChild(finalResults);
    gameOverContainer.appendChild(startNewGameButton);
    pageContent.appendChild(gameOverContainer);
    
    }

function displayRoundSelection(game){
    const pageContent=document.querySelector('.content');
    const playerSelection =document.createElement('div');
    const computerSelection =document.createElement('div');
    playerSelection.textContent=`The player chose: ${getCPlayerEmojiSelection(game)}`;
    computerSelection.textContent=`The computer chose: ${getComputerEmojiSelection(game)}`;
    
    pageContent.appendChild(playerSelection);
    pageContent.appendChild(computerSelection);
}

function getComputerEmojiSelection(game){
    if (game.computerChoice=='rock')
        return game.computerEmojis.rock;
    else if (game.computerChoice=='paper')
        return game.computerEmojis.paper;
    else if(game.computerChoice=='scissors')
        return game.computerEmojis.scissors;
}

function getCPlayerEmojiSelection(game){
    if (game.playerChoice=='rock')
        return game.playerEmojis.rock;
    else if (game.playerChoice=='paper')
        return game.playerEmojis.paper;
    else if(game.playerChoice=='scissors')
        return game.playerEmojis.scissors;
}
