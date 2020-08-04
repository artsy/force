/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const benv = require("benv")
const rewire = require("rewire")
const Backbone = require("backbone")
const Partner = require("../../../../../models/partner.coffee")
const PartnerLocations = require("../../../../../collections/partner_locations")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

const LocationsView = benv.requireWithJadeify(
  resolve(__dirname, "../view.coffee"),
  ["template"]
)

describe("LocationsView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      this.partner = new Partner(fabricate("partner"))
      this.view = new LocationsView({ partner: this.partner })
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("#fetch", function () {
    before(function () {
      return (this.locations = new PartnerLocations([fabricate("location")]))
    })

    it("makes proper requests to fetch partner locations", function () {
      let requests
      this.view.fetch()
      ;(requests = Backbone.sync.args).should.have.lengthOf(1)
      return requests[0][1].url.should.endWith(
        `${this.partner.url()}/locations?size=20`
      )
    })

    it("returns a thenable promise", function () {
      return this.view.fetch().then.should.be.a.Function()
    })

    return it("fetches and returns locations", function () {
      Backbone.sync.onCall(0).yieldsTo("success", this.locations.models)

      return this.view.fetch().then(locations => {
        locations.length.should.equal(1)
        return locations.models.should.eql(this.locations.models)
      })
    })
  })

  return describe("#render", function () {
    beforeEach(function () {
      return sinon.stub(this.view, "remove")
    })

    afterEach(function () {
      return this.view.remove.restore()
    })

    return it("removes the view if no locations", function () {
      this.view.render([])
      return this.view.remove.calledOnce.should.be.ok()
    })
  })
})
