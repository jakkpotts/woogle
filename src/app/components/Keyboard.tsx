'use client';

import { KeyboardKey } from '../lib/types';

interface KeyboardProps {
  onKey: (key: string) => void;
  onEnter: () => void;
  onDelete: () => void;
  keys: KeyboardKey[];
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

export default function Keyboard({ onKey, onEnter, onDelete, keys }: KeyboardProps) {
  const getKeyState = (key: string) => {
    return keys.find(k => k.key === key)?.state || 'empty';
  };

  const handleClick = (key: string) => {
    if (key === 'ENTER') {
      onEnter();
    } else if (key === '⌫') {
      onDelete();
    } else {
      onKey(key);
    }
  };

  const getKeyClasses = (key: string) => {
    const state = getKeyState(key);
    const baseClasses = 'rounded font-bold text-sm sm:text-base transition-colors duration-150 flex items-center justify-center';
    const sizeClasses = key.length > 1 ? 'w-16 p-1' : 'w-8 sm:w-10 p-2';
    
    const stateClasses = {
      correct: 'bg-green-500 text-white',
      present: 'bg-yellow-500 text-white',
      absent: 'bg-gray-500 text-white',
      empty: 'bg-gray-200 hover:bg-gray-300',
    }[state];

    return `${baseClasses} ${sizeClasses} ${stateClasses}`;
  };

  return (
    <div className="p-2">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 my-1">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={getKeyClasses(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
} 