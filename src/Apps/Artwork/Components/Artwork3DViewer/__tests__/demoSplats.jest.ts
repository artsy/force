import {
  DEMO_SPLATS,
  get3DAssetUrl,
  has3DAsset,
} from "Apps/Artwork/Components/Artwork3DViewer/demoSplats"

describe("demoSplats", () => {
  describe("has3DAsset", () => {
    it("returns false for a slug with no configured splat asset", () => {
      expect(has3DAsset("no-such-artwork")).toBe(false)
    })

    it("returns true for a slug present in DEMO_SPLATS", () => {
      DEMO_SPLATS["a-test-sculpture"] = "https://files.artsy.net/test.splat"

      expect(has3DAsset("a-test-sculpture")).toBe(true)

      delete DEMO_SPLATS["a-test-sculpture"]
    })
  })

  describe("get3DAssetUrl", () => {
    it("returns null for a slug with no configured splat asset", () => {
      expect(get3DAssetUrl("no-such-artwork")).toBeNull()
    })

    it("returns the configured URL for a known slug", () => {
      DEMO_SPLATS["a-test-sculpture"] = "https://files.artsy.net/test.splat"

      expect(get3DAssetUrl("a-test-sculpture")).toBe(
        "https://files.artsy.net/test.splat",
      )

      delete DEMO_SPLATS["a-test-sculpture"]
    })
  })
})
