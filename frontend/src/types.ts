export const GENRES = [
    "action",
    "adventure",
    "comedy",
    "crime",
    "drama",
    "history",
    "biography",
    "mystery",
    "thriller",
    "scifi",
    "sport",
] as const;

export type Genre = (typeof GENRES)[number];

export interface Movie {
    key: string;
    name: string;
    description: string;
    genres: Genre[];
    rate: number;
    length: number;
    img: string;
}
