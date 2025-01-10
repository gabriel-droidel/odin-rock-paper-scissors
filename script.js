
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

function playGame()
{
    let playerOneScore=0, playerTwoScore=0;
    for(let i=1;i<=5 ;i++)
    {
        let playerOneChoice=getComputerChoice();
        let playerTwoChoice=getPlayerChoice();
        let roundResult='';
        roundResult=playRound(playerOneChoice,playerTwoChoice);

        if(roundResult===playerOneChoice)
            playerOneScore++;
        else if(roundResult===playerTwoChoice) 
            playerTwoScore++;

        console.log(`Round: ${i}`);
        console.log(`Computer: ${playerOneScore}`);
        console.log(`Player: ${playerTwoScore}`);
    }
    displayResults(playerOneScore,playerTwoScore);
}


//DOM Manipulation

document.addEventListener('DOMContentLoaded', ()=>{
    const startGameButton = document.querySelector('#start-game-button'); // add button to start playing the game
    startGameButton.addEventListener('click', () =>createGameBoard());
})

function createGameBoard(){

    const pageContent = document.querySelector('.content');
    pageContent.textContent=''; // clear the page

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
        button.addEventListener('click', choice.action); // get custom function for each selection
        choicesBox.appendChild(button);
    })

    function chooseRock(){
        const computerChoice=getComputerChoice();
        const playerChoice = 'rock'
        const winner = playRound(playerChoice,computerChoice);
        displayResults(winner);
    }
    function choosePaper(){
        const computerChoice=getComputerChoice();
        const playerChoice = 'paper'
        const winner = playRound(playerChoice,computerChoice);
        displayResults(winner);
    }
    function chooseScissors(){
        const computerChoice=getComputerChoice();
        const playerChoice = 'scissors'
        const winner = playRound(playerChoice,computerChoice);
        displayResults(winner);
    }

}

function displayResults(winner)
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


    nextRoundButton.addEventListener('click',createGameBoard);        
    pageContent.appendChild(messageSelection);
    pageContent.appendChild(nextRoundButton);
}