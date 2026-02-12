# Bejeweled Web Clone 💎

## About the Project
This project is a web-based implementation of the popular tile-matching game **Bejeweled**. It was developed as an academic project for the **Introduction to Web Technologies (ITW)** course during the 2022/2023 academic year.

The goal was to create a fully functional game using standard web technologies, integrating a website with rules and tutorials alongside the game logic itself.

## Features

### Core Mechanics
* **Grid System:** An 8x8 board filled with 7 different types of gems.
* **Gameplay:** Swap adjacent gems (horizontally or vertically) to align 3 or more of the same type.
* **Physics:** Matched gems are eliminated, and gems above fall to fill the empty spaces, potentially causing chain reactions.
* **Scoring:** Points are calculated based on the number of gems aligned (n) using the formula (n-3)+1.
* **Level Completion:** The game ends when the player eliminates 20 or more gems.

### User System & Data
* **User Registration:** Players must identify themselves (email, password, age, gender) to play.
* **Persistence:** User data and match history are saved using the browser's **Local Storage**.
* **Leaderboard:** Displays the top 10 scores and completion times.
* **Statistics:** Tracks total games played, total time played, and maximum score per user.

### Interface
* **Responsive Design:** The layout adjusts automatically to different screen sizes and orientations.
* **HUD:** Real-time display of elapsed time, score, and gems remaining to win.

## Technologies Used
* **HTML5:** For structure and content.
* **CSS3:** For styling and responsive layout.
* **JavaScript:** For game logic, DOM manipulation, and state management.

## How to Play
1.  **Register/Login:** Enter your details to start tracking your stats.
2.  **Start Game:** The board will initialize with random gems.
3.  **Move:** Click (or use the keyboard) to select two adjacent gems to swap them.
    * *Note:* Swaps are only valid if they result in a match of 3 or more gems.
4.  **Win:** Eliminate at least 20 gems to complete the level.

## Project Structure
The project files are organized as follows:
* `images/` or `media/`: Graphic assets, icons, and sounds.
* `styles/`: CSS stylesheets.
* `scripts/`: JavaScript logic files.

  
---
*This project was developed for educational purposes based on the 2001 PopCap Games classic.*
