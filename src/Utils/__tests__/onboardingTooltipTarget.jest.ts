import { getOnboardingTooltipTarget } from "../onboardingTooltipTarget"

const noPageConditions = {
  isOnHomepage: false,
  isOnEditorialPage: false,
  isOnPriceDatabasePage: false,
}

describe("getOnboardingTooltipTarget", () => {
  describe("whatsNew", () => {
    it("returns whatsNew when on the homepage and a matching interest is selected", () => {
      const target = getOnboardingTooltipTarget(["Buying art"], {
        ...noPageConditions,
        isOnHomepage: true,
      })

      expect(target?.navItemId).toEqual("whatsNew")
    })

    it("returns null when not on the homepage, even with a matching interest", () => {
      const target = getOnboardingTooltipTarget(["Buying art"], {
        ...noPageConditions,
        isOnHomepage: false,
      })

      expect(target).toBeNull()
    })

    it("returns null when on the homepage but no matching interest is selected", () => {
      const target = getOnboardingTooltipTarget(
        ["Reading about art and artists"],
        { ...noPageConditions, isOnHomepage: true },
      )

      expect(target?.navItemId).not.toEqual("whatsNew")
    })
  })

  describe("editorial", () => {
    it("returns editorial when the interest is selected and not on an editorial page", () => {
      const target = getOnboardingTooltipTarget(
        ["Reading about art and artists"],
        noPageConditions,
      )

      expect(target?.navItemId).toEqual("editorial")
    })

    it("returns null when already on an editorial page", () => {
      const target = getOnboardingTooltipTarget(
        ["Reading about art and artists"],
        { ...noPageConditions, isOnEditorialPage: true },
      )

      expect(target).toBeNull()
    })
  })

  describe("priceDatabase", () => {
    it("returns priceDatabase when the interest is selected and not on the price database page", () => {
      const target = getOnboardingTooltipTarget(
        ["Tracking prices and results at auction"],
        noPageConditions,
      )

      expect(target?.navItemId).toEqual("priceDatabase")
    })

    it("returns null when already on the price database page", () => {
      const target = getOnboardingTooltipTarget(
        ["Tracking prices and results at auction"],
        { ...noPageConditions, isOnPriceDatabasePage: true },
      )

      expect(target).toBeNull()
    })
  })

  describe("priority order", () => {
    it("prioritizes whatsNew over editorial and priceDatabase when all three interests are selected on the homepage", () => {
      const target = getOnboardingTooltipTarget(
        [
          "Buying art",
          "Reading about art and artists",
          "Tracking prices and results at auction",
        ],
        { ...noPageConditions, isOnHomepage: true },
      )

      expect(target?.navItemId).toEqual("whatsNew")
    })

    it("falls through to editorial when whatsNew's condition fails but editorial's passes", () => {
      const target = getOnboardingTooltipTarget(
        [
          "Reading about art and artists",
          "Tracking prices and results at auction",
        ],
        noPageConditions,
      )

      expect(target?.navItemId).toEqual("editorial")
    })

    it("falls through to priceDatabase when whatsNew and editorial both fail", () => {
      const target = getOnboardingTooltipTarget(
        ["Tracking prices and results at auction"],
        noPageConditions,
      )

      expect(target?.navItemId).toEqual("priceDatabase")
    })
  })

  it("returns null when no interests are selected at all", () => {
    const target = getOnboardingTooltipTarget([], {
      ...noPageConditions,
      isOnHomepage: true,
    })

    expect(target).toBeNull()
  })

  it("returns null when nothing qualifies at all", () => {
    const target = getOnboardingTooltipTarget(["Buying art"], {
      isOnHomepage: false,
      isOnEditorialPage: true,
      isOnPriceDatabasePage: false,
    })

    expect(target).toBeNull()
  })
})
