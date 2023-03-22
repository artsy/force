import { getSaleOrLotTimerInfo } from "Utils/getSaleOrLotTimerInfo"

describe("getSaleOrLotTimerInfo", () => {
  describe("when the timer info is on the sale", () => {
    const isSaleInfo = true
    describe("when the sale is open", () => {
      const hasStarted = true
      describe("when the close date/time is more than 24 hrs before closing", () => {
        const time = { days: "1", hours: "4", minutes: "00", seconds: "00" }
        const lotsAreClosing = false
        it("formats the timer correctly", () => {
          const saleTimerInfo = getSaleOrLotTimerInfo(time, {
            hasStarted,
            lotsAreClosing,
            isSaleInfo,
          })
          expect(saleTimerInfo.copy).toEqual("2 Days Until Lots Start Closing")
          expect(saleTimerInfo.color).toEqual("blue100")
        })
      })

      describe("when the close date/time is less than 24 hours before closing", () => {
        const time = { days: "0", hours: "23", minutes: "33", seconds: "00" }
        const hasStarted = true
        it("formats the timer correctly", () => {
          const saleTimerInfo = getSaleOrLotTimerInfo(time, {
            hasStarted,
            isSaleInfo,
          })
          expect(saleTimerInfo.copy).toEqual("23h 33m Until Lots Start Closing")
          expect(saleTimerInfo.color).toEqual("red100")
        })
      })

      describe("when the close date/time is less than 1 hours before closing", () => {
        const time = { days: "0", hours: "0", minutes: "58", seconds: "23" }
        const lotsAreClosing = false
        it("formats the timer correctly", () => {
          const saleTimerInfo = getSaleOrLotTimerInfo(time, {
            hasStarted,
            lotsAreClosing,
            isSaleInfo,
          })
          expect(saleTimerInfo.copy).toEqual("58m 23s Until Lots Start Closing")
          expect(saleTimerInfo.color).toEqual("red100")
        })
      })

      describe("when the sale has begun closing", () => {
        const time = { days: "0", hours: "0", minutes: "0", seconds: "0" }
        const lotsAreClosing = true
        it("formats the timer correctly", () => {
          const saleTimerInfo = getSaleOrLotTimerInfo(time, {
            hasStarted,
            lotsAreClosing,
            isSaleInfo,
          })
          expect(saleTimerInfo.copy).toEqual("Lots are closing")
          expect(saleTimerInfo.color).toEqual("red100")
        })
      })
    })

    describe("when the sale is not yet open", () => {
      describe("when the sale is more than 1 day away", () => {
        const time = { days: "3", hours: "0", minutes: "0", seconds: "0" }
        const hasStarted = false
        const lotsAreClosing = false
        it("formats the timer correctly", () => {
          const saleTimerInfo = getSaleOrLotTimerInfo(time, {
            hasStarted,
            lotsAreClosing,
            isSaleInfo,
          })
          expect(saleTimerInfo.copy).toEqual("3 Days Until Bidding Starts")
          expect(saleTimerInfo.color).toEqual("blue100")
        })
      })

      describe("when the sale is less than 1 day away", () => {
        const time = { days: "0", hours: "20", minutes: "0", seconds: "0" }
        const hasStarted = false
        const lotsAreClosing = false
        it("formats the timer correctly", () => {
          const saleTimerInfo = getSaleOrLotTimerInfo(time, {
            hasStarted,
            lotsAreClosing,
            isSaleInfo,
          })
          expect(saleTimerInfo.copy).toEqual("20h 0m Until Bidding Starts")
          expect(saleTimerInfo.color).toEqual("blue100")
        })
      })
    })

    describe("when the sale has popcorn bidding", () => {
      const time = { days: "3", hours: "0", minutes: "2", seconds: "0" }
      const hasStarted = true
      const lotsAreClosing = false
      const extendedBiddingEndAt = "2"
      it("formats the timer correctly", () => {
        const saleTimerInfo = getSaleOrLotTimerInfo(time, {
          hasStarted,
          lotsAreClosing,
          isSaleInfo,
          extendedBiddingEndAt,
        })
        expect(saleTimerInfo.copy).toEqual("Extended: 2m 0s")
        expect(saleTimerInfo.color).toEqual("red100")
      })
    })
  })

  describe("when the timer is on the lot", () => {
    describe("when the sale is open", () => {
      const hasStarted = true
      describe("when the close date/time is more than 24 hrs before closing", () => {
        const time = { days: "01", hours: "23", minutes: "33", seconds: "00" }
        it("formats the timer to show 'xd xh' in blue", () => {
          const lotTimerInfo = getSaleOrLotTimerInfo(time, { hasStarted })
          expect(lotTimerInfo.copy).toEqual("in 1d 23h")
          expect(lotTimerInfo.color).toEqual("blue100")
        })
      })

      describe("when the close date/time is between 1 and 24 hours before closing", () => {
        const time = { days: "00", hours: "23", minutes: "33", seconds: "01" }

        it("formats the timer to show 'xh xm' in blue", () => {
          const lotTimerInfo = getSaleOrLotTimerInfo(time, { hasStarted })
          expect(lotTimerInfo.copy).toEqual("in 23h 33m")
          expect(lotTimerInfo.color).toEqual("blue100")
        })
      })

      describe("when the timer is on the lot page and not the lot grid", () => {
        describe("when the close date/time is minutes until close", () => {
          const time = {
            days: "00",
            hours: "00",
            minutes: "10",
            seconds: "59",
          }

          it("formats the timer to show 'xm xs' in red", () => {
            const lotTimerInfo = getSaleOrLotTimerInfo(time, { hasStarted })
            expect(lotTimerInfo.copy).toEqual("in 10m 59s")
            expect(lotTimerInfo.color).toEqual("red100")
          })
        })

        describe("when the close date/time is less than 1 min from close", () => {
          const time = {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "59",
          }

          it("formats the timer to show 'xm xs' in red", () => {
            const lotTimerInfo = getSaleOrLotTimerInfo(time, { hasStarted })
            expect(lotTimerInfo.copy).toEqual("in 0m 59s")
            expect(lotTimerInfo.color).toEqual("red100")
          })
        })
      })

      describe("when the timer is on the lots in the grid not the lot grid", () => {
        const urgencyIntervalMinutes = 1
        describe("when the close date/time is minutes until close", () => {
          const time = {
            days: "00",
            hours: "00",
            minutes: "10",
            seconds: "59",
          }

          it("formats the timer to show 'xm xs' in red", () => {
            const lotTimerInfo = getSaleOrLotTimerInfo(time, {
              hasStarted,
              urgencyIntervalMinutes,
            })
            expect(lotTimerInfo.copy).toEqual("in 10m 59s")
            expect(lotTimerInfo.color).toEqual("black100")
          })
        })

        describe("when the close date/time is less than the cascade interval (1 min) from close", () => {
          const time = {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "59",
          }

          it("formats the timer to show 'xm xs' in red", () => {
            const lotTimerInfo = getSaleOrLotTimerInfo(time, {
              hasStarted,
              urgencyIntervalMinutes,
            })
            expect(lotTimerInfo.copy).toEqual("in 0m 59s")
            expect(lotTimerInfo.color).toEqual("red100")
          })
        })
      })
    })

    describe("when the sale is not yet open", () => {
      const hasStarted = false
      describe("when the open time is less than one day way", () => {
        const time = { days: "00", hours: "23", minutes: "01", seconds: "59" }
        it("shows '1 Day Until Bidding Starts'", () => {
          const lotTimerInfo = getSaleOrLotTimerInfo(time, { hasStarted })
          expect(lotTimerInfo.copy).toEqual("23h 1m Until Bidding Starts")
          expect(lotTimerInfo.color).toEqual("blue100")
        })
      })

      describe("when the open time is between 1 and 2 days away", () => {
        const time = { days: "01", hours: "23", minutes: "01", seconds: "59" }
        it("shows '2 Days Until Bidding Starts'", () => {
          const lotTimerInfo = getSaleOrLotTimerInfo(time, { hasStarted })
          expect(lotTimerInfo.copy).toEqual("1 Day Until Bidding Starts")
          expect(lotTimerInfo.color).toEqual("blue100")
        })
      })

      describe("when the open time is more than one day away", () => {
        const time = { days: "02", hours: "23", minutes: "01", seconds: "59" }
        it("shows '2 Days Until Bidding Starts'", () => {
          const lotTimerInfo = getSaleOrLotTimerInfo(time, { hasStarted })
          expect(lotTimerInfo.copy).toEqual("2 Days Until Bidding Starts")
          expect(lotTimerInfo.color).toEqual("blue100")
        })
      })
    })
  })
})
