/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Geo = require("../index")

describe("Geo", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
        google: {
          maps: {
            Geocoder() {
              return { geocode: sinon.stub() }
            },
            LatLng: sinon.stub(),
          },
        },
      })
      return done()
    })
  )

  after(() => benv.teardown())

  describe("#locate", function () {
    beforeEach(() => sinon.stub(Backbone, "sync"))

    afterEach(() => Backbone.sync.restore())

    it("calls out to an external IP geolocation service when low accuracy is requested", function () {
      Geo.locate({ accuracy: "low" })
      Backbone.sync.args[0][2].url.should.equal("https://freegeoip.net/json/")
      return _.isNull(Backbone.sync.args[0][2].headers).should.be.ok()
    })

    return it("uses the browser geolocation API when high accuracy is requested", function () {
      navigator.geolocation = { getCurrentPosition: sinon.stub() }
      Geo.locate({ accuracy: "high" })
      return navigator.geolocation.getCurrentPosition.called.should.be.ok()
    })
  })

  return describe("#loadGoogleMaps", function () {
    beforeEach(() => (Geo.googleMapsLoading = undefined))

    it("loads the Google Maps places library and runs the callback", function (done) {
      sinon.stub($, "getScript", () => window.googleMapsCallback())

      _.isUndefined(window.googleMapsCallback).should.be.true()
      Geo.loadGoogleMaps(function () {
        _.isFunction(window.googleMapsCallback).should.be.true()
        return done()
      })

      return $.getScript.restore()
    })

    it("only calls $.getScript once", function (done) {
      const count = sinon.stub()
      sinon.stub($, "getScript", function () {
        count()
        return window.googleMapsCallback()
      })

      Geo.loadGoogleMaps(function () {})
      Geo.loadGoogleMaps(function () {})
      Geo.loadGoogleMaps(function () {
        count.callCount.should.equal(1)
        return done()
      })

      return $.getScript.restore()
    })

    return it("calls back to all callbacks that get attached", function (done) {
      const count = sinon.stub()

      sinon.stub($, "getScript", () => window.googleMapsCallback())

      Geo.loadGoogleMaps(count)
      Geo.loadGoogleMaps(count)
      Geo.loadGoogleMaps(count)
      Geo.loadGoogleMaps(count)

      Geo.loadGoogleMaps(function () {
        count.callCount.should.equal(4)
        return done()
      })

      return $.getScript.restore()
    })
  })
})
