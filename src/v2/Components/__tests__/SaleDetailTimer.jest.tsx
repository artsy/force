import { getTimerCopy } from "../SaleDetailTimer"
import moment from "moment"

jest.useFakeTimers()

jest.mock("v2/Utils/getCurrentTimeAsIsoString")

require("v2/Utils/getCurrentTimeAsIsoString").__setCurrentTime(
  "2022-03-21T20:22:32.000Z"
)

describe("getTimerCopy", () => {
  describe("when the sale is open", () => {
    describe("when the close date/time is more than 24 hrs before closing", () => {
      const time = { days: "1", hours: "4", minutes: "00", seconds: "00" }
      const startAt = moment().subtract(1, "hours")
      const endAt = moment().add(28, "hours")
      const endedAt = null
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, startAt, endAt, endedAt).copy).toEqual(
          "2 Days Until Bidding Ends"
        )
        expect(getTimerCopy(time, startAt, endAt, endedAt).color).toEqual(
          "blue100"
        )
      })
    })

    describe("when the close date/time is less than 24 hours before closing", () => {
      const time = { days: "0", hours: "23", minutes: "33", seconds: "00" }
      const startAt = moment().subtract(1, "hours")
      const endAt = moment().add(23, "hours")
      const endedAt = null
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, startAt, endAt, endedAt).copy).toEqual(
          "23h 33m Until Bidding Ends"
        )
        expect(getTimerCopy(time, startAt, endAt, endedAt).color).toEqual(
          "red100"
        )
      })
    })

    describe("when the close date/time is less than 1 hours before closing", () => {
      const time = { days: "0", hours: "0", minutes: "58", seconds: "23" }
      const startAt = moment().subtract(1, "hours")
      const endAt = moment().add(58, "minutes")
      const endedAt = null
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, startAt, endAt, endedAt).copy).toEqual(
          "58m 23s Until Bidding Ends"
        )
        expect(getTimerCopy(time, startAt, endAt, endedAt).color).toEqual(
          "red100"
        )
      })
    })

    describe("when the sale has begun closing", () => {
      const time = { days: "0", hours: "0", minutes: "0", seconds: "0" }
      const startAt = moment().subtract(2, "days")
      const endAt = moment().subtract(10, "minutes")
      const endedAt = null
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, startAt, endAt, endedAt).copy).toEqual(
          "Lots are closing"
        )
        expect(getTimerCopy(time, startAt, endAt, endedAt).color).toEqual(
          "red100"
        )
      })
    })
  })

  describe("when the sale is not yet open", () => {
    describe("when the sale has is more than 1 day away", () => {
      const time = { days: "3", hours: "0", minutes: "0", seconds: "0" }
      const startAt = moment().add(3, "days")
      const endAt = moment().add(10, "days")
      const endedAt = null
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, startAt, endAt, endedAt).copy).toEqual(
          "3 Days Until Bidding Starts"
        )
        expect(getTimerCopy(time, startAt, endAt, endedAt).color).toEqual(
          "blue100"
        )
      })
    })

    describe("when the sale has is less than 1 day away", () => {
      const time = { days: "0", hours: "20", minutes: "0", seconds: "0" }
      const startAt = moment().add(20, "hours")
      const endAt = moment().add(10, "days")
      const endedAt = null
      it("formats the timer correctly", () => {
        expect(getTimerCopy(time, startAt, endAt, endedAt).copy).toEqual(
          "Bidding Starts Today"
        )
        expect(getTimerCopy(time, startAt, endAt, endedAt).color).toEqual(
          "blue100"
        )
      })
    })
  })

  describe("sale has closed", () => {
    const time = { days: "3", hours: "0", minutes: "0", seconds: "0" }
    const startAt = moment().subtract(10, "days")
    const endAt = moment().subtract(3, "days")
    const endedAt = moment().subtract(2, "days")
    it("formats the timer correctly", () => {
      expect(getTimerCopy(time, startAt, endAt, endedAt).copy).toEqual("")
    })
  })
})
