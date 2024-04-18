import { defineConfig } from "cypress"

export default defineConfig({
  retries: 5,
  userAgent: "ForceSmokeTest",
  e2e: {
    baseUrl: "http://localhost:5000",
    supportFile: false,
  },
})
