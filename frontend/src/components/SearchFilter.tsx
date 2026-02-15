"use client";
import { CloseButton, TextInput, Loader } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useTransition } from "react";

export function SearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const initialQ = searchParams.get("q") ?? "";
    const [value, setValue] = useState(initialQ);

    // SYNC EFFECT: Keeps the input box in sync with the URL
    useEffect(() => {
        const currentQ = searchParams.get("q") ?? "";
        setValue(currentQ);
    }, [searchParams]);

    const performSearch = useCallback(
        (searchTerm: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm.trim()) {
                params.set("q", searchTerm.trim());
            } else {
                params.delete("q");
            }

            startTransition(() => {
                router.push(`/?${params.toString()}`, { scroll: false });
            });
        },
        [router, searchParams],
    );

    useEffect(() => {
        if (value === initialQ) return;

        const handler = setTimeout(() => {
            performSearch(value);
        }, 400);

        return () => clearTimeout(handler);
    }, [value, performSearch, initialQ]);

    return (
        <TextInput
            placeholder="Search movies"
            // If isPending is true, show a Loader instead of the Search Icon
            leftSection={
                isPending ? (
                    <Loader size={16} color="blue" />
                ) : (
                    <IconSearch size={16} />
                )
            }
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") performSearch(value);
            }}
            rightSection={
                <CloseButton
                    size={22}
                    onClick={() => {
                        setValue("");
                        performSearch("");
                    }}
                    display={value ? undefined : "none"}
                />
            }
        />
    );
}
