'use client';

import { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import { GameState, GuessLetter, KeyboardKey, WORD_LENGTH, MAX_GUESSES } from './lib/types';
import { getRandomWord, isValidWord, checkGuess } from './lib/words';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    guesses: [],
    currentGuess: '',
    targetWord: '',
    gameStatus: 'playing',
    currentRow: 0,
  });

  const [keyStates, setKeyStates] = useState<KeyboardKey[]>([]);

  const initializeGame = useCallback(() => {
    const newWord = getRandomWord();
    setGameState({
      guesses: Array(MAX_GUESSES).fill([]),
      currentGuess: '',
      targetWord: newWord,
      gameStatus: 'playing',
      currentRow: 0,
    });
    setKeyStates([]);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const updateKeyStates = (guess: string, results: ('correct' | 'present' | 'absent')[]) => {
    const newKeyStates = [...keyStates];
    
    guess.split('').forEach((letter, index) => {
      const existingKeyIndex = newKeyStates.findIndex(k => k.key === letter);
      const newState = results[index];
      
      if (existingKeyIndex === -1) {
        newKeyStates.push({ key: letter, state: newState });
      } else if (newState === 'correct' || 
                (newState === 'present' && newKeyStates[existingKeyIndex].state !== 'correct') ||
                (newState === 'absent' && !['correct', 'present'].includes(newKeyStates[existingKeyIndex].state))) {
        newKeyStates[existingKeyIndex].state = newState;
      }
    });
    
    setKeyStates(newKeyStates);
  };

  const handleGuess = () => {
    if (gameState.currentGuess.length !== WORD_LENGTH) return;
    if (!isValidWord(gameState.currentGuess)) {
      alert('Not a valid word!');
      return;
    }

    const results = checkGuess(gameState.currentGuess, gameState.targetWord);
    const newGuesses = [...gameState.guesses];
    const guessLetters: GuessLetter[] = gameState.currentGuess.split('').map((letter, index) => ({
      letter,
      state: results[index],
    }));
    newGuesses[gameState.currentRow] = guessLetters;

    updateKeyStates(gameState.currentGuess, results);

    const isWin = results.every(result => result === 'correct');
    const isLoss = gameState.currentRow === MAX_GUESSES - 1 && !isWin;

    setGameState(prev => ({
      ...prev,
      guesses: newGuesses,
      currentGuess: '',
      currentRow: prev.currentRow + 1,
      gameStatus: isWin ? 'won' : isLoss ? 'lost' : 'playing',
    }));

    if (isWin) {
      setTimeout(() => alert('Congratulations! You won!'), 500);
    } else if (isLoss) {
      setTimeout(() => alert(`Game Over! The word was ${gameState.targetWord}`), 500);
    }
  };

  const handleKeyPress = (key: string) => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length < WORD_LENGTH) {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + key,
      }));
    }
  };

  const handleDelete = () => {
    if (gameState.gameStatus !== 'playing') return;
    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1),
    }));
  };

  // Add keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.gameStatus !== 'playing') return;

      const key = event.key.toUpperCase();
      
      if (key === 'ENTER') {
        handleGuess();
      } else if (key === 'BACKSPACE') {
        handleDelete();
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameStatus, gameState.currentGuess]);

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Woogle</h1>
          {gameState.gameStatus !== 'playing' && (
            <button
              onClick={initializeGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              New Game
            </button>
          )}
        </div>
        
        <GameBoard
          guesses={gameState.guesses}
          currentGuess={gameState.currentGuess}
          currentRow={gameState.currentRow}
        />
        
        <Keyboard
          onKey={handleKeyPress}
          onEnter={handleGuess}
          onDelete={handleDelete}
          keys={keyStates}
        />
      </div>
    </main>
  );
}
