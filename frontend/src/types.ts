import {
    IconAlertTriangle,
    IconMovieOff,
    IconProps,
    IconServerOff,
} from "@tabler/icons-react";

export const ICONS = {
    "server-off": IconServerOff,
    "movie-off": IconMovieOff,
    "alert-triangle": IconAlertTriangle,
} satisfies Record<string, React.ComponentType<IconProps>>;
export type ErrorIcon = keyof typeof ICONS;

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
    year: number;
    img: string;
    trailerId?: string;
}
