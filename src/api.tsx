import { Spell, SpellsResponse } from "./models/spell";

const BASE_URL = 'https://www.dnd5eapi.co';

export const fetchEachSpell = async (url: string) => {
    const response = await fetch(BASE_URL + url);
    const data: Spell = await response.json();
    return data;
};

export const fetchSpells = async (): Promise<SpellsResponse> => {
    try {
        const response = await fetch(BASE_URL + '/api/spells');

        if (!response.ok) {
            throw new Error('Failed to fetch spells!')
        }
        const data: SpellsResponse = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching spells:', error);
        return error as SpellsResponse;
    }
};
