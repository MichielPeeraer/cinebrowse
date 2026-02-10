import { Button, Center, Code, Stack, Text, Title } from "@mantine/core";
import {
    IconHome,
    IconProps,
    IconRefresh,
    IconServerOff,
} from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface GlobalErrorProps {
    title?: string;
    desc?: string;
    Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    IconColor?: string;
    homeBtn?: boolean;
    error?: Error & { digest?: string };
    reset?: () => void;
}

export function GlobalError({
    title = "Unable to reach the server",
    desc = "The cinematic server encountered a hiccup. Please check your connection or try again later.",
    Icon = IconServerOff,
    IconColor = "var(--mantine-color-red-7)",
    homeBtn,
    error,
    reset,
}: GlobalErrorProps) {
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
                            onClick={reset}
                            size="md"
                            variant="light"
                            color="grey"
                            leftSection={<IconRefresh size={18} />}
                        >
                            Try again
                        </Button>
                    )}
                    {homeBtn && (
                        <Button
                            onClick={() => (window.location.href = "/")}
                            size="md"
                            variant="light"
                            color="grey"
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
