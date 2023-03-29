import { buildScrollBar } from "Components/Shelf/ShelfScrollBar"

describe("buildScrollBar", () => {
  const DOM_VALUES = {
    trackWidth: 800,
    scrollWidth: 1600,
    clientWidth: 1000,
  }

  describe("overflowing", () => {
    it("returns the correct values when nothing has been scrolled", () => {
      const res = buildScrollBar({ ...DOM_VALUES, scrollLeft: 0 })

      expect(res).toEqual({
        requiresScrolling: true,
        progress: 0,
        percentageVisible: 0.625,
        percentageOffset: 0,
        thumbWidth: 500,
        thumbOffset: 0,
      })
    })

    it("returns the correct values when scrolled halfway", () => {
      const res = buildScrollBar({ ...DOM_VALUES, scrollLeft: 300 })

      expect(res).toEqual({
        percentageOffset: 0.5,
        percentageVisible: 0.625,
        progress: 50,
        requiresScrolling: true,
        thumbOffset: 150,
        thumbWidth: 500,
      })
    })

    it("returns the correct values when scrolled to the end", () => {
      const res = buildScrollBar({ ...DOM_VALUES, scrollLeft: 600 })

      expect(res).toEqual({
        percentageOffset: 1,
        percentageVisible: 0.625,
        progress: 100,
        requiresScrolling: true,
        thumbOffset: 300,
        thumbWidth: 500,
      })
    })
  })

  describe("not overflowing", () => {
    it("returns the correct values", () => {
      const res = buildScrollBar({
        ...DOM_VALUES,
        scrollLeft: 0,
        // If there is nothing to scroll the scrollWidth will be as wide as the
        // viewport because it will naturally just fill it out.
        scrollWidth: 1000,
      })

      expect(res).toEqual({
        percentageOffset: 0,
        percentageVisible: 1,
        progress: 0,
        requiresScrolling: false,
        thumbOffset: 0,
        // Will be equal to the track width itself
        thumbWidth: 800,
      })
    })
  })
})
