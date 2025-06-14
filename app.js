let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0; //To Track Draw

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

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);



// 1. Highlight Winning Boxes
const originalShowWinner = showWinner;
const highlightWinningBoxes = (pattern) => {
  pattern.forEach((index) => {
    boxes[index].style.backgroundColor = "#90ee90"; // light green
  });
};

// Monkey-patch the showWinner to add highlight
window.showWinner = function(winner) {
  const winningPattern = winPatterns.find((pattern) => {
    const [a, b, c] = pattern;
    return (
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText &&
      boxes[a].innerText !== ""
    );
  });
  if (winningPattern) highlightWinningBoxes(winningPattern);
  originalShowWinner(winner);
};

// 2. Player Turn Indicator
const turnIndicator = document.createElement("h2");
turnIndicator.style.color = "#fff";
turnIndicator.style.marginTop = "1rem";
document.body.insertBefore(turnIndicator, document.querySelector("main"));

const updateTurnIndicator = () => {
  turnIndicator.innerText = `Turn: ${turnO ? "O" : "X"}`;
};
updateTurnIndicator();

boxes.forEach((box) => {
  box.addEventListener("click", updateTurnIndicator);
});
resetBtn.addEventListener("click", updateTurnIndicator);
newGameBtn.addEventListener("click", updateTurnIndicator);

// 3. Score Tracking
let scoreO = 0;
let scoreX = 0;
const scoreBoard = document.createElement("div");
scoreBoard.style.color = "#fff";
scoreBoard.style.marginTop = "1rem";
scoreBoard.style.fontSize = "1.2rem";
document.body.insertBefore(scoreBoard, document.querySelector("main"));
const updateScore = () => {
  scoreBoard.innerText = `Score → O: ${scoreO} | X: ${scoreX}`;
};
updateScore();

// Patch showWinner again to update score
const originalShowWinner2 = window.showWinner;
window.showWinner = function(winner) {
  if (winner === "O") scoreO++;
  if (winner === "X") scoreX++;
  updateScore();
  originalShowWinner2(winner);
};

// 4. Blinking Winner Message
const blinkMsg = () => {
  let visible = true;
  const interval = setInterval(() => {
    msg.style.visibility = visible ? "hidden" : "visible";
    visible = !visible;
  }, 400);
  setTimeout(() => {
    clearInterval(interval);
    msg.style.visibility = "visible";
  }, 4000);
};

const originalShowWinner3 = window.showWinner;
window.showWinner = function(winner) {
  originalShowWinner3(winner);
  blinkMsg();
};

// Player name logic
let playerOName = "Player 1";
let playerXName = "Player 2";

// Get input elements
const inputO = document.getElementById("playerO");
const inputX = document.getElementById("playerX");

// Update player names from input
const getPlayerName = (symbol) => {
  const oName = inputO.value.trim() || "Player 1";
  const xName = inputX.value.trim() || "Player 2";
  return symbol === "O" ? oName : xName;
};

// Override showWinner to show player names
const originalShowWinnerFinal = window.showWinner;
window.showWinner = function(symbol) {
  const playerName = getPlayerName(symbol);
  msg.innerText = `🎉 Congratulations, ${playerName} is the winner!`;
  originalShowWinnerFinal(symbol);
};

const nameContainer = document.createElement("div");
nameContainer.className = "player-inputs";
nameContainer.style.margin = "1rem"; // optional inline
nameContainer.innerHTML = `
  <input type="text" id="playerO" placeholder="Enter Player 1 Name (O)" />
  <input type="text" id="playerX" placeholder="Enter Player 2 Name (X)" />
`;
document.body.insertBefore(nameContainer, document.querySelector("main"));

