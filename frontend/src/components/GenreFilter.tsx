"use client";
import { formatGenreLabel, isValidGenre } from "@/lib/helpers";
import { GENRES } from "@/types";
import { MultiSelect, Loader } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";

export function GenreFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 1. Add the transition hook
    const [isPending, startTransition] = useTransition();

    const rawGenres = searchParams.getAll("g");

    // SANITIZE: Filter out anything the user typed manually that isn't real
    const currentGenres = rawGenres.filter(isValidGenre);

    const handleChange = (values: string[]) => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete("g");
        values.forEach((val) => {
            params.append("g", val);
        });

        // 2. Wrap the navigation in startTransition
        startTransition(() => {
            router.push(`/?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <MultiSelect
            placeholder="Filter genres"
            value={currentGenres}
            onChange={handleChange}
            searchable
            clearable
            nothingFoundMessage="Genre not found"
            // 3. Swap Icon for Loader when pending
            leftSection={
                isPending ? (
                    <Loader size={16} color="blue" />
                ) : (
                    <IconFilter size={16} />
                )
            }
            data={GENRES.map((g) => ({
                value: g,
                label: formatGenreLabel(g),
            }))}
            comboboxProps={{
                transitionProps: { transition: "pop", duration: 200 },
            }}
            // Optional: Disable or dim while loading to prevent double-clicks
            disabled={isPending}
        />
    );
}
