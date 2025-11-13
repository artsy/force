import {
  getOffsetTopForSticky,
  type TSticky,
} from "Components/Sticky/StickyProvider"

describe("getOffsetTopForSticky", () => {
  it("returns 0 offset for all stickies when none are FIXED", () => {
    const stickies: TSticky[] = [
      { id: "example1", height: 80, status: "ORIGINAL" },
      { id: "example2", height: 200, status: "ORIGINAL" },
      { id: "example3", height: 15, status: "ORIGINAL" },
    ]

    expect(
      ["example1", "example2", "example3"].map(id => {
        return getOffsetTopForSticky({ id, stickies })
      })
    ).toEqual([0, 0, 0])
  })

  it("calculates offsets for FIXED stickies", () => {
    const stickies: TSticky[] = [
      { id: "example1", height: 80, status: "FIXED" },
      { id: "example2", height: 200, status: "FIXED" },
      { id: "example3", height: 15, status: "FIXED" },
      { id: "example4", height: 333, status: "FIXED" },
      { id: "example5", height: 66, status: "FIXED" },
    ]

    expect(
      ["example1", "example2", "example3", "example4", "example5"].map(id => {
        return getOffsetTopForSticky({ id, stickies })
      })
    ).toEqual([0, 80, 280, 295, 628])
  })

  it("excludes RELEASED stickies from offset calculation", () => {
    const stickies: TSticky[] = [
      { id: "example1", height: 80, status: "RELEASED" },
      { id: "example2", height: 200, status: "FIXED" },
      { id: "example3", height: 15, status: "FIXED" },
    ]

    expect(
      ["example1", "example2", "example3"].map(id => {
        return getOffsetTopForSticky({ id, stickies })
      })
    ).toEqual([0, 0, 200])
  })

  it("handles mixed statuses correctly", () => {
    const stickies: TSticky[] = [
      { id: "example1", height: 80, status: "FIXED" },
      { id: "example2", height: 200, status: "ORIGINAL" },
      { id: "example3", height: 15, status: "FIXED" },
      { id: "example4", height: 333, status: "RELEASED" },
      { id: "example5", height: 66, status: "FIXED" },
    ]

    // Only FIXED stickies contribute to offset
    // example1 (FIXED): offset = 0
    // example2 (ORIGINAL): offset = 0 (not FIXED)
    // example3 (FIXED): offset = 80 (example1's height)
    // example4 (RELEASED): offset = 0 (not FIXED)
    // example5 (FIXED): offset = 80 + 15 = 95 (example1 + example3 heights)
    expect(
      ["example1", "example2", "example3", "example4", "example5"].map(id => {
        return getOffsetTopForSticky({ id, stickies })
      })
    ).toEqual([0, 0, 80, 0, 95])
  })

  it("correctly recalculates when first sticky becomes RELEASED", () => {
    // Simulates the scenario where first sticky hits its bottomBoundary
    const stickies: TSticky[] = [
      { id: "sticky1", height: 100, status: "RELEASED" },
      { id: "sticky2", height: 50, status: "FIXED" },
    ]

    // sticky1 is RELEASED, so it doesn't contribute to sticky2's offset
    expect(getOffsetTopForSticky({ id: "sticky1", stickies })).toBe(0)
    expect(getOffsetTopForSticky({ id: "sticky2", stickies })).toBe(0)
  })
})
