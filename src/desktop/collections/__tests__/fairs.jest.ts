import { fabricate } from "@artsy/antigravity"
const moment = require("moment")
const { Fairs } = require("../fairs")

describe("Fairs", () => {
  describe("#pastYearRoundFairs", function () {
    jest.useFakeTimers()

    it("should not display upcoming fairs", function () {
      const fairs = new Fairs([
        fabricate("fair", {
          end_at: moment().subtract(7, "days"),
          has_full_feature: true,
          id: "fair1",
        }),
        fabricate("fair", {
          end_at: moment().add(7, "days"),
          has_full_feature: true,
          id: "fair2",
        }),
        fabricate("fair", {
          end_at: moment().add(7, "days"),
          has_full_feature: true,
          id: "fair3",
        }),
      ])

      const pastFairs = fairs.pastYearRoundFairs()
      pastFairs.length.should.eql(1)
    })
  })
})
