const sd = require("sharify").data
const benv = require("benv")
const { PartnerLocation } = require("../../models/partner_location")

describe("PartnerLocation", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeAll(done => {
    benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      sd.GOOGLE_MAPS_API_KEY = "GOOGLE-MAPS-API-KEY"
      done()
    })
  })

  afterAll(() => benv.teardown())

  beforeEach(() => {
    testContext.partnerLocation = new PartnerLocation({
      address: "Address",
      city: "City",
      id: "partner-location",
      name: "Partner Location",
      phone: "555-555-5555",
      postal_code: "00000",
      state: "State",
    })
    testContext.partnerLocationMissingInfo = new PartnerLocation({
      address: "Address",
      city: "City",
      id: "partner-location",
      name: "Partner Location",
    })
  })

  describe("#singleLine", () => {
    it("formats location on a single line", () => {
      testContext.partnerLocation.singleLine().should.equal("City, Address")
      testContext.partnerLocationMissingInfo.set("city", "")
      testContext.partnerLocationMissingInfo
        .singleLine()
        .should.equal("Address")
      testContext.partnerLocation
        .singleLine()
        .should.equal(
          `${testContext.partnerLocation.get(
            "city"
          )}, ${testContext.partnerLocation.get("address")}`
        )
      testContext.partnerLocation.set("address_2", "Ste 227")
      testContext.partnerLocation
        .singleLine()
        .should.equal(
          `${testContext.partnerLocation.get(
            "city"
          )}, ${testContext.partnerLocation.get(
            "address"
          )} ${testContext.partnerLocation.get("address_2")}`
        )
    })
  })

  describe("#lines", () => {
    it("returns an array of strings for the address", () => {
      testContext.partnerLocation
        .lines()
        .should.containEql(testContext.partnerLocation.get("address"))
      testContext.partnerLocation
        .lines()
        .should.containEql(testContext.partnerLocation.cityStatePostalCode())
      testContext.partnerLocation.set({
        address_2: "25th Floor",
        country: "USA",
      })
      testContext.partnerLocation
        .lines()
        .should.containEql(testContext.partnerLocation.get("address"))
      testContext.partnerLocation
        .lines()
        .should.containEql(testContext.partnerLocation.get("address_2"))
      testContext.partnerLocation
        .lines()
        .should.containEql(testContext.partnerLocation.cityStatePostalCode())
      testContext.partnerLocation
        .lines()
        .should.containEql(testContext.partnerLocation.get("country"))
    })
  })

  describe("#cityState", () => {
    it("ignores blank values", () => {
      testContext.partnerLocation.set("city", "")
      testContext.partnerLocation
        .cityState()
        .should.equal(testContext.partnerLocation.get("state"))
      testContext.partnerLocation.set({ city: "Beverly Hills", state: "" })
      testContext.partnerLocation
        .cityState()
        .should.equal(testContext.partnerLocation.get("city"))
    })
  })

  describe("#cityStateCountry", () => {
    it("ignores blank values", () => {
      testContext.partnerLocation
        .cityStateCountry()
        .should.equal(
          `${testContext.partnerLocation.get(
            "city"
          )}, ${testContext.partnerLocation.get("state")}`
        )
      testContext.partnerLocation.set({ country: "United States" })
      testContext.partnerLocation
        .cityStateCountry()
        .should.equal(
          `${testContext.partnerLocation.get(
            "city"
          )}, ${testContext.partnerLocation.get(
            "state"
          )}, ${testContext.partnerLocation.get("country")}`
        )
    })
  })

  describe("#cityStatePostalCode", () => {
    it("returns a string for city, state, and postal code omitting missing values", () => {
      const pl = testContext.partnerLocation
      pl.cityStatePostalCode().should.equal(
        `${pl.get("city")}, ${pl.get("state")} ${pl.get("postal_code")}`
      )
    })
  })

  describe("#displayName", () => {
    it("Formatted displayName", () => {
      testContext.partnerLocation.displayName().should.equal("Partner Location")
      testContext.partnerLocationMissingInfo
        .displayName()
        .should.equal("Partner Location")
    })
  })

  describe("#displayAddress", () => {
    it("Formats address", () => {
      testContext.partnerLocation
        .displayAddress()
        .should.equal("Address, City, State 00000")
      testContext.partnerLocationMissingInfo
        .displayAddress()
        .should.equal("Address, City")
    })
  })

  describe("#toHtml", () => {
    it("Correctly formats as html", () => {
      testContext.partnerLocation
        .toHtml()
        .should.equal("Address<br/>City, State 00000<br/>Tel: 555-555-5555")
      testContext.partnerLocationMissingInfo
        .toHtml()
        .should.equal("Address<br/>City")
    })
  })

  describe("#googleMapsLink", () => {
    it("returns q and hnear params for an address only location", () => {
      testContext.partnerLocation
        .googleMapsLink()
        .should.equal(
          "https://maps.google.com/maps?q=Address%2C%20City%2C%20State%2000000&hnear=Address%2C%20City%2C%20State%2000000"
        )
    })

    it("returns only a q param for locations with coordinates", () => {
      testContext.partnerLocation.set("coordinates", {
        lat: 40.2163901,
        lng: -74.0093178,
      })
      testContext.partnerLocation
        .googleMapsLink()
        .should.equal("https://maps.google.com/maps?q=40.2163901%2C-74.0093178")
    })
  })

  describe("#mapDirections", () => {
    beforeEach(() => {
      testContext.partnerLocation.set("coordinates", {
        lat: 40.2163901,
        lng: -74.0093178,
      })
    })

    it("returns get directions", () => {
      const origin = "210 Main St New York, NY"
      testContext.partnerLocation
        .mapDirections(origin)
        .should.equal(
          "https://www.google.com/maps/dir/210%20Main%20St%20New%20York,%20NY/40.2163901,-74.0093178"
        )
    })
  })
})
