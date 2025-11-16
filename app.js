// Game Elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const restartBtn = document.querySelector("#restart-btn");
const startBtn = document.querySelector("#start-btn");
const msgContainer = document.querySelector(".msg-container");
const matchWinnerContainer = document.querySelector(".match-winner-container");
const msg = document.querySelector("#msg");
const matchWinnerMsg = document.querySelector("#match-winner-msg");
const turnIndicator = document.querySelector("#turnIndicator");
const game = document.querySelector(".game");
const validationMsg = document.querySelector("#validation-msg");

// Score Display Elements
const scoreODisplay = document.querySelector("#scoreO");
const scoreXDisplay = document.querySelector("#scoreX");
const playerONameDisplay = document.querySelector("#playerONameDisplay");
const playerXNameDisplay = document.querySelector("#playerXNameDisplay");
const targetDisplay = document.querySelector("#targetDisplay");
const targetDisplayX = document.querySelector("#targetDisplayX");
const targetScoreDisplay = document.querySelector("#targetScoreDisplay");
const roundsPlayedDisplay = document.querySelector("#roundsPlayed");
const turnPlayer = document.querySelector("#turnPlayer");
const playerOCard = document.querySelector("#playerOCard");
const playerXCard = document.querySelector("#playerXCard");
const progressO = document.querySelector("#progressO");
const progressX = document.querySelector("#progressX");

// Input Elements
const inputO = document.getElementById("playerO");
const inputX = document.getElementById("playerX");
const targetScoreInput = document.getElementById("targetScore");

// Game State
let turnO = true; // playerO starts first
let count = 0; // Track moves to detect draw
let scoreO = 0;
let scoreX = 0;
let targetScore = 3;
let gameStarted = false;
let roundsPlayed = 0;

// Winning Patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Get Player Name
const getPlayerName = (symbol) => {
  const oName = inputO.value.trim() || "Player 1";
  const xName = inputX.value.trim() || "Player 2";
  return symbol === "O" ? oName : xName;
};

// Validate and Start Game
const startGame = () => {
  const playerOName = inputO.value.trim();
  const playerXName = inputX.value.trim();
  const target = parseInt(targetScoreInput.value);

  // Validation
  if (!playerOName) {
    showValidationMsg("Please enter Player 1 name!");
    inputO.focus();
    return;
  }

  if (!playerXName) {
    showValidationMsg("Please enter Player 2 name!");
    inputX.focus();
    return;
  }

  if (playerOName === playerXName) {
    showValidationMsg("Player names must be different!");
    return;
  }

  if (!target || target < 1) {
    showValidationMsg("Please enter a valid target score (minimum 1)!");
    targetScoreInput.focus();
    return;
  }

  // Set target score
  targetScore = target;
  targetDisplay.textContent = targetScore;
  targetDisplayX.textContent = targetScore;
  targetScoreDisplay.textContent = targetScore;

  // Update player names
  playerONameDisplay.textContent = playerOName;
  playerXNameDisplay.textContent = playerXName;

  // Enable game
  gameStarted = true;
  game.classList.remove("disabled");
  hideValidationMsg();
  
  // Disable inputs
  inputO.disabled = true;
  inputX.disabled = true;
  targetScoreInput.disabled = true;
  startBtn.disabled = true;
  startBtn.style.opacity = "0.5";
  startBtn.style.cursor = "not-allowed";

  // Initialize game
  resetGame();
  updateTurnIndicator();
  updateScoreDisplay();
};

// Show Validation Message
const showValidationMsg = (message) => {
  validationMsg.textContent = message;
  validationMsg.classList.remove("hide");
  setTimeout(() => {
    hideValidationMsg();
  }, 3000);
};

// Hide Validation Message
const hideValidationMsg = () => {
  validationMsg.classList.add("hide");
};

// Update Turn Indicator
const updateTurnIndicator = () => {
  if (!gameStarted) return;
  const currentPlayer = turnO ? "O" : "X";
  turnPlayer.textContent = currentPlayer;
  
  // Highlight active player card
  playerOCard.classList.toggle("active", turnO);
  playerXCard.classList.toggle("active", !turnO);
};

// Update Score Display
const updateScoreDisplay = () => {
  scoreODisplay.textContent = scoreO;
  scoreXDisplay.textContent = scoreX;
  
  // Update progress bars
  const progressOPercent = Math.min((scoreO / targetScore) * 100, 100);
  const progressXPercent = Math.min((scoreX / targetScore) * 100, 100);
  progressO.style.width = `${progressOPercent}%`;
  progressX.style.width = `${progressXPercent}%`;
};

// Disable All Boxes
const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Enable All Boxes
const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winning");
  });
};

// Reset Winning Highlight
const resetWinningHighlight = () => {
  boxes.forEach((box) => {
    box.classList.remove("winning");
  });
};

// Highlight Winning Boxes
const highlightWinningBoxes = (pattern) => {
  pattern.forEach((index) => {
    boxes[index].classList.add("winning");
  });
};

// Check Winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        highlightWinningBoxes(pattern);
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// Check if Target Score Reached
const checkTargetScore = () => {
  if (scoreO >= targetScore) {
    showMatchWinner("O");
    return true;
  }
  if (scoreX >= targetScore) {
    showMatchWinner("X");
    return true;
  }
  return false;
};

// Show Winner (Round Winner)
const showWinner = (symbol) => {
  const playerName = getPlayerName(symbol);
  msg.innerHTML = `🎉 Congratulations, <br>${playerName} wins this round!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  
  // Update score
  if (symbol === "O") {
    scoreO++;
  } else {
    scoreX++;
  }
  roundsPlayed++;
  roundsPlayedDisplay.textContent = roundsPlayed;
  updateScoreDisplay();
  
  // Check if target score reached
  setTimeout(() => {
    if (!checkTargetScore()) {
      blinkMessage();
    }
  }, 500);
};

// Show Match Winner
const showMatchWinner = (symbol) => {
  const playerName = getPlayerName(symbol);
  matchWinnerMsg.innerHTML = `🏆 ${playerName} Wins the Match!<br><span style="font-size: 1.5rem;">Final Score: ${scoreO} - ${scoreX}</span>`;
  matchWinnerContainer.classList.remove("hide");
  disableBoxes();
  gameStarted = false;
  game.classList.add("disabled");
};

// Game Draw
const gameDraw = () => {
  msg.innerHTML = `🤝 Game was a Draw!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  roundsPlayed++;
  roundsPlayedDisplay.textContent = roundsPlayed;
  blinkMessage();
};

// Blink Message Animation
const blinkMessage = () => {
  let visible = true;
  const interval = setInterval(() => {
    msg.style.opacity = visible ? "0.5" : "1";
    visible = !visible;
  }, 400);
  setTimeout(() => {
    clearInterval(interval);
    msg.style.opacity = "1";
  }, 4000);
};

// Reset Game (Next Round)
const resetGame = () => {
  if (!gameStarted) return;
  
  turnO = true;
  count = 0;
  enableBoxes();
  resetWinningHighlight();
  msgContainer.classList.add("hide");
  updateTurnIndicator();
  msg.style.opacity = "1";
};

// Restart Match (Reset Everything)
const restartMatch = () => {
  scoreO = 0;
  scoreX = 0;
  turnO = true;
  count = 0;
  roundsPlayed = 0;
  gameStarted = false;
  
  // Reset UI
  enableBoxes();
  resetWinningHighlight();
  msgContainer.classList.add("hide");
  matchWinnerContainer.classList.add("hide");
  game.classList.add("disabled");
  
  // Re-enable inputs
  inputO.disabled = false;
  inputX.disabled = false;
  targetScoreInput.disabled = false;
  startBtn.disabled = false;
  startBtn.style.opacity = "1";
  startBtn.style.cursor = "pointer";
  
  // Clear inputs
  inputO.value = "";
  inputX.value = "";
  targetScoreInput.value = "3";
  
  // Reset displays
  playerONameDisplay.textContent = "Player 1";
  playerXNameDisplay.textContent = "Player 2";
  targetDisplay.textContent = "3";
  targetDisplayX.textContent = "3";
  targetScoreDisplay.textContent = "3";
  roundsPlayedDisplay.textContent = "0";
  updateScoreDisplay();
  updateTurnIndicator();
  
  // Reset player cards
  playerOCard.classList.remove("active");
  playerXCard.classList.remove("active");
};

// New Match
const newMatch = () => {
  restartMatch();
};

// Box Click Handler
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameStarted || box.disabled) return;

    // Place symbol
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#667eea";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#f5576c";
      turnO = true;
    }
    
    box.disabled = true;
    count++;

    // Check for winner
    let isWinner = checkWinner();

    // Check for draw
    if (count === 9 && !isWinner) {
      gameDraw();
    } else if (!isWinner) {
      updateTurnIndicator();
    }
  });
});

// Event Listeners
const newMatchBtn = document.querySelector("#new-match-btn");

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", restartMatch);
if (newMatchBtn) {
  newMatchBtn.addEventListener("click", newMatch);
}

// Initialize - Disable game until start
game.classList.add("disabled");
updateScoreDisplay();
