import { WordService } from "./word-service";

export enum Hint {
  is = 0,
  in = 1,
  miss = 2,
}
export type Guess = [string, Hint][];
export type SubmitResult = {
  guesses: Guess[];
  value: string;
  won: boolean;
  ended: boolean;
  error: string;
};

export class WordleService {
  static async newGame() {
    const wordService = await WordService.get();
    const service = new this(wordService.getRandomWord(), 6, wordService);
    return [service, { ...service._lastResult }] as const;
  }

  private _lastResult: SubmitResult = {
    guesses: [],
    value: "",
    won: false,
    ended: false,
    error: "",
  };

  constructor(
    private _secretWord: string,
    private _maxTries: number,
    private _wordService: WordService,
  ) {}

  async submit(value: string): Promise<SubmitResult> {
    const [isValid, error] = this._isValidWord(value);
    const result = { ...this._lastResult, error };

    if (!isValid) {
      result.value = value;
    } else {
      const guess = this._evaluateWord(value);
      result.guesses.push(guess);
      result.won = this._isSecretWord(guess);
      result.ended = result.won || !(result.guesses.length < this._maxTries);
      result.value = result.ended ? this._secretWord : "";
    }

    return (this._lastResult = result);
  }

  private _isValidWord(value: string): [boolean, string] {
    if (value.length < this._secretWord.length) return [false, "Too short"];
    if (value.length > this._secretWord.length) return [false, "Too long"];
    if (!this._wordService.isInDict(value)) return [false, "Not valid"];
    return [true, ""];
  }

  private _evaluateWord(word: string): Guess {
    return [...word].map((char, i) => [
      char,
      this._secretWord[i] === char
        ? Hint.is
        : this._secretWord.includes(char) &&
            word[this._secretWord.indexOf(char)] !== char &&
            this._countCharInString(char, word.slice(0, i)) <
              this._countCharInString(char, this._secretWord)
          ? Hint.in
          : Hint.miss,
    ]);
  }

  private _isSecretWord(guess: Guess) {
    return guess.every(([_, hint]) => hint === Hint.is);
  }

  private _countCharInString(char: string, str: string) {
    return [...str].filter((c) => c === char).length;
  }
}
