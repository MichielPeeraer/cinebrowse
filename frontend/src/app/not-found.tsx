"use client";
import { IconAlertTriangle } from "@tabler/icons-react";
import { GlobalError } from "@/components/GlobalError";

export default function Custom404() {
    return (
        <GlobalError
            title="Page not found"
            desc="The page you are looking for might have been moved, deleted, or never existed in this cinematic universe."
            Icon={IconAlertTriangle}
            homeBtn
        />
    );
}
