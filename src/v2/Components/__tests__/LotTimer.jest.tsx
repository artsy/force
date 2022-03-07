import { getTimerCopy, getTimerLabelCopy } from "../LotTimer"

describe("getTimerCopy", () => {
  describe("when the close date/time is more than 24 hrs before closing", () => {
    const time = { days: "01", hours: "23", minutes: "33", seconds: "00" }
    it("formats the timer to show 'xd xh", () => {
      expect(getTimerCopy(time).copy).toEqual("1d 23h")
      expect(getTimerCopy(time).color).toEqual("blue100")
    })
  })

  describe("when the close date/time is between 1 and 24 hours before closing", () => {
    const time = { days: "00", hours: "23", minutes: "33", seconds: "01" }

    it("formats the timer to show 'xh xm", () => {
      expect(getTimerCopy(time).copy).toEqual("23h 33m")
      expect(getTimerCopy(time).color).toEqual("blue100")
    })
  })

  describe("when the close date/time is less than 1 hour but greater than 2 min until close", () => {
    const time = { days: "00", hours: "00", minutes: "33", seconds: "01" }

    it("formats the timer to show 'xm xs", () => {
      expect(getTimerCopy(time).copy).toEqual("33m 1s")
      expect(getTimerCopy(time).color).toEqual("blue100")
    })
  })

  describe("when the close date/time is less than 2 min until close", () => {
    const time = { days: "00", hours: "00", minutes: "01", seconds: "59" }

    it("formats the timer to show 'xm xs", () => {
      expect(getTimerCopy(time).copy).toEqual("1m 59s")
      expect(getTimerCopy(time).color).toEqual("red100")
    })
  })
})

describe("getTimerLabelCopy", () => {
  describe("when the sale is open", () => {
    const endDate = "2022-03-06T12:37:35-05:00"
    const startDate = "2022-03-00T12:37:35-05:00"
    const hasStarted = true
    const hasEnded = false

    it("formats the label to show 'Closes x date/time'", () => {
      expect(
        getTimerLabelCopy(endDate, startDate, hasStarted, hasEnded)
      ).toEqual("Closes Mar 6, 5:37pm")

      // expect(getTimerLabelCopy(endDate)).toEqual("Closes March 6, 12:37pm EST")
    })
  })

  describe("when the sale is not yet open", () => {
    const endDate = "2022-03-10T12:37:35-05:00"
    const startDate = "2022-03-08T12:37:35-05:00"
    const hasEnded = false
    const hasStarted = false
    it("formats the label to show 'x date/time'", () => {
      expect(
        getTimerLabelCopy(endDate, startDate, hasStarted, hasEnded)
      ).toEqual("Mar 8, 5:37pm")

      // expect(getTimerLabelCopy(endDate)).toEqual("March 6, 12:37pm EST")
    })
  })

  describe("when the sale is closed", () => {
    const endDate = "2022-03-03T12:37:35-05:00"
    const startDate = "2022-03-02T12:37:35-05:00"
    const hasEnded = true
    const hasStarted = true
    it("formats the label to show 'Closed'", () => {
      expect(
        getTimerLabelCopy(endDate, startDate, hasStarted, hasEnded)
      ).toEqual("Closed")
    })
  })
})
