import {
  getOffsetTopForSticky,
  TSticky,
} from "Components/Sticky/StickyProvider"

const EXAMPLE_STICKIES: TSticky[] = [
  { id: "example1", height: 80, status: "ORIGINAL" },
  { id: "example2", height: 200, status: "ORIGINAL" },
  { id: "example3", height: 15, status: "ORIGINAL" },
  { id: "example4", height: 333, status: "ORIGINAL" },
  { id: "example5", height: 66, status: "ORIGINAL" },
]

describe("getOffsetTopForSticky", () => {
  it("calculates offsets for various stickies", () => {
    expect(
      ["example1", "example2", "example3", "example4", "example5"].map(id => {
        return getOffsetTopForSticky({ id, stickies: EXAMPLE_STICKIES })
      })
    ).toEqual([0, 80, 280, 295, 628])
  })
})
