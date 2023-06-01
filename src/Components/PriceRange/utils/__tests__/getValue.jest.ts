import { getValue } from "Components/PriceRange/utils/getValue"

describe("getValue", () => {
  it("should return passed values", () => {
    expect(getValue(10)).toBe(10)
    expect(getValue(15000)).toBe(15000)
    expect(getValue(60000)).toBe(60000)
  })

  it("should return empty string when default range value is passed", () => {
    expect(getValue("*")).toBe("")
  })

  it("should return empty string when 0 is passed", () => {
    expect(getValue(0)).toBe("")
  })
})
