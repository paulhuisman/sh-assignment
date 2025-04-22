import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    browserName: "chromium", // You can change this to 'firefox' or 'webkit'
    headless: true, // Set to 'false' to see the tests running in a browser window
    screenshot: "on",
    video: "on",
  },
});
