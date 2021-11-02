const FilterSuggest = require("../../models/filter_suggest")

describe("FilterSuggest", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.filterSuggest = new FilterSuggest()
  })

  it("has a filter url", () => {
    new FilterSuggest({ id: "fair/foo" })
      .url()
      .should.containEql("api/v1/search/filtered/fair/foo")
  })

  describe("#mediumsHash", () => {
    it("humanizes medium names into a hash usuable by filter nav", () => {
      testContext.filterSuggest.set({
        medium: {
          design: 4002,
          drawing: 3772,
          "film-video": 966,
          installation: 1205,
          painting: 20933,
          "performance-art": 342,
          photography: 11012,
          prints: 3422,
          sculpture: 7902,
          "work-on-paper": 12432,
        },
      })
      testContext.filterSuggest
        .mediumsHash()
        ["Performance Art"].should.equal("performance-art")
    })
  })
})
