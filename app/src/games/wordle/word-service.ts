export class WordService {
  static async get(lang: string) {
    const response = await fetch(import.meta.env.BASE_URL + `/${lang}-5.txt`);
    const text = await response.text();
    const words = text.replaceAll("\r\n", "\n").split("\n");
    return new this(words);
  }

  constructor(private _words: string[]) {}

  getRandomWord(): string {
    const randomIndex = Math.floor(Math.random() * this._words.length);
    return this._words[randomIndex];
  }

  isInDict(word: string): boolean {
    return this._words.includes(word);
  }
}
