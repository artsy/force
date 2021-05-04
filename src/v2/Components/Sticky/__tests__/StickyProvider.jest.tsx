import { getOffsetTopForSticky } from "../StickyProvider"

const EXAMPLE_STICKIES = [
  { id: "example1", height: 80 },
  { id: "example2", height: 200 },
  { id: "example3", height: 15 },
  { id: "example4", height: 333 },
  { id: "example5", height: 66 },
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
