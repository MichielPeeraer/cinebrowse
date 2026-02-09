import { formatGenreLabel } from "@/lib/helpers";
import { Genre } from "@/types";
import { Title, Text } from "@mantine/core";

interface SearchResultProps {
    genreList: Genre[];
    searchQuery?: string;
}

export function SearchResult({
    genreList = [],
    searchQuery,
}: SearchResultProps) {
    // 1. Sanitize inputs
    const hasQuery = searchQuery && searchQuery.trim() !== "";
    const hasGenres = genreList && genreList.length > 0;

    // 2. If nothing to show, return null (renders nothing)
    if (!hasQuery && !hasGenres) return null;

    // 3. Build the formatted string
    const formattedGenres = genreList
        .map((genre) => formatGenreLabel(genre))
        .join(", ");

    // Logic:
    // If both: "Query" in Action, Horror
    // If Query only: "Query"
    // If Genre only: Action, Horror
    const displayContent =
        hasQuery && hasGenres
            ? `"${searchQuery}" in ${formattedGenres}`
            : hasQuery
              ? `"${searchQuery}"`
              : formattedGenres;

    return (
        <Title mt="lg" order={2} size="h3">
            <Text span inherit c="dimmed" fw={500}>
                Filtered results for:{" "}
            </Text>
            {displayContent}
        </Title>
    );
}

export default SearchResult;
