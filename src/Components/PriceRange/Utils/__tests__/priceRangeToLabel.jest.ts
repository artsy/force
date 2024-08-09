import { priceRangeToLabel } from "Components/PriceRange/Utils/priceRangeToLabel"

describe("priceRangeToLabel", () => {
  it("should return $0+ when min and max are *", () => {
    expect(priceRangeToLabel("*-*")).toEqual("$0+")
  })

  it("should return $0-$10 when min is *", () => {
    expect(priceRangeToLabel("*-10")).toEqual("$0–$10")
  })

  it("should return $10+ when max is *", () => {
    expect(priceRangeToLabel("10-*")).toEqual("$10+")
  })

  it("should return $10–$20 when min and max are numbers", () => {
    expect(priceRangeToLabel("10-20")).toEqual("$10–$20")
  })
})
