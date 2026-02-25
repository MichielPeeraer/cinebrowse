import { Metadata } from "next";
import { Overview } from "@/components/Overview";
import { MoviesLoader } from "@/components/MoviesLoader";
import { isValidGenre } from "@/lib/helpers";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getSanitizedParams(params: PageProps["searchParams"]) {
    const p = await params;
    const q = typeof p.q === "string" ? p.q.trim() : undefined;
    const g = p.g;

    const validGenres = [g].flat().filter(isValidGenre);

    return { q, validGenres };
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "CineBrowse",
        description: "Browse Movies",
    };
}

export default async function HomePage({ searchParams }: PageProps) {
    const { q, validGenres } = await getSanitizedParams(searchParams);

    return (
        <Overview genreList={validGenres} searchQuery={q}>
            <MoviesLoader q={q} g={validGenres} />
        </Overview>
    );
}
