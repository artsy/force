/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const { fabricate } = require("@artsy/antigravity")
const Artwork = require("../../../models/artwork.coffee")
const PartnerLocations = rewire("../index")
const PartnerPhoneNumberView = benv.requireWithJadeify(
  require.resolve("../../partner_phone_number/view.coffee"),
  ["template"]
)

describe("PartnerLocations", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    $("body").html(`\
<div class='artwork-partner-locations'></div>
<div class='artwork-partner-phone-container'></div>\
`)

    sinon.stub(Backbone, "sync")
    this.artwork = new Artwork(
      fabricate("artwork", { partner: { id: "foobar" } })
    )

    return PartnerLocations.__set__(
      "PartnerPhoneNumberView",
      PartnerPhoneNumberView
    )
  })

  afterEach(() => Backbone.sync.restore())

  describe("without partner", () =>
    it("does nothing", function () {
      this.artwork.unset("partner")
      new PartnerLocations({ $el: $("body"), artwork: this.artwork })
      return Backbone.sync.called.should.be.false()
    }))

  return describe("with partner", function () {
    beforeEach(function () {
      this.partnerLocations = new PartnerLocations({
        $el: $("body"),
        artwork: this.artwork,
      })
      return (this.locations = this.partnerLocations.locations)
    })

    it("fetches the partner locations", () =>
      Backbone.sync.args[0][1].url.should.containEql(
        "/api/v1/partner/foobar/locations"
      ))

    describe("in an auction promo", function () {
      before(function () {
        return sinon.stub(this.artwork, "isPartOfAuctionPromo").returns(true)
      })

      after(function () {
        return sinon.restore(this.artwork, "isPartOfAuctionPromo")
      })

      return it("#setupPhoneNumbers does not render phone number", function () {
        this.partnerLocations.setupPhoneNumbers()
        return $(".artwork-partner-phone-container").text().should.eql("")
      })
    })

    describe("for sale in a normal auction", () =>
      it("#setupPhoneNumbers should render phone number", function () {
        this.artwork.set({ forsale: true, acquireable: false })
        this.locations.add(
          fabricate("partner_location", {
            city: "New York",
            phone: "(713) 666-1216",
          })
        )
        this.partnerLocations.setupPhoneNumbers(this.locations)
        this.locations.trigger("sync")
        return $(".artwork-partner-phone-container")
          .text()
          .should.containEql("(713) 666-1216")
      }))

    return describe("#renderLocations", function () {
      it("returns an appropriate string when there are less than 3 locations", function () {
        this.locations.add(fabricate("partner_location", { city: "New York" }))
        this.partnerLocations.renderLocations(this.locations)
        return $(".artwork-partner-locations").text().should.eql(", New York")
      })

      it("returns an appropriate string when there are less than 3 locations + some duplicates", function () {
        this.locations.add(fabricate("partner_location", { city: "New York" }))
        this.locations.add(fabricate("partner_location", { city: "New York" }))
        this.locations.add(
          fabricate("partner_location", { city: "Los Angeles" })
        )
        this.partnerLocations.renderLocations(this.locations)
        return $(".artwork-partner-locations")
          .text()
          .should.eql(", New York & Los Angeles")
      })

      it("returns an appropriate string when there are exactly 3 locations", function () {
        this.locations.add(fabricate("partner_location", { city: "New York" }))
        this.locations.add(fabricate("partner_location", { city: "Berlin" }))
        this.locations.add(
          fabricate("partner_location", { city: "Los Angeles" })
        )
        this.partnerLocations.renderLocations(this.locations)
        return $(".artwork-partner-locations")
          .text()
          .should.eql(", New York, Berlin & Los Angeles")
      })

      return it("returns an appropriate string when there are more than 3 locations", function () {
        this.locations.add(fabricate("partner_location"))
        this.locations.add(fabricate("partner_location"))
        this.locations.add(fabricate("partner_location"))
        this.locations.add(fabricate("partner_location"))
        this.partnerLocations.renderLocations(this.locations)
        return $(".artwork-partner-locations")
          .text()
          .should.eql(", 4 Locations")
      })
    })
  })
})
