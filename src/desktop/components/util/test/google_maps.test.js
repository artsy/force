/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sd = require("sharify").data
const should = require("should")
const Backbone = require("backbone")
const benv = require("benv")
const {
  getMapImageSrc,
  getMapLink,
  getDirections,
} = require("../google_maps.coffee")

describe("PartnerLocation", function () {
  before(function (done) {
    this.location = "Address, City, State 00000"
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      sd.GOOGLE_MAPS_API_KEY = "GOOGLE-MAPS-API-KEY"
      return done()
    })
  })

  after(() => benv.teardown())

  describe("#mapImgSrc", () =>
    it("returns a correct google maps url", function () {
      return getMapImageSrc({
        size: "300x300",
        center: this.location,
        markers: `color:0x873ff0|${this.location}`,
      }).should.equal(
        "https://maps.googleapis.com/maps/api/staticmap?size=300x300&center=Address%2C%20City%2C%20State%2000000&markers=color%3A0x873ff0%7CAddress%2C%20City%2C%20State%2000000&maptype=roadmap&sensor=false&style=lightness%3A50%7Csaturation%3A-100&zoom=16&key=GOOGLE-MAPS-API-KEY"
      )
    }))

  describe("#googleMapsLink", () =>
    it("returns a formatted google maps url", function () {
      const options = {
        q: this.location,
        hnear: this.location,
      }
      return getMapLink(options).should.equal(
        "https://maps.google.com/maps?q=Address%2C%20City%2C%20State%2000000&hnear=Address%2C%20City%2C%20State%2000000"
      )
    }))

  return describe("#getDirections", () =>
    it("returns accurate google map directions", function () {
      const options = {
        origin: "210 Main Street New York NY",
        destination: this.location,
      }
      return getDirections(options).should.equal(
        "https://www.google.com/maps/dir/210%20Main%20Street%20New%20York%20NY/Address, City, State 00000"
      )
    }))
})
