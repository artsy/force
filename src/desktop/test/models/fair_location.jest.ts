const FairLocation = require("../../models/partner_location")

describe("FairLocation", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.location = new FairLocation({
      address: "",
      address_2: "",
      city: "255 Front Street West, Toronto",
      coordinates: null,
      display: "255 Front Street West, Toronto",
      id: "5227735c8b3b8125fd000368",
      postal_code: "",
      raw: null,
      state: "",
      state_code: "",
      summary:
        "\nMetro Toronto Convention Centre   \n255 Front Street West, Toronto\n\n\n**Opening Night Preview**  \nA benefit for the Art Gallery of Ontario  \nThursday, October 24, 2013 \n\n\n**Public Hours**  \nOctober 25 - October 28, 2013",
      timezone: null,
    })
  })

  describe("#singleLine", () => {
    it("returns the display field", () => {
      testContext.location
        .singleLine()
        .should.equal(testContext.location.get("display"))
    })
  })
})
