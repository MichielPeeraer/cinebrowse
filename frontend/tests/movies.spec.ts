import { test, expect, Locator } from "@playwright/test";

const BASE_URL = "http://localhost:3000";
const BACKEND_URL = "http://localhost:5000";

// Selectors
const UI = {
    card: ".movie-card",
    name: ".movie-name",
    genre: ".movie-genre",
    rate: ".movie-rate",
    length: ".movie-length",
    description: ".movie-description",
    image: "img",
};

// Helper to verify a movie card contains all expected genres
async function expectMovieToHaveGenres(
    card: Locator,
    expectedGenres: string[],
) {
    const badgeTexts = await card.locator(UI.genre).allTextContents();
    const actualGenres = badgeTexts.map((g) => g.toLowerCase().trim());

    for (const genre of expectedGenres) {
        expect(actualGenres).toContain(genre.toLowerCase());
    }
}

test.describe("betssonMovies App E2E", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test("should display movies with correct backend image paths", async ({
        page,
    }) => {
        const firstImage = page.locator(`${UI.card} ${UI.image}`).first();
        await expect(firstImage).toBeVisible();

        const imgSrc = await firstImage.getAttribute("src");
        expect(imgSrc).toContain(BACKEND_URL);
    });

    test("should filter by multiple genres (AND logic)", async ({ page }) => {
        const genres = ["action", "adventure"];
        const params = new URLSearchParams();
        genres.forEach((g) => params.append("g", g));

        await page.goto(`${BASE_URL}/?${params.toString()}`);

        const firstCard = page.locator(UI.card).first();
        await expect(firstCard).toBeVisible();
        await expectMovieToHaveGenres(firstCard, genres);
    });

    test("should handle complex filtering regardless of param order", async ({
        page,
    }) => {
        const testCases = [
            "g=action&g=adventure&q=deadpool",
            "q=deadpool&g=adventure&g=action",
        ];

        for (const queryString of testCases) {
            await page.goto(`${BASE_URL}/?${queryString}`);

            const title = page.locator(UI.name);
            await expect(title).toContainText("Deadpool", { ignoreCase: true });
            await expect(page.locator(UI.card)).toHaveCount(1);

            // Also verify the genres match even in the combined search
            await expectMovieToHaveGenres(page.locator(UI.card).first(), [
                "action",
                "adventure",
            ]);
        }
    });

    test("should navigate to movie detail page and display correct info", async ({
        page,
    }) => {
        const firstCard = page.locator(UI.card).first();
        const movieTitle = await firstCard.locator(UI.name).innerText();

        await firstCard.click();

        await expect(page).not.toHaveURL(`${BASE_URL}/`);

        const title = page.locator("h2");
        await expect(title).toHaveText(movieTitle);

        const genres = page.locator(UI.genre);
        const count = await genres.count();
        expect(count).toBeGreaterThan(0);

        await expect(page.locator(UI.rate)).toBeVisible();
        await expect(page.locator(UI.length)).toBeVisible();
        await expect(page.locator(UI.description)).toBeVisible();

        const detailImg = page.locator(UI.image);
        const imgSrc = await detailImg.getAttribute("src");
        expect(imgSrc).toContain(BACKEND_URL);
    });

    test("should show 404 page for non-existent movie", async ({ page }) => {
        // Go to a key that definitely doesn't exist
        await page.goto(`${BASE_URL}/movies/some-fake-movie-123`);

        // Check for the Title and the Home Button
        await expect(page.locator("h2")).toContainText("Page not found");
        const homeButton = page.getByRole("link", { name: /back to home/i });
        await expect(homeButton).toBeVisible();

        // Verify clicking the button takes you back
        await homeButton.click();
        await expect(page).toHaveURL(BASE_URL);
    });
});
