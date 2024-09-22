export class TextService {
    static async get(lang: string) {
        const response = await fetch(import.meta.env.BASE_URL + `/${lang}-text.json`);
        const data = await response.json();
        return new this(data);
    }

    constructor(private _data: Record<string, string>) { }

    get(key: string) {
        return this._data[key]
    }
}
