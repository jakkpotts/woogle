export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface GuessLetter {
  letter: string;
  state: LetterState;
}

export interface GameState {
  guesses: GuessLetter[][];
  currentGuess: string;
  targetWord: string;
  gameStatus: 'playing' | 'won' | 'lost';
  currentRow: number;
}

export interface KeyboardKey {
  key: string;
  state: LetterState;
}

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6; 