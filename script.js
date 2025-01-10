
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
    };
    createGameBoard(game);
    console.log(`Final game ${game}`);
}

//DOM Manipulation

document.addEventListener('DOMContentLoaded', ()=>{
    const startGameButton = document.querySelector('#start-game-button'); // add button to start playing the game
    startGameButton.addEventListener('click', () =>playGame());
})

function createGameBoard(game){

    const pageContent = document.querySelector('.content');
    pageContent.textContent=''; // clear the page

    if (game.round > 5) {  // If more than 5 rounds, stop the game
        pageContent.textContent = `Game Over! Final game: Player - ${game.player}, Computer - ${game.computer}`;
        return;
    }

    const messageSelection = document.createElement('div');
    messageSelection.textContent='Choose your pick!';
    pageContent.appendChild(messageSelection);

    const choicesBox = document.createElement('div');
    choicesBox.classList.add('choices-box');
    pageContent.appendChild(choicesBox);

    const choices = [
        {name: 'Rock', action: chooseRock}, 
        {name: 'Paper', action: choosePaper}, 
        {name: 'Scissors', action: chooseScissors}];

    choices.forEach(choice =>{
        const button = document.createElement('button');
        button.textContent=choice.name; // get selection name from object inside the array
        button.classList.add('choice-button');
        button.addEventListener('click', ()=> choice.action(game)); // get custom function for each selection
        choicesBox.appendChild(button);
    })

}
function chooseRock(game){
    game.computerChoice=getComputerChoice();
    game.playerChoice = 'rock'
    const winner = playRound(game.playerChoice,game.computerChoice);
    keepScore(winner,game);
    displayScore(game);
    displayResults(winner, game);
    game.round++;
}
function choosePaper(game){
    game.computerChoice=getComputerChoice();
    game.playerChoice = 'paper'
    const winner = playRound(game.playerChoice,game.computerChoice);
    keepScore(winner,game);
    displayScore(game);
    displayResults(winner, game);
    game.round++;
}
function chooseScissors(game){
    game.computerChoice=getComputerChoice();
    game.playerChoice = 'scissors'
    const winner = playRound(game.playerChoice,game.computerChoice);
    keepScore(winner,game);
    displayScore(game);
    displayResults(winner, game);
    game.round++;
}
function displayResults(winner, game)
{
    const pageContent = document.querySelector('.content');
    const nextRoundButton = document.createElement('button');
    nextRoundButton.textContent='Next Round';

    const messageSelection = document.createElement('div');

    if(winner==='Draw')
        messageSelection.textContent=`It's a draw!`;
    else
        messageSelection.textContent=`${winner} won this round!`;


    nextRoundButton.addEventListener('click', ()=> createGameBoard(game));        
    pageContent.appendChild(messageSelection);
    pageContent.appendChild(nextRoundButton);
}

function displayScore(game){
    const pageContent = document.querySelector('.content');
    pageContent.textContent='';
    const scoreDisplay = document.createElement('div');
    const roundDisplay = document.createElement('h2');

    roundDisplay.textContent=`Round ${game.round}`;
    scoreDisplay.textContent=`Score:
    Player : ${game.player}
    Computer: ${game.computer}`;
    pageContent.appendChild(roundDisplay);
    pageContent.appendChild(scoreDisplay);
}