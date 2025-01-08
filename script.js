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
}

console.log(getComputerChoice());

function getPlayerChoice(){
    const userChoice = prompt('Choose Rock, Paper, Scissors');

    switch (userChoice){
        case 'rock':
            return 'rock';
        case 'paper':
            return 'paper';
        case 'scissors':
            return scissors;
    }
}

function playRound(computerSelection, userSelection){
    
}