import { test, expect } from "@playwright/test"

// TODO: Needs TEST_USER and TEST_PASSWORD configured in order to generate
// access token for querying metaphysics for a single viewing room.
// Reference integrity's code for the logic.
test.describe.skip("Viewing Room", () => {
  let viewingRoom: any

  test.beforeAll(() => {
    // getSingleEntity("viewing-room").then(res => {
    //   viewingRoom = res
    // })
  })

  test("/viewing-rooms/:id", async ({ page }) => {
    // Title as rendered in HTML preserves extra whitespace
    const inPageTitle = viewingRoom.title.trim()
    // Title when used for page title does not preserve consecutive whitespace
    const browserTitle = viewingRoom.title.trim().replace(/\s\s+/g, " ")

    await page.goto(`viewing-room/${viewingRoom.slug}`)

    await expect(page.locator("h1").first()).toContainText(inPageTitle)
    await expect(page).toHaveTitle(new RegExp(browserTitle))
  })
})
