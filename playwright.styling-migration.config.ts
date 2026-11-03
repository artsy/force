import { defineConfig, devices } from "@playwright/test"
import { OUTPUT_ROOT } from "./playwright/styling-migration/routes"

// Local tool for the styling migration, not part of the CI smoke suite.
export default defineConfig({
  testDir: "./playwright/styling-migration",
  testMatch: "capture.spec.ts",
  outputDir: `${OUTPUT_ROOT}/.playwright-output`,
  fullyParallel: true,
  workers: 4,
  timeout: 120000,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:4000",
    locale: "en-US",
    timezoneId: "America/New_York",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
})
