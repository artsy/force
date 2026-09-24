import { getOnboardingTooltipContent } from "../onboardingTooltipTarget"

describe("getOnboardingTooltipContent", () => {
  describe("editorial", () => {
    it("returns the editorial tooltip when the interest is selected and not on an editorial page", () => {
      const content = getOnboardingTooltipContent(
        "editorial",
        ["Reading about art and artists"],
        false,
      )

      expect(content).toEqual({
        title: "Read all about it!",
        body: "Explore our editorial for news about art and artists.",
      })
    })

    it("returns null when already on an editorial page", () => {
      const content = getOnboardingTooltipContent(
        "editorial",
        ["Reading about art and artists"],
        true,
      )

      expect(content).toBeNull()
    })

    it("returns null when the editorial interest was not selected", () => {
      const content = getOnboardingTooltipContent(
        "editorial",
        ["Buying art"],
        false,
      )

      expect(content).toBeNull()
    })

    it("returns null when no interests were selected at all", () => {
      const content = getOnboardingTooltipContent("editorial", [], false)

      expect(content).toBeNull()
    })
  })

  describe("priceDatabase", () => {
    it("returns the price database tooltip when the interest is selected and not on the price database page", () => {
      const content = getOnboardingTooltipContent(
        "priceDatabase",
        ["Tracking prices and results at auction"],
        false,
      )

      expect(content).toEqual({
        title: "Browse the database",
        body: "Explore 'Price Database' to view auction history results.",
      })
    })

    it("returns null when already on the price database page", () => {
      const content = getOnboardingTooltipContent(
        "priceDatabase",
        ["Tracking prices and results at auction"],
        true,
      )

      expect(content).toBeNull()
    })

    it("returns null when the price database interest was not selected", () => {
      const content = getOnboardingTooltipContent(
        "priceDatabase",
        ["Buying art"],
        false,
      )

      expect(content).toBeNull()
    })

    it("returns null when no interests were selected at all", () => {
      const content = getOnboardingTooltipContent("priceDatabase", [], false)

      expect(content).toBeNull()
    })
  })

  describe("multiple interests selected", () => {
    it("still returns the editorial tooltip when both editorial and price database interests are selected", () => {
      const content = getOnboardingTooltipContent(
        "editorial",
        [
          "Reading about art and artists",
          "Tracking prices and results at auction",
        ],
        false,
      )

      expect(content).toEqual({
        title: "Read all about it!",
        body: "Explore our editorial for news about art and artists.",
      })
    })

    it("still returns the price database tooltip when both editorial and price database interests are selected", () => {
      const content = getOnboardingTooltipContent(
        "priceDatabase",
        [
          "Reading about art and artists",
          "Tracking prices and results at auction",
        ],
        false,
      )

      expect(content).toEqual({
        title: "Browse the database",
        body: "Explore 'Price Database' to view auction history results.",
      })
    })
  })
})
