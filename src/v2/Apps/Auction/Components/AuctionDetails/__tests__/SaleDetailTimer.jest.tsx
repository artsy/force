import { getTimerCopy } from "../SaleDetailTimer"

describe("getTimerCopy", () => {
  describe("when the sale is open", () => {
    describe("when the close date/time is more than 24 hrs before closing", () => {
      const time = { days: "1", hours: "4", minutes: "00", seconds: "00" }
      const hasStarted = true
      const hasEnded = false
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, hasStarted, hasEnded).copy).toEqual(
          "2 Days Until Bidding Ends"
        )
        expect(getTimerCopy(time, hasStarted, hasEnded).color).toEqual(
          "blue100"
        )
      })
    })

    describe("when the close date/time is less than 24 hours before closing", () => {
      const time = { days: "0", hours: "23", minutes: "33", seconds: "00" }
      const hasStarted = true
      const hasEnded = false
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, hasStarted, hasEnded).copy).toEqual(
          "23h 33m Until Bidding Ends"
        )
        expect(getTimerCopy(time, hasStarted, hasEnded).color).toEqual("red100")
      })
    })

    describe("when the close date/time is less than 1 hours before closing", () => {
      const time = { days: "0", hours: "0", minutes: "58", seconds: "23" }
      const hasStarted = true
      const hasEnded = false
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, hasStarted, hasEnded).copy).toEqual(
          "58m 23s Until Bidding Ends"
        )
        expect(getTimerCopy(time, hasStarted, hasEnded).color).toEqual("red100")
      })
    })

    describe("when the sale has begun closing", () => {
      const time = { days: "0", hours: "0", minutes: "0", seconds: "0" }
      const hasStarted = true
      const hasEnded = true
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, hasStarted, hasEnded).copy).toEqual(
          "Lots are closing"
        )
        expect(getTimerCopy(time, hasStarted, hasEnded).color).toEqual("red100")
      })
    })
  })

  describe("when the sale is not yet open", () => {
    describe("when the sale is more than 1 day away", () => {
      const time = { days: "3", hours: "0", minutes: "0", seconds: "0" }
      const hasStarted = false
      const hasEnded = false
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, hasStarted, hasEnded).copy).toEqual(
          "3 Days Until Bidding Starts"
        )
        expect(getTimerCopy(time, hasStarted, hasEnded).color).toEqual(
          "blue100"
        )
      })
    })

    describe("when the sale is less than 1 day away", () => {
      const time = { days: "0", hours: "20", minutes: "0", seconds: "0" }
      const hasStarted = false
      const hasEnded = false
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, hasStarted, hasEnded).copy).toEqual(
          "Bidding Starts Today"
        )
        expect(getTimerCopy(time, hasStarted, hasEnded).color).toEqual(
          "blue100"
        )
      })
    })
  })
})
