import {
  type TSticky,
  getOffsetTopForSticky,
} from "Components/Sticky/StickyProvider"

describe("getOffsetTopForSticky", () => {
  it("returns 0 offset for all stickies when none are FIXED (no target)", () => {
    const stickies: TSticky[] = [
      { id: "example1", height: 80, status: "ORIGINAL" },
      { id: "example2", height: 200, status: "ORIGINAL" },
      { id: "example3", height: 15, status: "ORIGINAL" },
    ]

    expect(
      ["example1", "example2", "example3"].map(id => {
        return getOffsetTopForSticky({ id, stickies, targetEl: null })
      }),
    ).toEqual([0, 0, 0])
  })

  it("calculates offsets for FIXED stickies (no target)", () => {
    const stickies: TSticky[] = [
      { id: "example1", height: 80, status: "FIXED" },
      { id: "example2", height: 200, status: "FIXED" },
      { id: "example3", height: 15, status: "FIXED" },
      { id: "example4", height: 333, status: "FIXED" },
      { id: "example5", height: 66, status: "FIXED" },
    ]

    expect(
      ["example1", "example2", "example3", "example4", "example5"].map(id => {
        return getOffsetTopForSticky({ id, stickies, targetEl: null })
      }),
    ).toEqual([0, 80, 280, 295, 628])
  })

  it("excludes RELEASED stickies from offset calculation (no target)", () => {
    const stickies: TSticky[] = [
      { id: "example1", height: 80, status: "RELEASED" },
      { id: "example2", height: 200, status: "FIXED" },
      { id: "example3", height: 15, status: "FIXED" },
    ]

    expect(
      ["example1", "example2", "example3"].map(id => {
        return getOffsetTopForSticky({ id, stickies, targetEl: null })
      }),
    ).toEqual([0, 0, 200])
  })

  it("handles mixed statuses correctly (no target)", () => {
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
        return getOffsetTopForSticky({ id, stickies, targetEl: null })
      }),
    ).toEqual([0, 0, 80, 0, 95])
  })

  it("correctly recalculates when first sticky becomes RELEASED (no target)", () => {
    // Simulates the scenario where first sticky hits its bottomBoundary
    const stickies: TSticky[] = [
      { id: "sticky1", height: 100, status: "RELEASED" },
      { id: "sticky2", height: 50, status: "FIXED" },
    ]

    // sticky1 is RELEASED, so it doesn't contribute to sticky2's offset
    expect(
      getOffsetTopForSticky({ id: "sticky1", stickies, targetEl: null }),
    ).toBe(0)
    expect(
      getOffsetTopForSticky({ id: "sticky2", stickies, targetEl: null }),
    ).toBe(0)
  })

  describe("with target element", () => {
    beforeEach(() => {
      // Mock window.scrollY
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: 0,
      })

      // Mock DOM structure for testing
      document.body.innerHTML = `
        <div id="JUMP--sticky1"></div>
        <div id="JUMP--sticky2"></div>
        <div id="JUMP--target"></div>
      `
    })

    it("calculates offset based on stickies above target", () => {
      const stickies: TSticky[] = [
        { id: "sticky1", height: 80, status: "ORIGINAL" },
        { id: "sticky2", height: 200, status: "ORIGINAL" },
      ]

      const sticky1El = document.querySelector("#JUMP--sticky1") as HTMLElement
      const sticky2El = document.querySelector("#JUMP--sticky2") as HTMLElement
      const targetEl = document.querySelector("#JUMP--target") as HTMLElement

      // Mock getBoundingClientRect for elements
      sticky1El.getBoundingClientRect = jest.fn(() => ({
        top: 100,
        bottom: 180,
        left: 0,
        right: 0,
        width: 0,
        height: 80,
        x: 0,
        y: 100,
        toJSON: () => {},
      }))

      sticky2El.getBoundingClientRect = jest.fn(() => ({
        top: 300,
        bottom: 500,
        left: 0,
        right: 0,
        width: 0,
        height: 200,
        x: 0,
        y: 300,
        toJSON: () => {},
      }))

      targetEl.getBoundingClientRect = jest.fn(() => ({
        top: 600,
        bottom: 650,
        left: 0,
        right: 0,
        width: 0,
        height: 50,
        x: 0,
        y: 600,
        toJSON: () => {},
      }))

      // Both stickies are above the target, so they will be stuck
      const offset = getOffsetTopForSticky({
        id: "target",
        stickies,
        targetEl,
      })

      // Should sum up heights of both stickies
      expect(offset).toBe(280) // 80 + 200
    })

    it("excludes stickies below target", () => {
      const stickies: TSticky[] = [
        { id: "sticky1", height: 80, status: "ORIGINAL" },
        { id: "target", height: 50, status: "ORIGINAL" },
        { id: "sticky2", height: 200, status: "ORIGINAL" },
      ]

      const sticky1El = document.querySelector("#JUMP--sticky1") as HTMLElement
      const sticky2El = document.querySelector("#JUMP--sticky2") as HTMLElement
      const targetEl = document.querySelector("#JUMP--target") as HTMLElement

      // Mock getBoundingClientRect - sticky1 above, target in middle, sticky2 below
      sticky1El.getBoundingClientRect = jest.fn(() => ({
        top: 100,
        bottom: 180,
        left: 0,
        right: 0,
        width: 0,
        height: 80,
        x: 0,
        y: 100,
        toJSON: () => {},
      }))

      targetEl.getBoundingClientRect = jest.fn(() => ({
        top: 300,
        bottom: 350,
        left: 0,
        right: 0,
        width: 0,
        height: 50,
        x: 0,
        y: 300,
        toJSON: () => {},
      }))

      sticky2El.getBoundingClientRect = jest.fn(() => ({
        top: 500,
        bottom: 700,
        left: 0,
        right: 0,
        width: 0,
        height: 200,
        x: 0,
        y: 500,
        toJSON: () => {},
      }))

      // Only sticky1 is above the target
      const offset = getOffsetTopForSticky({
        id: "target",
        stickies,
        targetEl,
      })

      expect(offset).toBe(80) // Only sticky1's height
    })

    it("excludes the target sticky itself", () => {
      const stickies: TSticky[] = [
        { id: "sticky1", height: 80, status: "ORIGINAL" },
        { id: "sticky2", height: 200, status: "ORIGINAL" },
        { id: "target", height: 50, status: "ORIGINAL" },
      ]

      const sticky1El = document.querySelector("#JUMP--sticky1") as HTMLElement
      const sticky2El = document.querySelector("#JUMP--sticky2") as HTMLElement
      const targetEl = document.querySelector("#JUMP--target") as HTMLElement

      // Mock getBoundingClientRect - all stickies above target
      sticky1El.getBoundingClientRect = jest.fn(() => ({
        top: 100,
        bottom: 180,
        left: 0,
        right: 0,
        width: 0,
        height: 80,
        x: 0,
        y: 100,
        toJSON: () => {},
      }))

      sticky2El.getBoundingClientRect = jest.fn(() => ({
        top: 300,
        bottom: 500,
        left: 0,
        right: 0,
        width: 0,
        height: 200,
        x: 0,
        y: 300,
        toJSON: () => {},
      }))

      targetEl.getBoundingClientRect = jest.fn(() => ({
        top: 600,
        bottom: 650,
        left: 0,
        right: 0,
        width: 0,
        height: 50,
        x: 0,
        y: 600,
        toJSON: () => {},
      }))

      // Should not include the target sticky in the calculation
      const offset = getOffsetTopForSticky({
        id: "target",
        stickies,
        targetEl,
      })

      expect(offset).toBe(280) // sticky1 + sticky2, excluding target itself
    })
  })
})
