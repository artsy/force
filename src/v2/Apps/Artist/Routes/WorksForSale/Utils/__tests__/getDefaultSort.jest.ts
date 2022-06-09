import { getDefaultSort } from "v2/Apps/Artist/Routes/WorksForSale/Utils/getDefaultSort"
import { Variant } from "unleash-client"

describe("getDefaultSort", () => {
  describe("when variant is not defined", () => {
    it("returns passed sort value", () => {
      expect(getDefaultSort("-has_price", null)).toEqual("-has_price")
    })
  })

  describe("when variant is defined", () => {
    describe("when variant is trending sort and sort is default", () => {
      it("returns -default_trending_score", () => {
        const variant: Variant = { name: "experiment", enabled: true }

        expect(getDefaultSort("-decayed_merch", variant)).toEqual(
          "-default_trending_score"
        )
      })
    })

    describe("when variant is trending sort and sort is custom", () => {
      it("returns pased sort value", () => {
        const variant: Variant = { name: "experiment", enabled: true }

        expect(getDefaultSort("-has_price", variant)).toEqual("-has_price")
      })
    })

    describe("when variant is not trending sort / disabled", () => {
      it("returns passed sort value", () => {
        const variant: Variant = { name: "disabled", enabled: false }

        expect(getDefaultSort("-has_price", variant)).toEqual("-has_price")
      })
    })
  })
})
