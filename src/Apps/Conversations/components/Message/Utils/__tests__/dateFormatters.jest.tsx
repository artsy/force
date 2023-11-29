import { DateTime } from "luxon"
import {
  daysSinceDate,
  fromToday,
  exactDate,
  minutesSinceDate,
  relativeDate,
} from "Apps/Conversations/components/Message/Utils/dateFormatters"

describe("dateFormatters", () => {
  describe("daysSinceDate", () => {
    it("should return the correct number of days since the given date", () => {
      const currentDate = DateTime.now()
      expect(daysSinceDate(currentDate)).toBe(0)
    })
  })

  describe("fromToday", () => {
    it("should return true if the given time is today, otherwise false", () => {
      const currentDate = DateTime.now()
      expect(fromToday(currentDate)).toBe(true)
    })
  })

  describe("exactDate", () => {
    it("should return the formatted date based on the given time", () => {
      const currentDate = DateTime.now()
      expect(exactDate(currentDate.toISO())).toContain("Today")
    })
  })

  describe("minutesSinceDate", () => {
    it("should return the correct number of minutes since the given date", () => {
      const currentDate = DateTime.now()
      expect(minutesSinceDate(currentDate)).toBe(0)
    })
  })

  describe("relativeDate", () => {
    it("should return the relative date string based on the given time", () => {
      const currentDate = DateTime.now()
      expect(relativeDate(currentDate.toISO())).toContain("Just now")
    })
  })
})
