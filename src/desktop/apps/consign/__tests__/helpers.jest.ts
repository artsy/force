import { formattedLocation } from "../helpers"

describe("helpers", () => {
  describe("formattedLocation", () => {
    it("returns the correct string when all fields exist", () => {
      expect(formattedLocation("Maine", "New York", "USA")).toEqual(
        "Maine, New York, USA"
      )
    })
    it("returns the correct string when some fields exist", () => {
      expect(formattedLocation("Maine", "USA")).toEqual("Maine, USA")
    })
    it("returns the correct string when no fields exist", () => {
      expect(formattedLocation(null, null, null)).toEqual("")
    })
  })
})
