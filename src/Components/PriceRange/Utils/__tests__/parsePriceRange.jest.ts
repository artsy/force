import { DEFAULT_CUSTOM_RANGE } from "Components/PriceRange/constants"
import { parsePriceRange } from "Components/PriceRange/Utils/parsePriceRange"

describe("parsePriceRange", () => {
  it("should correctly parse range when valid range is passed", () => {
    expect(parsePriceRange("5-10")).toEqual([5, 10])
  })

  it("should return numeric values", () => {
    expect(parsePriceRange("5.5-10.789")).toEqual([5, 10])
  })

  it("should correctly parse range when default range values are passed", () => {
    expect(parsePriceRange("*-5")).toEqual(["*", 5])
    expect(parsePriceRange("5-*")).toEqual([5, "*"])
    expect(parsePriceRange("*-*")).toEqual(DEFAULT_CUSTOM_RANGE)
  })

  it("should return the default value if the format is invalid", () => {
    expect(parsePriceRange("5-")).toEqual([5, "*"])
    expect(parsePriceRange("-5")).toEqual(["*", 5])
    expect(parsePriceRange("5")).toEqual(DEFAULT_CUSTOM_RANGE)
    expect(parsePriceRange("-5-*")).toEqual(DEFAULT_CUSTOM_RANGE)
    expect(parsePriceRange("*--5")).toEqual(DEFAULT_CUSTOM_RANGE)
  })
})
