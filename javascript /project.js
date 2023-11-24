// Game state
    var gameState = {
      playerScore: 0,
      computerScore: 0,
      rollsCount: 0,
    };
    const popUp = document.getElementById('popup')
    const winnerMessage = document.getElementById('winnerMessage');
    const diceImage = document.getElementById('diceImage');
    const diceImage2 = document.getElementById('diceImage2');
    const playerDice1 = document.getElementById('playerDice1');
    const playerDice2 = document.getElementById('playerDice2');
    const computerDice1 = document.getElementById('computerDice1');
    const computerDice2 = document.getElementById('computerDice2');

    

    function hideElements(elements) {
      elements.forEach(element => {
          element.style.display = "none";
      });
  }

  function displayElements(elements) {
    elements.forEach(element => {
        element.style.display = "block";
    });
}
  
  hideElements([playerDice1, playerDice2]);

    // Function to roll dice and return an object with the roll results
    function rollDice() {
      return {
        dice1: Math.floor(Math.random() * 6) + 1,
        dice2: Math.floor(Math.random() * 6) + 1
      };
    }
  
    // Function to calculate the score based on dice roll
    function calculateScore(dice) {
      if (dice.dice1 === 1 || dice.dice2 === 1) {
        return 0;
      } else if (dice.dice1 === dice.dice2) {
        return (dice.dice1 + dice.dice2) * 2;
      } else {
        return dice.dice1 + dice.dice2;
      }
    }
  
    // Function to update the UI with the new scores and dice values
    function updateUI(playerDice, computerDice, playerRoundScore, computerRoundScore) {
      playerDice1.src = '../image/dice-' + playerDice.dice1 + '.png';
      playerDice2.src = '../image/dice-' + playerDice.dice2 + '.png';
      computerDice1.src = '../image/dice-' + computerDice.dice1 + '.png';
      computerDice2.src = '../image/dice-' + computerDice.dice2 + '.png';

      document.getElementById('playerScore').textContent = gameState.playerScore;
      document.getElementById('currentPlayerScore').textContent = playerRoundScore;
      document.getElementById('computerScore').textContent = gameState.computerScore;
      document.getElementById('currentComputerScore').textContent = computerRoundScore;
  
    }
  
    // Function to handle the roll button click
    function rollButtonClick() {
      var playerDice = rollDice();
      var computerDice = rollDice();
  
      var playerRoundScore = calculateScore(playerDice);
      var computerRoundScore = calculateScore(computerDice);
  
      gameState.playerScore += playerRoundScore;
      gameState.computerScore += computerRoundScore;
      gameState.rollsCount++;
  
      updateUI(playerDice, computerDice, playerRoundScore, computerRoundScore);

      hideElements([diceImage, diceImage2,popUp]);
      displayElements([playerDice1, playerDice2,computerDice1,computerDice2]);



if (gameState.rollsCount === 3) {

    var winner = gameState.playerScore > gameState.computerScore ? 'Player' : 'Computer';
   popUp.style.display = "block";
   popUp.style.opacity = "1";
 winnerMessage.innerHTML += `Winner is ${winner}!`; 
 winnerMessage.innerHTML += `<p id="otherMessage">
 Your score: ${gameState.playerScore}<br>Computer score:${gameState.computerScore}</p>`

  
}

if (gameState.rollsCount >3){
  resetGame();
}

    }
  
    // Function to reset the game
    function resetGame() {
      gameState.playerScore = 0;
      gameState.computerScore = 0;
      gameState.rollsCount = 0;

      displayElements([diceImage, diceImage2]);
      hideElements([playerDice1, playerDice2,computerDice1,computerDice2,popUp]);
      
      updateUI({ dice1: 0, dice2: 0 }, { dice1: 0, dice2: 0 }, 0, 0);
      winnerMessage.innerHTML = "";
    }
  

    // Event listeners for roll and reset buttons
    document.getElementById('rollButton').addEventListener('click', rollButtonClick);
    document.getElementById('resetButton').addEventListener('click', resetGame);
    document.getElementById('confirmButton').addEventListener('click', function() {
      confetti();
      popUp.style.display ="none";
  });

    // Initialize the UI
    resetGame();
