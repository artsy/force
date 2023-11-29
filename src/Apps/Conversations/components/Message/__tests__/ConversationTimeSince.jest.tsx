import { relativeDate } from "Apps/Conversations/components/Message/Utils/dateFormatters"

describe("relativeDate", () => {
  beforeAll(() => {
    const dateSpy = jest.spyOn(Date, "now")
    dateSpy.mockReturnValue(1594072253087)
    // EPOCH value for Mon Jul 06 2020 17:50:53 GMT-0400 (Eastern Daylight Time)
  })

  describe("when given time occured 30 seconds ago", () => {
    it("returns the correct string", () => {
      expect(relativeDate("2020-07-06T21:50:40.756Z")).toBe("Just now")
    })
  })

  describe("when given time occured 30 minutes ago", () => {
    it("returns the correct string", () => {
      expect(relativeDate("2020-07-06T21:20:40.756Z")).toBe("30 minutes ago")
    })
  })

  describe("when given time occured 1 hour ago", () => {
    it("returns the correct string", () => {
      expect(relativeDate("2020-07-06T20:50:40.756Z")).toBe("1 hour ago")
    })
  })

  describe("when given time occured 48 hours ago", () => {
    it("returns the correct string", () => {
      expect(relativeDate("2020-07-04T21:50:40.756Z")).toBe("2 days ago")
    })
  })

  describe("when given time occured 1 week ago", () => {
    it("returns the correct string", () => {
      expect(relativeDate("2020-06-28T21:50:40.756Z")).toBe("1 week ago")
    })
  })

  describe("when given time occured 2 weeks ago", () => {
    it("returns the correct string", () => {
      expect(relativeDate("2020-06-22T21:50:40.756Z")).toBe("2 weeks ago")
    })
  })

  describe("when given time occured 2 months ago", () => {
    it("returns the correct string", () => {
      expect(relativeDate("2020-05-06T21:50:40.756Z")).toBe("5/6/2020")
    })
  })
})
