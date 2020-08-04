/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sd = require("sharify").data
const benv = require("benv")
const sinon = require("sinon")
const should = require("should")
const Backbone = require("backbone")
const PartnerLocation = require("../../models/partner_location")
const { getDirections } = require("../../components/util/google_maps.coffee")

describe("PartnerLocation", function () {
  before(done =>
    benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      sd.GOOGLE_MAPS_API_KEY = "GOOGLE-MAPS-API-KEY"
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.partnerLocation = new PartnerLocation({
      id: "partner-location",
      name: "Partner Location",
      city: "City",
      address: "Address",
      state: "State",
      postal_code: "00000",
      phone: "555-555-5555",
    })
    return (this.partnerLocationMissingInfo = new PartnerLocation({
      id: "partner-location",
      name: "Partner Location",
      city: "City",
      address: "Address",
    }))
  })

  describe("#singleLine", () =>
    it("formats location on a single line", function () {
      this.partnerLocation.singleLine().should.equal("City, Address")
      this.partnerLocationMissingInfo.set("city", "")
      this.partnerLocationMissingInfo.singleLine().should.equal("Address")
      this.partnerLocation
        .singleLine()
        .should.equal(
          `${this.partnerLocation.get("city")}, ${this.partnerLocation.get(
            "address"
          )}`
        )
      this.partnerLocation.set("address_2", "Ste 227")
      return this.partnerLocation
        .singleLine()
        .should.equal(
          `${this.partnerLocation.get("city")}, ${this.partnerLocation.get(
            "address"
          )} ${this.partnerLocation.get("address_2")}`
        )
    }))

  describe("#lines", () =>
    it("returns an array of strings for the address", function () {
      this.partnerLocation
        .lines()
        .should.containEql(this.partnerLocation.get("address"))
      this.partnerLocation
        .lines()
        .should.containEql(this.partnerLocation.cityStatePostalCode())
      this.partnerLocation.set({
        address_2: "25th Floor",
        country: "USA",
      })
      this.partnerLocation
        .lines()
        .should.containEql(this.partnerLocation.get("address"))
      this.partnerLocation
        .lines()
        .should.containEql(this.partnerLocation.get("address_2"))
      this.partnerLocation
        .lines()
        .should.containEql(this.partnerLocation.cityStatePostalCode())
      return this.partnerLocation
        .lines()
        .should.containEql(this.partnerLocation.get("country"))
    }))

  describe("#cityState", () =>
    it("ignores blank values", function () {
      this.partnerLocation.set("city", "")
      this.partnerLocation
        .cityState()
        .should.equal(this.partnerLocation.get("state"))
      this.partnerLocation.set({ city: "Beverly Hills", state: "" })
      return this.partnerLocation
        .cityState()
        .should.equal(this.partnerLocation.get("city"))
    }))

  describe("#cityStateCountry", () =>
    it("ignores blank values", function () {
      this.partnerLocation
        .cityStateCountry()
        .should.equal(
          `${this.partnerLocation.get("city")}, ${this.partnerLocation.get(
            "state"
          )}`
        )
      this.partnerLocation.set({ country: "United States" })
      return this.partnerLocation
        .cityStateCountry()
        .should.equal(
          `${this.partnerLocation.get("city")}, ${this.partnerLocation.get(
            "state"
          )}, ${this.partnerLocation.get("country")}`
        )
    }))

  describe("#cityStatePostalCode", () =>
    it("returns a string for city, state, and postal code omitting missing values", function () {
      const pl = this.partnerLocation
      return pl
        .cityStatePostalCode()
        .should.equal(
          `${pl.get("city")}, ${pl.get("state")} ${pl.get("postal_code")}`
        )
    }))

  describe("#displayName", () =>
    it("Formatted displayName", function () {
      this.partnerLocation.displayName().should.equal("Partner Location")
      return this.partnerLocationMissingInfo
        .displayName()
        .should.equal("Partner Location")
    }))

  describe("#displayAddress", () =>
    it("Formats address", function () {
      this.partnerLocation
        .displayAddress()
        .should.equal("Address, City, State 00000")
      return this.partnerLocationMissingInfo
        .displayAddress()
        .should.equal("Address, City")
    }))

  describe("#toHtml", () =>
    it("Correctly formats as html", function () {
      this.partnerLocation
        .toHtml()
        .should.equal("Address<br/>City, State 00000<br/>Tel: 555-555-5555")
      return this.partnerLocationMissingInfo
        .toHtml()
        .should.equal("Address<br/>City")
    }))

  describe("#googleMapsLink", function () {
    it("returns q and hnear params for an address only location", function () {
      return this.partnerLocation
        .googleMapsLink()
        .should.equal(
          "https://maps.google.com/maps?q=Address%2C%20City%2C%20State%2000000&hnear=Address%2C%20City%2C%20State%2000000"
        )
    })

    return it("returns only a q param for locations with coordinates", function () {
      this.partnerLocation.set("coordinates", {
        lng: -74.0093178,
        lat: 40.2163901,
      })
      return this.partnerLocation
        .googleMapsLink()
        .should.equal("https://maps.google.com/maps?q=40.2163901%2C-74.0093178")
    })
  })

  return describe("#mapDirections", function () {
    beforeEach(function () {
      return this.partnerLocation.set("coordinates", {
        lng: -74.0093178,
        lat: 40.2163901,
      })
    })

    return it("returns get directions", function () {
      const origin = "210 Main St New York, NY"
      return this.partnerLocation
        .mapDirections(origin)
        .should.equal(
          "https://www.google.com/maps/dir/210%20Main%20St%20New%20York,%20NY/40.2163901,-74.0093178"
        )
    })
  })
})
