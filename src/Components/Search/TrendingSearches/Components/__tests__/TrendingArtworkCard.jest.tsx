import { getTrendingCardLayout } from "../TrendingArtworkCard"

describe("getTrendingCardLayout", () => {
  it("derives the card width from the image's aspect ratio and keeps the exact ratio for the box", () => {
    // 165×230 portrait: √(25600 × 165/230) ≈ 136
    expect(getTrendingCardLayout({ width: 165, height: 230 })).toEqual({
      width: 136,
      aspectRatio: "165 / 230",
    })
  })

  it("gives extreme aspect ratios roughly the same image area as a square", () => {
    const square = getTrendingCardLayout({ width: 200, height: 200 })
    const landscape = getTrendingCardLayout({ width: 240, height: 80 })
    const portrait = getTrendingCardLayout({ width: 93, height: 280 })

    expect(square.width).toBe(160)
    // 3:1 landscape spreads the same area wide (CSS clamps render at 240)
    expect(landscape.width).toBe(277)
    // 1:3 portrait concentrates it narrow
    expect(portrait.width).toBe(92)

    const areaOf = (layout: { width: number; aspectRatio: string }) => {
      const [w, h] = layout.aspectRatio.split(" / ").map(Number)
      return layout.width * (layout.width * (h / w))
    }
    expect(areaOf(landscape)).toBeCloseTo(160 * 160, -3)
    expect(areaOf(portrait)).toBeCloseTo(160 * 160, -3)
  })

  it("falls back to a neutral square when dimensions are missing entirely", () => {
    expect(getTrendingCardLayout({ width: null, height: null })).toEqual({
      width: 160,
      aspectRatio: "1 / 1",
    })
    expect(
      getTrendingCardLayout({ width: undefined, height: undefined }),
    ).toEqual({
      width: 160,
      aspectRatio: "1 / 1",
    })
  })

  it("falls back to a neutral square when only one dimension is present", () => {
    // Regression: separate guards once yielded a 160px card with ratio 240/1
    expect(getTrendingCardLayout({ width: 240, height: null })).toEqual({
      width: 160,
      aspectRatio: "1 / 1",
    })
    expect(getTrendingCardLayout({ width: null, height: 280 })).toEqual({
      width: 160,
      aspectRatio: "1 / 1",
    })
  })

  it("treats zero dimensions as missing instead of dividing by zero", () => {
    expect(getTrendingCardLayout({ width: 0, height: 0 })).toEqual({
      width: 160,
      aspectRatio: "1 / 1",
    })
    expect(getTrendingCardLayout({ width: 240, height: 0 })).toEqual({
      width: 160,
      aspectRatio: "1 / 1",
    })
  })
})
