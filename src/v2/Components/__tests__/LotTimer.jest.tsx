import { getTimerCopy } from "../LotTimer"

describe("getTimerCopy", () => {
  describe("when the sale is open", () => {
    const hasStarted = true
    describe("when the close date/time is more than 24 hrs before closing", () => {
      const time = { days: "01", hours: "23", minutes: "33", seconds: "00" }
      it("formats the timer to show 'xd xh", () => {
        expect(getTimerCopy(time, hasStarted).copy).toEqual("1d 23h")
        expect(getTimerCopy(time, hasStarted).color).toEqual("blue100")
      })
    })

    describe("when the close date/time is between 1 and 24 hours before closing", () => {
      const time = { days: "00", hours: "23", minutes: "33", seconds: "01" }

      it("formats the timer to show 'xh xm", () => {
        expect(getTimerCopy(time, hasStarted).copy).toEqual("23h 33m")
        expect(getTimerCopy(time, hasStarted).color).toEqual("blue100")
      })
    })

    describe("when the close date/time is less than 1 hour but greater than 2 min until close", () => {
      const time = { days: "00", hours: "00", minutes: "33", seconds: "01" }

      it("formats the timer to show 'xm xs", () => {
        expect(getTimerCopy(time, hasStarted).copy).toEqual("33m 1s")
        expect(getTimerCopy(time, hasStarted).color).toEqual("blue100")
      })
    })

    describe("when the close date/time is less than 2 min until close", () => {
      const time = { days: "00", hours: "00", minutes: "01", seconds: "59" }

      it("formats the timer to show 'xm xs", () => {
        expect(getTimerCopy(time, hasStarted).copy).toEqual("1m 59s")
        expect(getTimerCopy(time, hasStarted).color).toEqual("red100")
      })
    })
  })

  describe("when the sale is not yet open", () => {
    const hasStarted = false
    describe("when the open time is less than one day way", () => {
      const time = { days: "00", hours: "23", minutes: "01", seconds: "59" }
      it("shows '1 Day Until Bidding Starts'", () => {
        expect(getTimerCopy(time, hasStarted).copy).toEqual(
          "1 Day Until Bidding Starts"
        )
      })
    })

    describe("when the open time is between 1 and 2 days away", () => {
      const time = { days: "01", hours: "23", minutes: "01", seconds: "59" }
      it("shows '2 Days Until Bidding Starts'", () => {
        expect(getTimerCopy(time, hasStarted).copy).toEqual(
          "2 Days Until Bidding Starts"
        )
      })
    })

    describe("when the open time is more than one day away", () => {
      const time = { days: "02", hours: "23", minutes: "01", seconds: "59" }
      it("shows '2 Days Until Bidding Starts'", () => {
        expect(getTimerCopy(time, hasStarted).copy).toEqual(
          "3 Days Until Bidding Starts"
        )
      })
    })
  })
})
