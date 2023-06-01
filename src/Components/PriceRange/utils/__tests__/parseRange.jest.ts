import { parseRange } from "Components/PriceRange/utils/parseRange"

describe("parseRange", () => {
  it("should correctly parse range when valid range is passed", () => {
    expect(parseRange("5-10")).toEqual([5, 10])
  })

  it("should return numeric values", () => {
    expect(parseRange("5.5-10.789")).toEqual([5, 10])
  })

  it("should correctly parse range when default range values are passed", () => {
    expect(parseRange("*-5")).toEqual(["*", 5])
    expect(parseRange("5-*")).toEqual([5, "*"])
    expect(parseRange("*-*")).toEqual(["*", "*"])
  })
})
