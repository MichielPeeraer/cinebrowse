"use client";
import { formatGenreLabel } from "@/lib/helpers";
import { Movie } from "@/types";
import { Badge, Card, Group, Image, Stack, Title, Text } from "@mantine/core";
import { IconClock, IconStarFilled } from "@tabler/icons-react";

export function MovieCard({ movie }: { movie: Movie }) {
    const IMG_BASE = process.env.NEXT_PUBLIC_API_URL!;

    return (
        <Card
            className="movie-card"
            shadow="md"
            radius="md"
            component="a"
            h="100%"
            href={`/${movie.key}`}
            style={{
                transition: "transform 200ms ease, box-shadow 200ms ease",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "var(--mantine-shadow-md)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--mantine-shadow-sm)";
            }}
        >
            <Card.Section>
                <Image src={`${IMG_BASE}${movie.img}`} alt={movie.name} />
            </Card.Section>

            <Card.Section h="100%">
                <Stack p="xs" gap="xs" h="100%">
                    <Title
                        className="movie-name"
                        order={3}
                        size="h4"
                        lineClamp={1}
                        fw={700}
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
                                size="md"
                                px={8}
                                fw={600}
                            >
                                {formatGenreLabel(genre)}
                            </Badge>
                        ))}
                    </Group>

                    <Group justify="space-between" mt="auto">
                        <Group gap={4}>
                            <IconStarFilled
                                size={14}
                                color="var(--mantine-color-yellow-7)"
                            />
                            <Text className="movie-rate" size="sm" fw={700}>
                                {movie.rate}
                            </Text>
                        </Group>

                        <Group gap={4}>
                            <IconClock
                                size={14}
                                color="var(--mantine-color-dimmed)"
                            />
                            <Text className="movie-length" size="xs" c="dimmed">
                                {movie.length} min
                            </Text>
                        </Group>
                    </Group>
                </Stack>
            </Card.Section>
        </Card>
    );
}
