import { moviesApi } from "@/lib/api";
import {
    Badge,
    Container,
    Group,
    Image,
    Stack,
    Text,
    Title,
    Box,
    SimpleGrid,
    Divider,
} from "@mantine/core";
import { IconClock, IconStarFilled } from "@tabler/icons-react";
import { notFound } from "next/navigation";
import { formatGenreLabel } from "@/lib/genres";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ key: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { key } = await params;

    try {
        const movie = await moviesApi.getByKeySSR(key);
        if (!movie) return { title: "Movie Not Found" };

        return {
            title: movie.name,
            description: movie.description,
        };
    } catch (error) {
        return { title: "Error" };
    }
}

export default async function MovieDetailPage({ params }: PageProps) {
    const { key } = await params;
    const imageBase = process.env.NEXT_PUBLIC_API_URL!;

    try {
        const movie = await moviesApi.getByKeySSR(key);
        if (!movie) return notFound();

        return (
            <Container py="lg" px={0}>
                <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50}>
                    <Image
                        src={`${imageBase}${movie.img}`}
                        alt={movie.name}
                        radius="md"
                    />

                    <Stack gap="lg">
                        <Title order={2} size="h1" fw={800} mb="xs">
                            {movie.name}
                        </Title>

                        <Group gap="xs">
                            {movie.genres.map((genre) => (
                                <Badge
                                    key={genre}
                                    variant="light"
                                    color="gray"
                                    size="lg"
                                    radius="sm"
                                    tt="capitalize"
                                >
                                    {formatGenreLabel(genre)}
                                </Badge>
                            ))}
                        </Group>

                        <Group gap="xl" py="sm">
                            <Stack gap={2}>
                                <Group gap={6}>
                                    <IconStarFilled
                                        size={20}
                                        color="var(--mantine-color-yellow-7)"
                                    />
                                    <Text fz="xl" fw={700}>
                                        {movie.rate}
                                    </Text>
                                </Group>
                                <Text size="xs" c="dimmed" ta="center">
                                    Rating
                                </Text>
                            </Stack>

                            <Divider orientation="vertical" />

                            <Stack gap={2}>
                                <Group gap={6}>
                                    <IconClock
                                        size={20}
                                        color="var(--mantine-color-dimmed)"
                                    />
                                    <Text fz="xl" fw={700}>
                                        {movie.length}
                                    </Text>
                                </Group>
                                <Text size="xs" c="dimmed" ta="center">
                                    Minutes
                                </Text>
                            </Stack>
                        </Group>

                        <Box>
                            <Title order={4} mb="xs">
                                Overview
                            </Title>
                            <Text
                                size="lg"
                                c="dimmed"
                                style={{ lineHeight: 1.8 }}
                            >
                                {movie.description}
                            </Text>
                        </Box>
                    </Stack>
                </SimpleGrid>
            </Container>
        );
    } catch (error) {
        return notFound();
    }
}
