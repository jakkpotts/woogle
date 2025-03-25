# Woogle - A Wordle Clone

A modern implementation of the popular word-guessing game Wordle, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎮 Unlimited games - play as many times as you want
- 🎯 6 attempts to guess a 5-letter word
- 🎨 Color-coded feedback:
  - 🟩 Green: Letter is correct and in the right position
  - 🟨 Yellow: Letter is in the word but in the wrong position
  - ⬜ Gray: Letter is not in the word
- ⌨️ Dual input support:
  - Physical keyboard
  - On-screen virtual keyboard
- 📱 Responsive design - works on both desktop and mobile
- 🔄 Instant feedback and game state updates
- 🎲 Random word selection for each game

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/woogle.git
cd woogle
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## How to Play

1. The game will select a random 5-letter word
2. Type or click letters to make your guess
3. Press Enter or click the "ENTER" button to submit your guess
4. The game will provide feedback using colors:
   - Green: Correct letter in correct position
   - Yellow: Correct letter in wrong position
   - Gray: Letter not in word
5. You have 6 attempts to guess the word
6. After winning or losing, click "New Game" to play again

## Game Rules

- Each guess must be a 5-letter word
- Any valid 5-letter combination of letters A-Z is accepted
- Duplicate letters are allowed
- The game provides feedback after each guess
- You have 6 attempts to guess the word correctly

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React](https://reactjs.org/) - UI library

## Development

The project structure follows Next.js conventions:

```
src/
├── app/
│   ├── components/
│   │   ├── GameBoard.tsx
│   │   └── Keyboard.tsx
│   ├── lib/
│   │   ├── types.ts
│   │   └── words.ts
│   └── page.tsx
```

## Contributing

Feel free to submit issues and enhancement requests!
