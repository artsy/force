import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./playwright/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 5 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:4000",
    trace: "on-first-retry",
  },

  expect: {
    timeout: 10000, // 10 seconds for assertions
  },

  // Start local dev server before running tests (skip when using external base URL)
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "yarn start",
        port: 4000,
        reuseExistingServer: !process.env.CI,
        timeout: 120000, // 2 minutes to start the server
      },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})
