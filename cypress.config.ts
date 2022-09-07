import { defineConfig } from "cypress"

export default defineConfig({
  retries: 5,
  e2e: {
    baseUrl: "http://localhost:5000",
    supportFile: false,
  },
})
