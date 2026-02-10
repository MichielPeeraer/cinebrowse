"use client";
import { GlobalError } from "@/components/GlobalError";

interface CustomErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function CustomError({ error, reset }: CustomErrorProps) {
    return <GlobalError error={error} reset={reset} />;
}
