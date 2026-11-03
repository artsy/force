import { percentile } from "Utils/percentile"

const range = (count: number) => {
  return Array.from({ length: count }, (_, index) => index + 1)
}

describe("percentile", () => {
  it("returns the mean of the two middle values for an even count", () => {
    expect(percentile({ values: [1, 2, 3, 4], p: 0.5 })).toBe(2.5)
  })

  it("returns the middle value for an odd count", () => {
    expect(percentile({ values: [5, 1, 3], p: 0.5 })).toBe(3)
  })

  it("interpolates p90 between the closest ranks", () => {
    expect(percentile({ values: range(30), p: 0.9 })).toBeCloseTo(27.1)
    expect(percentile({ values: range(10), p: 0.9 })).toBeCloseTo(9.1)
  })

  it("returns the only value of a single-value list", () => {
    expect(percentile({ values: [7], p: 0.5 })).toBe(7)
    expect(percentile({ values: [7], p: 0.9 })).toBe(7)
  })

  it("does not change the input order", () => {
    const values = [3, 1, 2]
    percentile({ values, p: 0.5 })
    expect(values).toEqual([3, 1, 2])
  })

  it("throws on an empty list", () => {
    expect(() => percentile({ values: [], p: 0.5 })).toThrow()
  })
})
