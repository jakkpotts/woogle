// A small subset of 5-letter words for demo purposes
const WORD_LIST = [
  'REACT', 'WORLD', 'HELLO', 'GAMES', 'HAPPY',
  'SMILE', 'BRAIN', 'CLOUD', 'DREAM', 'EARTH',
  'FLAME', 'GHOST', 'HEART', 'LIGHT', 'MUSIC',
  'PEACE', 'QUEEN', 'RIVER', 'STORM', 'TIGER'
];

export const getRandomWord = (): string => {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
};

export const isValidWord = (word: string): boolean => {
  return WORD_LIST.includes(word.toUpperCase());
};

export const checkGuess = (guess: string, target: string): ('correct' | 'present' | 'absent')[] => {
  const result: ('correct' | 'present' | 'absent')[] = Array(5).fill('absent');
  const targetChars = target.split('');
  const guessChars = guess.toUpperCase().split('');

  // First pass: mark correct letters
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === targetChars[i]) {
      result[i] = 'correct';
      targetChars[i] = '*';
      guessChars[i] = '*';
    }
  }

  // Second pass: mark present letters
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] !== '*') {
      const targetIndex = targetChars.indexOf(guessChars[i]);
      if (targetIndex !== -1) {
        result[i] = 'present';
        targetChars[targetIndex] = '*';
      }
    }
  }

  return result;
}; 