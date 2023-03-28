import { chunk, compound, paginateCarousel } from "Components/Carousel/paginate"

describe("compound", () => {
  it("sums correctly (1)", () => {
    expect(compound([1, 1, 1, 1])).toStrictEqual([1, 2, 3, 4])
  })

  it("sums correctly (2)", () => {
    expect(compound([1, 2, 3, 4])).toStrictEqual([1, 3, 6, 10])
  })

  it("sums correctly (3)", () => {
    expect(compound([-1, 2, -3, 4])).toStrictEqual([-1, 1, -2, 2])
  })
})

describe("chunk", () => {
  it("chunks correctly (1)", () => {
    expect(chunk({ viewport: 1000, values: [500, 500, 500] })).toStrictEqual([
      1000,
      500,
    ])
  })

  it("chunks correctly (2)", () => {
    expect(chunk({ viewport: 999, values: [500, 500, 500] })).toStrictEqual([
      500,
      500,
      500,
    ])
  })

  it("chunks correctly (3)", () => {
    expect(chunk({ viewport: 500, values: [500, 500, 500] })).toStrictEqual([
      500,
      500,
      500,
    ])
  })

  it("chunks correctly (4)", () => {
    expect(chunk({ viewport: 1000, values: [1000, 500, 500] })).toStrictEqual([
      1000,
      1000,
    ])
  })

  it("chunks correctly (5)", () => {
    expect(
      chunk({ viewport: 333, values: [100, 200, 300, 100, 200, 300] })
    ).toStrictEqual([300, 300, 300, 300])
  })

  it("chunks correctly (6)", () => {
    expect(
      chunk({ viewport: 100, values: [100, 200, 300, 100, 200, 300] })
    ).toStrictEqual([100, 200, 300, 100, 200, 300])
  })
})

describe("paginate", () => {
  it("returns a single page of 0 when the widths fit within the viewport", () => {
    expect(
      paginateCarousel({ viewport: 1000, values: [100, 100, 100, 100, 100] })
    ).toStrictEqual([0])
  })

  it("returns multiple pages (1)", () => {
    expect(
      paginateCarousel({
        viewport: 1000,
        values: [
          // 0
          1000,
          // 1000
          1000,
        ],
      })
    ).toStrictEqual([0, 1000])
  })

  it("returns multiple pages (2)", () => {
    expect(
      paginateCarousel({
        viewport: 1000,
        values: [
          // 0
          500,
          500,
          // 1000
          500,
          500,
        ],
      })
    ).toStrictEqual([0, 1000])
  })

  it("returns multiple pages (3)", () => {
    expect(
      paginateCarousel({
        viewport: 1000,
        values: [
          // 0
          500,
          500,
          // 1000
          500,
          500,
          // 2000
          500,
          500,
        ],
      })
    ).toStrictEqual([0, 1000, 2000])
  })

  it("returns multiple pages (4)", () => {
    expect(
      paginateCarousel({
        viewport: 1000,
        values: [
          // 0
          1000,
          // 1000
          1000,
          // 2000
          1000,
          // 3000
          1000,
          // 4000
          1000,
        ],
      })
    ).toStrictEqual([0, 1000, 2000, 3000, 4000])
  })

  it("handles the last page remainder (1)", () => {
    expect(
      paginateCarousel({
        viewport: 1000,
        values: [
          // 0
          1000,
          // 1250
          250,
        ],
      })
    ).toStrictEqual([0, 250])
  })

  it("handles the last page remainder (2)", () => {
    expect(
      paginateCarousel({ viewport: 880, values: [333, 333, 333, 333, 333] })
    ).toStrictEqual([0, 666, 785])
  })
})
