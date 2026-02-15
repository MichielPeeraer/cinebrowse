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
import {
    IconCalendarEvent,
    IconClock,
    IconStarFilled,
} from "@tabler/icons-react";
import { notFound } from "next/navigation";
import { formatGenreLabel } from "@/lib/helpers";
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

        return {
            title: movie.name,
            description: movie.description,
        };
    } catch (error: any) {
        if (error.status === 404) return { title: "Movie not found" };
        return { title: "Error" };
    }
}

export default async function MovieDetailPage({ params }: PageProps) {
    const { key } = await params;
    const IMG_BASE = process.env.NEXT_PUBLIC_API_URL!;

    try {
        const movie = await moviesApi.getByKeySSR(key);

        return (
            <Container py="lg" px={0}>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
                    <Image
                        src={`${IMG_BASE}${movie.img}`}
                        alt={movie.name}
                        radius="md"
                        maw={455}
                    />

                    <Stack gap="lg">
                        <Title
                            className="movie-name"
                            order={2}
                            size="h1"
                            fw={800}
                            mb="xs"
                        >
                            {movie.name}
                        </Title>

                        <Group gap="xs">
                            {movie.genres.map((genre) => (
                                <Badge
                                    className="movie-genre"
                                    key={genre}
                                    tt="capitalize"
                                    variant="light"
                                    color="grey"
                                    radius="sm"
                                    size="lg"
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
                                    <Text
                                        className="movie-rate"
                                        fz="xl"
                                        fw={700}
                                    >
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
                                    <Text
                                        className="movie-length"
                                        fz="xl"
                                        fw={700}
                                    >
                                        {movie.length}
                                    </Text>
                                </Group>
                                <Text size="xs" c="dimmed" ta="center">
                                    Minutes
                                </Text>
                            </Stack>

                            <Divider orientation="vertical" />

                            <Stack gap={2}>
                                <Group gap={6}>
                                    <IconCalendarEvent
                                        size={20}
                                        color="var(--mantine-color-dimmed)"
                                    />
                                    <Text
                                        className="movie-year"
                                        fz="xl"
                                        fw={700}
                                    >
                                        {movie.year}
                                    </Text>
                                </Group>
                                <Text size="xs" c="dimmed" ta="center">
                                    Release
                                </Text>
                            </Stack>
                        </Group>

                        <Box>
                            <Title order={4} mb="xs">
                                Overview
                            </Title>
                            <Text
                                className="movie-description"
                                size="lg"
                                c="dimmed"
                                lh={1.8}
                            >
                                {movie.description}
                            </Text>
                        </Box>

                        {movie.trailerId && (
                            <Box>
                                <Title order={4} mb="sm">
                                    Trailer
                                </Title>

                                <Box
                                    h={0}
                                    pos="relative"
                                    pb="56.25%" // 16:9
                                >
                                    <iframe
                                        src={`https://www.youtube.com/embed/${movie.trailerId}`}
                                        title={`${movie.name} trailer`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: 8,
                                            border: 0,
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Stack>
                </SimpleGrid>
            </Container>
        );
    } catch (error: any) {
        if (error.status === 404) return notFound();
        throw error;
    }
}
