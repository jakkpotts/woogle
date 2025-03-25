'use client';

import { GuessLetter, WORD_LENGTH, MAX_GUESSES } from '../lib/types';

interface GameBoardProps {
  guesses: GuessLetter[][];
  currentGuess: string;
  currentRow: number;
}

export default function GameBoard({ guesses, currentGuess, currentRow }: GameBoardProps) {
  const renderCell = (row: number, col: number) => {
    if (row === currentRow) {
      const letter = currentGuess[col] || '';
      return (
        <div
          key={`${row}-${col}`}
          className={`w-14 h-14 border-2 border-gray-300 flex items-center justify-center text-2xl font-bold
            ${letter ? 'border-gray-600' : ''}`}
        >
          {letter}
        </div>
      );
    }

    const guess = guesses[row]?.[col];
    if (!guess) {
      return (
        <div
          key={`${row}-${col}`}
          className="w-14 h-14 border-2 border-gray-300 flex items-center justify-center text-2xl font-bold"
        />
      );
    }

    const bgColor = {
      correct: 'bg-green-500',
      present: 'bg-yellow-500',
      absent: 'bg-gray-500',
      empty: 'bg-white',
    }[guess.state];

    return (
      <div
        key={`${row}-${col}`}
        className={`w-14 h-14 border-2 border-gray-300 flex items-center justify-center text-2xl font-bold text-white
          ${bgColor} transition-colors duration-500`}
      >
        {guess.letter}
      </div>
    );
  };

  return (
    <div className="grid gap-1 p-4">
      {Array.from({ length: MAX_GUESSES }, (_, row) => (
        <div key={row} className="flex gap-1 justify-center">
          {Array.from({ length: WORD_LENGTH }, (_, col) => renderCell(row, col))}
        </div>
      ))}
    </div>
  );
} 