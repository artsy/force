/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const PartnerLocation = require("../../models/partner_location")
const PartnerLocations = require("../../collections/partner_locations")

describe("PartnerLocations", function () {
  beforeEach(function () {
    this.partnerLocations = new PartnerLocations([])
    return this.partnerLocations.add(fabricate("location"))
  })

  describe("#displayLocations", function () {
    it("returns a string representing the partner's locations", function () {
      return this.partnerLocations.displayLocations().should.equal("New York")
    })

    it("handles 2 locations", function () {
      this.partnerLocations.add(fabricate("location"))
      return this.partnerLocations
        .displayLocations()
        .should.equal("New York & 1 other location")
    })

    it("handles n locations", function () {
      this.partnerLocations.add(fabricate("location"))
      this.partnerLocations.add(fabricate("location"))
      this.partnerLocations.add(fabricate("location", { city: "Paris" }))
      return this.partnerLocations
        .displayLocations()
        .should.equal("New York & 3 other locations")
    })

    return it("displays a preferred location if passed in", function () {
      this.partnerLocations.add(fabricate("location"))
      this.partnerLocations.add(fabricate("location"))
      this.partnerLocations.add(fabricate("location", { city: "Paris" }))
      return this.partnerLocations
        .displayLocations("Paris")
        .should.equal("Paris & 3 other locations")
    })
  })

  return describe("#displayCities", function () {
    beforeEach(function () {
      this.partnerLocations.add(fabricate("location", { city: "New York" }))
      this.partnerLocations.add(fabricate("location", { city: "Paris" }))
      this.partnerLocations.add(fabricate("location", { city: "new york" }))
      this.partnerLocations.add(fabricate("location", { city: "Taipei" }))
      return this.partnerLocations.add(
        fabricate("location", { city: "Taipei" })
      )
    })

    it("displays unique titlized cities separated by comma by default", function () {
      return this.partnerLocations
        .displayCities()
        .should.equal("New York, Paris, Taipei")
    })

    it("displays unique titlized cities separated by custom separator", function () {
      return this.partnerLocations
        .displayCities(" (*´∀`)~♥ ")
        .should.equal("New York (*´∀`)~♥ Paris (*´∀`)~♥ Taipei")
    })

    return it("displays duplicate titlized cities separated by custom separator", function () {
      return this.partnerLocations
        .displayCities(" • ", false)
        .should.equal(
          "New York • New York • Paris • New York • Taipei • Taipei"
        )
    })
  })
})
