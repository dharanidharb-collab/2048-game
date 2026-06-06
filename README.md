# 2048 Game

A browser-based implementation of the classic 2048 puzzle game built using React and Vite.

## Features

- Classic 2048 gameplay
- Move tiles using arrow keys (desktop)
- Swipe controls for mobile devices
- Score tracking
- Best score tracking
- Automatic game state saving using localStorage
- Resume game after refreshing the page
- Win detection (2048 tile reached)
- Continue playing after reaching 2048
- Game over detection
- Global leaderboard powered by Supabase
- Responsive design for desktop and mobile
- New game/reset functionality

## Tech Stack

* React
* JavaScript
* Vite
* CSS
* LocalStorage API
* Supabase
* Vercel

## Installation

1. Clone the repository and install dependencies:

```bash
git clone <https://github.com/dharanidharb-collab/2048-game.git>

2. Navigate to the project directory

cd 2048-game

3. Install dependencies

npm install

4. Start the development server

npm run dev

5. Open the application in your browser

## How To Play

* Use the arrow keys to move tiles.
* Swipe in the arrow directions to play on phone.
* Tiles with the same value merge when they collide.
* Each merge increases your score.
* Reach the 2048 tile to win.
* Continue playing after reaching 2048 if desired.

## Score System 

* Points are awarded whenever tiles merge.
* Best score is saved locally on your device.
* Current game progress is automatically saved.
* Refreshing the page will not lose your progress.

## Global Leaderboard

Players can submit thier socres to a global leaderboard powered by Supabase.

Leaderboard features:
* Stores player usernames and scores.
* Displays top scores globally.
* Updates automatically after score submission.
* Maintains leaderboard rankings across devices.

## Deployment 

The application is deployed using Vercel.

## Project Structure

* `App.jsx` - Game logic and React state management
* `App.css` - Styling and tile colors
* `supabase.js` - Supabase configuration
* `main.jsx` - React entry point

## Future Improvements

* User authentication.
* Secure score verification.
* Improved leaderboard protection.
* Enhanced animations.
* Dark mode support.
* Multiplayer challenges.
* Additional game themes.
* Timed play mode.

# 2048 Game

Live Demo: https://2048-game-tawny-nine.vercel.app

A browser-based implementation...
