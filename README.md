# 🎮 Tic-Tac-Toe Game

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Game-green?style=for-the-badge)](https://tejaswar2004.github.io/TIC_TOC_TOE_Game/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A modern, feature-rich **Tic-Tac-Toe game** with split-screen design, score tracking, and target-based match system. Built with vanilla HTML, CSS, and JavaScript.

</div>

---

## 🌟 Features

### Core Gameplay
- ✅ **Two-Player Game**: Classic X vs O gameplay
- ✅ **Player Name Input**: Customize player names before starting
- ✅ **Target Score System**: Set a target score to win the match
- ✅ **Score Tracking**: Real-time score updates with visual progress bars
- ✅ **Round Counter**: Track total rounds played
- ✅ **Winner Detection**: Automatic win detection with 8 winning patterns
- ✅ **Draw Detection**: Handles tied games gracefully
- ✅ **Winning Highlight**: Visual feedback for winning combinations

### User Interface
- 🎨 **Modern Split-Screen Design**: 
  - Left panel: Player scores, progress bars, and game details
  - Right panel: Interactive 3x3 game board
- 🎨 **Glassmorphism UI**: Beautiful frosted glass effect with backdrop blur
- 🎨 **Gradient Backgrounds**: Eye-catching gradient color schemes
- 🎨 **Smooth Animations**: Transitions and hover effects throughout
- 🎨 **Active Player Highlighting**: Visual indication of current player's turn
- 🎨 **Progress Bars**: Visual representation of progress toward target score
- 🎨 **Responsive Design**: Fully responsive for mobile, tablet, and desktop

### Game Management
- 🔄 **Start Game**: Validates inputs and initializes the game
- 🔄 **Reset Round**: Start a new round without resetting scores
- 🔄 **Restart Match**: Complete reset of scores and game state
- 🔄 **Match Winner Detection**: Automatically detects when target score is reached
- 🔄 **Input Validation**: Ensures player names are entered and unique

---

## 🎯 Live Demo

**Play the game live:** [https://tejaswar2004.github.io/TIC_TOC_TOE_Game/](https://tejaswar2004.github.io/TIC_TOC_TOE_Game/)

The game is fully functional on GitHub Pages and works in any modern browser!

---

## 📸 Screenshots

### Game Interface
- Split-screen layout with scores on the left and game board on the right
- Modern glassmorphism design with gradient backgrounds
- Real-time score tracking with progress bars
- Active player highlighting

### Game Flow
1. Enter player names and set target score
2. Click "Start Game" to begin
3. Players take turns clicking boxes
4. Winner is detected automatically
5. Scores update after each round
6. Match ends when a player reaches the target score

---

## 🏗️ Project Structure

```
TIC_TOC_TOE_Game/
├── index.html          # Main HTML structure with semantic elements
├── style.css           # Modern CSS with glassmorphism and animations
├── app.js              # Complete game logic and state management
└── README.md           # Project documentation
```

---

## 🧠 Logical Approach & Game Logic

### 1. **Game State Management**
```javascript
// Core state variables
- turnO: Boolean to track current player (O starts first)
- count: Move counter to detect draws (max 9 moves)
- scoreO, scoreX: Individual player scores
- targetScore: Target score to win the match
- gameStarted: Flag to prevent gameplay before initialization
- roundsPlayed: Counter for total rounds
```

### 2. **Winning Pattern Detection**
The game uses 8 predefined winning patterns (3x3 grid):
- 3 horizontal lines: [0,1,2], [3,4,5], [6,7,8]
- 3 vertical lines: [0,3,6], [1,4,7], [2,5,8]
- 2 diagonal lines: [0,4,8], [2,4,6]

**Algorithm:**
```javascript
checkWinner() {
  For each winning pattern:
    - Get values at pattern positions
    - If all three positions have same non-empty value
    - Return true (winner found)
  Return false (no winner)
}
```

### 3. **Turn Management**
- Alternates between Player O and Player X
- Updates UI indicators (turn indicator, active card highlighting)
- Prevents moves when game hasn't started or box is disabled

### 4. **Score System**
- Increments score when a player wins a round
- Updates progress bars based on current score vs target
- Checks if target score is reached after each win
- Displays match winner when target is achieved

### 5. **Input Validation**
```javascript
Validation checks:
1. Player 1 name must be entered
2. Player 2 name must be entered
3. Player names must be different
4. Target score must be a valid number (≥ 1)
```

### 6. **Draw Detection**
- Tracks total moves (count variable)
- If count reaches 9 and no winner is detected → Draw
- Increments rounds played counter

### 7. **UI Updates**
- Real-time score display updates
- Progress bar animation (CSS transitions)
- Active player card highlighting
- Turn indicator updates
- Winning box highlighting with animation

---

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup, form validation, accessibility
- **CSS3**: 
  - Flexbox & Grid layouts
  - CSS Variables (custom properties)
  - Glassmorphism effects (backdrop-filter)
  - Animations & Transitions
  - Responsive design (media queries)
  - Gradient backgrounds
- **JavaScript (ES6+)**:
  - DOM manipulation
  - Event handling
  - State management
  - Array methods for pattern checking
  - Async operations (setTimeout for animations)

### Design Patterns
- **Modular Code Structure**: Separated concerns (UI, logic, state)
- **Event-Driven Architecture**: Click handlers, input validation
- **State Management**: Centralized game state variables
- **Progressive Enhancement**: Works without JavaScript for basic structure

### External Resources
- **Google Fonts**: Poppins font family for modern typography

---

## 🚀 How to Run Locally

### Option 1: Direct File Opening
1. Clone the repository:
   ```bash
   git clone https://github.com/tejaswar2004/TIC_TOC_TOE_Game.git
   ```
2. Navigate to the project folder:
   ```bash
   cd TIC_TOC_TOE_Game
   ```
3. Open `index.html` in your web browser (double-click the file)

### Option 2: Using a Local Server (Recommended)
1. Clone the repository (as above)
2. Use VS Code Live Server extension:
   - Install "Live Server" extension
   - Right-click on `index.html`
   - Select "Open with Live Server"

2. Or use Python's built-in server:
   ```bash
   python -m http.server 8000
   ```
   Then open: `http://localhost:8000`

3. Or use Node.js http-server:
   ```bash
   npx http-server
   ```

---

## 📦 Deployment on GitHub Pages

The game is already deployed and working on GitHub Pages! Here's how it was set up:

### Steps to Deploy/Update:
1. Push your code to the `main` branch
2. Go to repository Settings → Pages
3. Select source: `Deploy from a branch`
4. Select branch: `main` and folder: `/ (root)`
5. Click Save

The game will be available at:
```
https://[your-username].github.io/TIC_TOC_TOE_Game/
```

### Current Live URL:
🔗 **https://tejaswar2004.github.io/TIC_TOC_TOE_Game/**

---

## 🎮 How to Play

1. **Setup Phase:**
   - Enter Player 1 name (will play as O)
   - Enter Player 2 name (will play as X)
   - Set target score (default: 3)
   - Click "Start Game"

2. **Gameplay:**
   - Players take turns clicking on the 3x3 grid
   - Player O goes first
   - First player to get 3 in a row wins the round
   - Score updates automatically

3. **Match Progression:**
   - After each round, click "Next Round" to continue
   - First player to reach the target score wins the match
   - Use "Reset Round" to restart current round
   - Use "Restart Match" to start completely over

4. **Winning:**
   - Win a round: Get 3 symbols in a row (horizontal, vertical, or diagonal)
   - Win the match: Reach the target score first

---

## 🔧 Key Functions & Their Logic

### `checkWinner()`
- Iterates through all 8 winning patterns
- Checks if all three positions in a pattern have the same symbol
- Returns true if winner found, false otherwise

### `showWinner(symbol)`
- Displays winner message
- Increments winner's score
- Updates progress bars
- Checks if target score reached
- Highlights winning boxes

### `updateScoreDisplay()`
- Updates score numbers
- Calculates progress percentage
- Animates progress bars

### `startGame()`
- Validates all inputs
- Initializes game state
- Disables input fields
- Enables game board

### `resetGame()`
- Resets current round (not scores)
- Clears board
- Resets turn to Player O

### `restartMatch()`
- Complete reset: scores, rounds, inputs
- Re-enables all input fields
- Resets all displays

---

## 🎨 UI/UX Features

### Visual Design
- **Glassmorphism**: Frosted glass effect using `backdrop-filter: blur()`
- **Gradient Backgrounds**: Modern color gradients
- **Smooth Animations**: CSS transitions and keyframe animations
- **Hover Effects**: Interactive feedback on buttons and boxes
- **Active States**: Visual indication of current player

### Responsive Design
- **Desktop**: Split-screen layout (50/50)
- **Tablet**: Stacked layout with full-width panels
- **Mobile**: Optimized for small screens with vertical stacking

### Accessibility
- Semantic HTML elements
- Form labels for inputs
- Keyboard navigation support
- Clear visual feedback

---

## 🐛 Known Issues & Future Enhancements

### Potential Improvements
- [ ] Add sound effects for moves and wins
- [ ] Implement AI opponent (single-player mode)
- [ ] Add game history/statistics
- [ ] Dark/light theme toggle
- [ ] Local storage for high scores
- [ ] Multiplayer online mode

---

## 📝 Code Quality

- ✅ Clean, readable code structure
- ✅ Consistent naming conventions
- ✅ Comments for complex logic
- ✅ Modular function design
- ✅ Error handling for edge cases
- ✅ No external dependencies (vanilla JS)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📄 License

This project is open source and available for educational purposes.

---

## 👤 Author

**Lingareddy Tejaswar Reddy**

- 📧 Email: [tejaswar2004@gmail.com](mailto:tejaswar2004@gmail.com)
- 🌐 GitHub: [@tejaswar2004](https://github.com/tejaswar2004)
- 🔗 Live Demo: [Play Game](https://tejaswar2004.github.io/TIC_TOC_TOE_Game/)

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

<div align="center">

**Built with ❤️ using HTML5, CSS3, and JavaScript**

[⬆ Back to Top](#-tic-tac-toe-game)

</div>
