/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let locateStub
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const benv = require("benv")
const rewire = require("rewire")

const googleyAddress = {
  address_components: [
    {
      long_name: "New York",
      short_name: "New York",
      types: ["locality", "political"],
    },
    {
      long_name: "New York",
      short_name: "NY",
      types: ["administrative_area_level_1", "political"],
    },
    {
      long_name: "United States",
      short_name: "US",
      types: ["country", "political"],
    },
  ],
  adr_address:
    '<span class="locality">New York</span>, <span class="region">NY</span>, <span class="country-name">USA</span>',
  formatted_address: "New York, NY, USA",
  geometry: {
    location: {
      lb: 40.7143528,
      mb: -74.0059731,
      lat() {
        return 40.7143528
      },
      lng() {
        return -74.0059731
      },
    },
    viewport: {
      ea: {
        d: 40.496006,
        b: 40.91525559999999,
      },
      fa: {
        b: -74.2557349,
        d: -73.7002721,
      },
    },
  },
  icon: "http://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
  id: "7eae6a016a9c6f58e2044573fb8f14227b6e1f96",
  name: "New York",
  reference:
    "CoQBdAAAACZimk_9WwuhIeWFwtMeNqiAV2daRpsJ41qmyqgBQjVJiuokc6XecHVoogAisPTRLsOQNz0UOo2hfGM2I40TUkRNYveLwyiLX_EdSiFWUPNGBGkciwDInfQa7DCg2qdIkzKf5Q8YI_eCa8NbSTcJWxWTJk3cOUq4N82u3aDaGEMXEhCEDqVRiEBNj1FktOhIJ21XGhRhPghlJuXsUpx_cmTfrW34g9T8Pg",
  types: ["locality", "political"],
  url:
    "https://maps.google.com/maps/place?q=New+York&ftid=0x89c24fa5d33f083b:0xc80b8f06e177fe62",
  vicinity: "New York",
  html_attributions: [],
}

const geoFormatter = {
  getCity() {
    return "My city"
  },
  getState() {
    return "My state"
  },
  getStateCode() {
    return "My statecode"
  },
  getPostalCode() {
    return "My postalcode"
  },
  getCoordinates() {
    return [0, 0]
  },
  getCountry() {
    return "My country"
  },
}

const Geo = rewire("../../../models/mixins/geo")
Geo.__set__("geo", {
  locate: (locateStub = sinon.stub().yieldsTo("success", geoFormatter)),
})

class User extends Backbone.Model {
  static initClass() {
    _.extend(this.prototype, Geo)
  }
}
User.initClass()

describe("Geo Mixin", function () {
  beforeEach(function () {
    return (this.user = new User())
  })

  describe("#hasLocation", () =>
    it("determines whether or not there is a valid location", function () {
      this.user.hasLocation().should.be.false()
      this.user.set({ location: { city: "existy" } })
      return this.user.hasLocation().should.be.true()
    }))

  describe("#approximateLocation, #setGeo", function () {
    it("gets the approximate location by geolocating the IP address", function () {
      this.user.approximateLocation()
      this.user.get("location").city.should.equal("My city")
      this.user.get("location").state.should.equal("My state")
      return this.user.get("location").coordinates.should.eql([0, 0])
    })

    return it("accepts a success callback", function (done) {
      return this.user.approximateLocation({ success: done })
    })
  })

  return describe("#setLocation", function () {
    it("should allow a user to set a location object that Google returns", function () {
      this.user.setLocation(googleyAddress)
      return this.user
        .location()
        .cityStateCountry()
        .should.equal("New York, New York, United States")
    })

    it("should allow a user to set a non-standard name as their location", function () {
      this.user.setLocation({ name: "Foobar" })
      return this.user.location().cityStateCountry().should.equal("Foobar")
    })

    return it("should allow a user to clear their location", function () {
      this.user.setLocation({ name: "" })
      return this.user.location().cityStateCountry().should.equal("")
    })
  })
})
