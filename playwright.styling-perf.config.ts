import { defineConfig, devices } from "@playwright/test"
import { BASE_URL, OUTPUT_ROOT } from "./playwright/styling-migration/routes"

// Local tool for the styling migration, not part of the CI smoke suite.
// One worker: parallel page loads would skew the timings.
export default defineConfig({
  testDir: "./playwright/styling-migration",
  testMatch: "perf.spec.ts",
  outputDir: `${OUTPUT_ROOT}/.playwright-output`,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: BASE_URL,
    locale: "en-US",
    timezoneId: "America/New_York",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
})
