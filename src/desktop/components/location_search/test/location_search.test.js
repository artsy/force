/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")

const LocationSearchView = benv.requireWithJadeify(
  resolve(__dirname, "../index"),
  ["template"]
)

describe("Location Search", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        google: sinon.stub(),
      })
      Backbone.$ = $
      LocationSearchView.__set__("geo", {
        loadGoogleMaps(cb) {
          return cb()
        },
      })
      this.google = {
        maps: {
          places: { Autocomplete: sinon.stub() },
          event: {
            addListener: sinon.stub(),
            addDomListener: sinon.stub(),
          },
        },
      }
      LocationSearchView.__set__("google", this.google)
      this.view = new LocationSearchView()
      return done()
    })
  })

  afterEach(() => benv.teardown())

  it("should render the template", function () {
    return this.view.render().$el.html().should.containEql("Enter your city")
  })

  it("should render with a current value", function () {
    const value = "New York, NY, United States"
    return this.view.render(value).$el.html().should.containEql(value)
  })

  it("attach Google Maps specific event listeners", function () {
    this.view.render()
    this.google.maps.event.addListener.args[0][1].should.equal("place_changed")
    return this.google.maps.event.addDomListener.args[0][1].should.equal(
      "keydown"
    )
  })

  it("should announce it's location", function (done) {
    this.view.once("location:update", () => done())
    return this.view.announce({})
  })

  describe("#determineAutofocus", function () {
    it("should set the appropriate autofocus attribute", function () {
      LocationSearchView.__set__("isTouchDevice", () => false)
      return new LocationSearchView().determineAutofocus().should.be.true()
    })
    it("should accept options", function () {
      LocationSearchView.__set__("isTouchDevice", () => false)
      _.isUndefined(
        new LocationSearchView({ autofocus: false }).determineAutofocus()
      ).should.be.true()
      return new LocationSearchView({ autofocus: true })
        .determineAutofocus()
        .should.be.true()
    })
    return it("should handle touch devices", function () {
      LocationSearchView.__set__("isTouchDevice", () => true)
      _.isUndefined(
        new LocationSearchView().determineAutofocus()
      ).should.be.true()
      _.isUndefined(
        new LocationSearchView({ autofocus: false }).determineAutofocus()
      ).should.be.true()
      return _.isUndefined(
        new LocationSearchView({ autofocus: true }).determineAutofocus()
      ).should.be.true()
    })
  })

  return describe("#preAnnounce", () =>
    it("should announce a named location string when the input is blurred", function (done) {
      this.view.$el.html("<input>")
      this.view.$("input").val("Lemuria")
      this.view.once("location:update", function (location) {
        location.should.eql({ name: "Lemuria" })
        return done()
      })
      return this.view.$("input").trigger("blur")
    }))
})
