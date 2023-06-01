import { getPriceValue } from "Components/PriceRange/Utils/getPriceValue"

describe("getPriceValue", () => {
  it("should return passed values", () => {
    expect(getPriceValue(10)).toBe(10)
    expect(getPriceValue(15000)).toBe(15000)
    expect(getPriceValue(60000)).toBe(60000)
  })

  it("should return empty string when default range value is passed", () => {
    expect(getPriceValue("*")).toBe("")
  })

  it("should return empty string when 0 is passed", () => {
    expect(getPriceValue(0)).toBe("")
  })
})
