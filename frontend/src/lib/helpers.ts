import { Genre, GENRES } from "@/types";

export function isValidGenre(value: any): value is Genre {
    return GENRES.includes(value);
}

// Helper to capitalize (action -> Action, scifi -> Sci-Fi)
export function formatGenreLabel(genre: string) {
    const specialCases: Record<string, string> = {
        scifi: "Sci-Fi",
    };

    return (
        specialCases[genre.toLowerCase()] ||
        genre.charAt(0).toUpperCase() + genre.slice(1)
    );
}
