# Bejeweled Web Clone 💎

## About the Project
[cite_start]This project consists of a web-based implementation of the popular tile-matching game **Bejeweled**[cite: 2, 3]. [cite_start]It was developed as an academic project for the **Introduction to Web Technologies** (ITW) course during the 2022/2023 academic year[cite: 1].

[cite_start]The goal was to create a fully functional game using standard web technologies, integrating a website with rules and tutorials alongside the game logic itself[cite: 8, 14].

## Features

### Core Mechanics
* [cite_start]**Grid System:** An $8\times8$ board filled with 7 different types of gems[cite: 23].
* [cite_start]**Gameplay:** Swap adjacent gems (horizontally or vertically) to align 3 or more of the same type[cite: 4, 25].
* [cite_start]**Physics:** Matched gems are eliminated, and gems above fall to fill the empty spaces, potentially causing chain reactions[cite: 4, 26, 28].
* [cite_start]**Scoring:** Points are calculated based on the number of gems aligned ($n$) using the formula $(n-3)+1$[cite: 29].
* [cite_start]**Level Completion:** The game ends when the player eliminates 20 or more gems[cite: 36].

### User System & Data
* [cite_start]**User Registration:** Players must identify themselves (email, password, age, gender) to play[cite: 20].
* [cite_start]**Persistence:** User data and match history are saved using the browser's **Local Storage**[cite: 21].
* [cite_start]**Leaderboard:** Displays the top 10 scores and completion times[cite: 37].
* [cite_start]**Statistics:** Tracks total games played, total time played, and maximum score per user[cite: 22].

### Interface
* [cite_start]**Responsive Design:** The layout adjusts automatically to different screen sizes and orientations[cite: 38].
* [cite_start]**HUD:** Real-time display of elapsed time, score, and gems remaining to win[cite: 24].

## Technologies Used
* [cite_start]**HTML5:** For structure and content[cite: 11].
* [cite_start]**CSS3:** For styling and responsive layout[cite: 12].
* [cite_start]**JavaScript:** For game logic, DOM manipulation, and state management[cite: 14].

## How to Play
1.  **Register/Login:** Enter your details to start tracking your stats.
2.  [cite_start]**Start Game:** The board will initialize with random gems[cite: 23].
3.  [cite_start]**Move:** Click (or use the keyboard) to select two adjacent gems to swap them[cite: 31].
    * [cite_start]*Note:* Swaps are only valid if they result in a match of 3 or more gems[cite: 25].
4.  [cite_start]**Win:** Eliminate at least 20 gems to complete the level[cite: 36].

## Project Structure
[cite_start]The project files are organized as follows[cite: 59]:
* `images/` or `media/`: Graphic assets, icons, and sounds.
* `styles/`: CSS stylesheets.
* `scripts/`: JavaScript logic files.

## Authors
* **Group:** [Insert Group Number]
* **Student:** [Insert Name] - [Insert Student ID]
* [cite_start]**Course:** Introdução às Tecnologias Web (ITW) 2022/2023 [cite: 1]

---
*This project was developed for educational purposes based on the 2001 PopCap Games classic.*
