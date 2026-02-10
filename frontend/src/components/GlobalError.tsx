"use client";
import { Button, Center, Code, Stack, Text, Title } from "@mantine/core";
import {
    IconHome,
    IconProps,
    IconRefresh,
    IconServerOff,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes, useTransition } from "react";

interface GlobalErrorProps {
    title?: string;
    desc?: string;
    Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    IconColor?: string;
    error?: Error & { digest?: string };
    reset?: () => void;
}

export function GlobalError({
    title = "Unable to reach the server",
    desc = "The cinematic server encountered a hiccup. Please check your connection or try again later.",
    Icon = IconServerOff,
    IconColor = "var(--mantine-color-red-7)",
    error,
    reset,
}: GlobalErrorProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleReset = () => {
        startTransition(() => {
            router.refresh(); // Tells the server to re-run data fetching
            if (reset) reset(); // Tells the client to re-render the segment
        });
    };
    return (
        <Center h="80vh">
            <Stack align="center" gap="xs">
                <Icon size={64} stroke={1.5} color={IconColor} />
                <Title order={2} size="h3" ta="center">
                    {title}
                </Title>
                {error && (
                    <Code fz="lg" px="sm">
                        {error.name}: {error.message}
                    </Code>
                )}
                <Text size="lg" c="dimmed" ta="center" maw={500}>
                    {desc}
                </Text>
                <Stack>
                    {reset && (
                        <Button
                            onClick={handleReset}
                            size="md"
                            variant="light"
                            color="gray"
                            loading={isPending}
                            leftSection={<IconRefresh size={18} />}
                        >
                            Try again
                        </Button>
                    )}
                    {pathname !== "/" && (
                        <Button
                            component={Link}
                            href="/"
                            size="md"
                            variant="light"
                            color="gray"
                            leftSection={<IconHome size={18} />}
                        >
                            Back to Home
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Center>
    );
}
