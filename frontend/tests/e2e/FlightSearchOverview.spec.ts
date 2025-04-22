import { expect, test } from "@playwright/test";

test("Flight search - shows filtered results", async ({ page }) => {
  // Navigate to the page
  await page.goto("http://localhost:5173/");

  // Simulate typing in the search input field
  const searchInput = await page.locator('input[type="text"]');
  await searchInput.fill("London"); // Type in search query
  await searchInput.press("Enter"); // Trigger search

  // Wait for search results to appear and test amount of results
  const flightCards = await page.locator('[data-test-id^="flight-card-"]');
  await expect(flightCards).toHaveCount(6);

  // Verify that the first flight card contains relevant information
  const firstFlightCard = flightCards.nth(0);
  await expect(firstFlightCard.locator("[data-test-id='flight-airport']")).toContainText("London");
});

test("Flight search - shows no results for non-existent query", async ({ page }) => {
  // Go to the page
  await page.goto("http://localhost:5173/");

  // Search for a query that yields no results
  const searchInput = await page.locator('input[type="text"]');
  await searchInput.fill("Non-Existing City");
  await searchInput.press("Enter");

  // Verify no results message is shown
  const noResultsMessage = await page.locator("[data-test-id='no-flights-results']"); // Adjust the selector as needed
  await expect(noResultsMessage).toBeVisible();
});
