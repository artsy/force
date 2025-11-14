import { expect, test } from "@playwright/test"

test.describe("/system/up", () => {
  test("should not render a page for /system/up healthcheck endpoint", async ({
    request,
  }) => {
    const response = await request.get("/system/up")
    const headers = response.headers()
    expect(headers["content-type"]).toContain("application/json")
  })

  test.describe("mobile", () => {
    test.use({ viewport: { width: 375, height: 812 } }) // iPhone X dimensions

    test("should not render a page for /system/up healthcheck endpoint", async ({
      request,
    }) => {
      const response = await request.get("/system/up")
      const headers = response.headers()
      expect(headers["content-type"]).toContain("application/json")
    })
  })
})
