export interface Spell {
    index: string;
    name: string;
    url: string;
    level: number,
    desc: Array<string>
}

export interface SpellsResponse {
    count: number;
    results: Spell[];
}
