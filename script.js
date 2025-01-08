// Function that gets a random choice, rock paper or scissors.

// Function that gets user input

function getComputerChoice(){
    const randomNumber = Math.floor(Math.random() * 3) + 1; // Get random number from interval 1-3

    switch (randomNumber){
        case 1:
            return 'rock';
        case 2:
            return 'paper';
        case 3:
            return 'scissors';
    }
    console.log(getComputerChoice());
}



function getPlayerChoice(){
    const userChoice = prompt('Choose Rock, Paper, Scissors').toLowerCase();

    switch (userChoice){
        case 'rock':
            return 'rock';
        case 'paper':
            return 'paper';
        case 'scissors':
            return 'scissors';
    }
}

function playRound(playerOne, playerTwo){
    if (((playerOne==='rock')&&(playerTwo==='scissors'))
    ||((playerOne==='scissors')&&(playerTwo==='paper'))
    ||((playerOne==='paper')&&(playerTwo==='rock')))
    {
        return playerOne;
    } else if (playerOne===playerTwo)
        return 0;
    else
        return playerTwo;
}

function playGame(){
    let playerOneScore=0, playerTwoScore=0;
    for(let i=1;i<=5;i++){
        getScore(playerOneScore,playerTwoScore);
        console.log(`Round: ${i}`);
        console.log(`Computer: ${playerOneScore}`);
        console.log(`Player: ${playerTwoScore}`);
    }

}

function getScore(playerOneScore, playerTwoScore){
    let playerOneChoice=getComputerChoice();
    let playerTwoChoice=getPlayerChoice();
    let roundResult='';

    roundResult=playRound(playerOneChoice,playerTwoChoice);
    if(roundResult===playerOneChoice)
        return playerOneScore++;
    else if(roundResult===playerTwoChoice) 
        return playerTwoScore++;
}