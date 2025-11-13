import { formatOpeningHours } from "../formatOpeningHours"

describe("formatOpeningHours", () => {
  describe("closed hours", () => {
    it("should return empty string when hours indicate closed", () => {
      expect(
        formatOpeningHours([{ days: "Monday, Sunday", hours: "Closed" }])
      ).toBe("")
      expect(formatOpeningHours([{ days: "Monday", hours: "closed" }])).toBe("")
      expect(formatOpeningHours([{ days: "Monday", hours: "CLOSED" }])).toBe("")
    })
  })

  describe("day range formatting", () => {
    it("should format day ranges with em dash", () => {
      const result = formatOpeningHours([
        {
          days: "Tuesday–Saturday",
          hours: "10am–6pm",
        },
      ])
      expect(result).toBe("Tu-Sa 10:00-18:00")
    })

    it("should format day ranges with hyphen", () => {
      const result = formatOpeningHours([
        {
          days: "Monday-Friday",
          hours: "9am-5pm",
        },
      ])
      expect(result).toBe("Mo-Fr 09:00-17:00")
    })

    it("should format weekends", () => {
      const result = formatOpeningHours([
        {
          days: "Saturday-Sunday",
          hours: "11am-4pm",
        },
      ])
      expect(result).toBe("Sa-Su 11:00-16:00")
    })
  })

  describe("comma-separated days", () => {
    it("should format comma-separated days", () => {
      const result = formatOpeningHours([
        {
          days: "Monday, Wednesday, Friday",
          hours: "9am-5pm",
        },
      ])
      expect(result).toBe("Mo,We,Fr 09:00-17:00")
    })

    it("should format weekend days", () => {
      const result = formatOpeningHours([
        {
          days: "Saturday, Sunday",
          hours: "10am-2pm",
        },
      ])
      expect(result).toBe("Sa,Su 10:00-14:00")
    })
  })

  describe("time formatting", () => {
    it("should convert 12-hour to 24-hour format", () => {
      expect(formatOpeningHours([{ days: "Monday", hours: "9am-5pm" }])).toBe(
        "Mo 09:00-17:00"
      )
      expect(formatOpeningHours([{ days: "Tuesday", hours: "10am-6pm" }])).toBe(
        "Tu 10:00-18:00"
      )
      expect(
        formatOpeningHours([{ days: "Wednesday", hours: "1pm-9pm" }])
      ).toBe("We 13:00-21:00")
    })

    it("should handle noon and midnight correctly", () => {
      expect(formatOpeningHours([{ days: "Monday", hours: "12am-12pm" }])).toBe(
        "Mo 00:00-12:00"
      )
      expect(
        formatOpeningHours([{ days: "Tuesday", hours: "12pm-11pm" }])
      ).toBe("Tu 12:00-23:00")
    })

    it("should handle times with minutes", () => {
      expect(
        formatOpeningHours([{ days: "Monday", hours: "9:30am-5:30pm" }])
      ).toBe("Mo 09:30-17:30")
      expect(
        formatOpeningHours([{ days: "Tuesday", hours: "10:15am-6:45pm" }])
      ).toBe("Tu 10:15-18:45")
    })
  })

  describe("multiple time ranges", () => {
    it("should format multiple time ranges separated by commas", () => {
      const result = formatOpeningHours([
        {
          days: "Tuesday–Saturday",
          hours: "10am–1pm, 2pm–6pm",
        },
      ])
      expect(result).toBe("Tu-Sa 10:00-13:00,14:00-18:00")
    })

    it("should handle mixed time formats", () => {
      const result = formatOpeningHours([
        {
          days: "Monday, Wednesday",
          hours: "9am–12pm, 1:30pm–5pm",
        },
      ])
      expect(result).toBe("Mo,We 09:00-12:00,13:30-17:00")
    })
  })

  describe("multiple schedules", () => {
    it("should handle multiple schedule objects", () => {
      const result = formatOpeningHours([
        { days: "Monday-Friday", hours: "9am-5pm" },
        { days: "Saturday", hours: "10am-2pm" },
      ])
      expect(result).toBe("Mo-Fr 09:00-17:00 Sa 10:00-14:00")
    })

    it("should filter out closed schedules", () => {
      const result = formatOpeningHours([
        { days: "Monday-Friday", hours: "9am-5pm" },
        { days: "Saturday", hours: "Closed" },
        { days: "Sunday", hours: "11am-3pm" },
      ])
      expect(result).toBe("Mo-Fr 09:00-17:00 Su 11:00-15:00")
    })

    it("should return empty string when all schedules are closed", () => {
      const result = formatOpeningHours([
        { days: "Monday", hours: "Closed" },
        { days: "Tuesday", hours: "closed" },
      ])
      expect(result).toBe("")
    })
  })

  describe("edge cases", () => {
    it("should handle all days of the week", () => {
      const result = formatOpeningHours([
        {
          days: "Monday-Sunday",
          hours: "9am-9pm",
        },
      ])
      expect(result).toBe("Mo-Su 09:00-21:00")
    })

    it("should handle case insensitive day names", () => {
      const result = formatOpeningHours([
        {
          days: "MONDAY, FRIDAY",
          hours: "9AM-5PM",
        },
      ])
      expect(result).toBe("Mo,Fr 09:00-17:00")
    })

    it("should handle mixed case", () => {
      const result = formatOpeningHours([
        {
          days: "Monday, WednesdaY, Friday",
          hours: "9Am-5Pm",
        },
      ])
      expect(result).toBe("Mo,We,Fr 09:00-17:00")
    })

    it("should handle empty array", () => {
      const result = formatOpeningHours([])
      expect(result).toBe("")
    })
  })

  describe("real-world examples", () => {
    it("should handle the provided example inputs", () => {
      // Example from the comment: mixed closed and open schedules
      const result = formatOpeningHours([
        { days: "Monday, Sunday", hours: "Closed" },
        { days: "Tuesday–Saturday", hours: "10am–1pm, 2pm–6pm" },
      ])
      expect(result).toBe("Tu-Sa 10:00-13:00,14:00-18:00")
    })

    it("should handle typical gallery schedule", () => {
      const result = formatOpeningHours([
        { days: "Monday", hours: "Closed" },
        { days: "Tuesday-Friday", hours: "10am-6pm" },
        { days: "Saturday-Sunday", hours: "10am-5pm" },
      ])
      expect(result).toBe("Tu-Fr 10:00-18:00 Sa-Su 10:00-17:00")
    })
  })
})
