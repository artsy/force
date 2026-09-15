import { Intent } from "@artsy/cohesion"
import { isCommercialAuthIntent } from "Components/AuthDialog/Utils/isCommercialAuthIntent"

describe("isCommercialAuthIntent", () => {
  it("returns false when there is no intent", () => {
    expect(isCommercialAuthIntent(undefined)).toBe(false)
  })

  it("returns false for non-commercial intents", () => {
    expect(isCommercialAuthIntent(Intent.signup)).toBe(false)
    expect(isCommercialAuthIntent(Intent.login)).toBe(false)
    expect(isCommercialAuthIntent(Intent.viewEditorial)).toBe(false)
  })

  it("returns true for commercial intents", () => {
    expect(isCommercialAuthIntent(Intent.bid)).toBe(true)
    expect(isCommercialAuthIntent(Intent.buyNow)).toBe(true)
    expect(isCommercialAuthIntent(Intent.createAlert)).toBe(true)
    expect(isCommercialAuthIntent(Intent.inquire)).toBe(true)
    expect(isCommercialAuthIntent(Intent.makeOffer)).toBe(true)
    expect(isCommercialAuthIntent(Intent.registerToBid)).toBe(true)
  })
})
