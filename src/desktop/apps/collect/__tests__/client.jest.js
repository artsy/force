import { onFilterChange } from "../client"

describe("Collect/Client", () => {
  describe("onFilterChange", () => {
    let filters = null

    beforeEach(() => {
      filters = {
        medium: "painting",
        for_sale: null,
        page: "1",
        major_periods: [],
        partner_id: null,
        sort: "-decayed_merch",
        acquireable: null,
        at_auction: null,
        inquireable_only: null,
        price_range: "50-47250",
        selectedFilters: [],
        showActionSheet: false,
      }
    })

    it("serializes filters into a URL correctly", () => {
      // location = "https://www.artsy.net/collect"
      history.replaceState({}, "Collect", "/collect")

      expect(onFilterChange(filters)).toEqual(
        "/collect/painting?page=1&sort=-decayed_merch&price_range=50-47250"
      )
    })

    it("serializes filters for collections based on current href", () => {
      history.replaceState({}, "Collection", "/collection/kaws-companions")

      expect(onFilterChange(filters)).toEqual(
        "/collection/kaws-companions?medium=painting&page=1&sort=-decayed_merch&price_range=50-47250"
      )

      console.log(document.location.href)
    })
  })
})
