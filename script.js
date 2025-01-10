
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

function keepScore(winner,score)
{
        if(winner=='The Player')
            score.player++;
        else if(winner=='The Computer') 
            score.computer++;
        console.log(score);
        return score;
        
}

function playGame(){
    const score = {player:0, computer:0, round:1,};
    createGameBoard(score);
    console.log(`Final Score ${score}`);
}

//DOM Manipulation

document.addEventListener('DOMContentLoaded', ()=>{
    const startGameButton = document.querySelector('#start-game-button'); // add button to start playing the game
    startGameButton.addEventListener('click', () =>playGame());
})

function createGameBoard(score){

    const pageContent = document.querySelector('.content');
    pageContent.textContent=''; // clear the page

    if (score.round > 5) {  // If more than 5 rounds, stop the game
        pageContent.textContent = `Game Over! Final Score: Player - ${score.player}, Computer - ${score.computer}`;
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
        button.addEventListener('click', ()=> choice.action(score)); // get custom function for each selection
        choicesBox.appendChild(button);
    })

}
function chooseRock(score){
    const computerChoice=getComputerChoice();
    const playerChoice = 'rock'
    const winner = playRound(playerChoice,computerChoice);
    keepScore(winner,score);
    displayResults(winner, score);
    score.round++;
}
function choosePaper(score){
    const computerChoice=getComputerChoice();
    const playerChoice = 'paper'
    const winner = playRound(playerChoice,computerChoice);
    keepScore(winner,score);
    displayResults(winner, score);
    score.round++;
}
function chooseScissors(score){
    const computerChoice=getComputerChoice();
    const playerChoice = 'scissors'
    const winner = playRound(playerChoice,computerChoice);
    keepScore(winner,score);
    displayResults(winner, score);
    score.round++;
}
function displayResults(winner, score)
{
    const pageContent = document.querySelector('.content');
    pageContent.textContent='';
    const nextRoundButton = document.createElement('button');
    nextRoundButton.textContent='Next Round';

    const messageSelection = document.createElement('div');

    if(winner==='Draw')
        messageSelection.textContent=`It's a draw!`;
    else
        messageSelection.textContent=`${winner} won this round!`;


    nextRoundButton.addEventListener('click', ()=> createGameBoard(score));        
    pageContent.appendChild(messageSelection);
    pageContent.appendChild(nextRoundButton);
}