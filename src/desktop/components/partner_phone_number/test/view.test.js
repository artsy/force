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
const { fabricate } = require("@artsy/antigravity")
const Artwork = require("../../../models/artwork")
const PartnerLocations = require("../../../collections/partner_locations")
const PartnerPhoneNumberView = benv.requireWithJadeify(
  resolve(__dirname, "../view"),
  ["template"]
)

describe("PartnerPhoneNumberView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.artwork = new Artwork(fabricate("artwork"))
    this.locations = new PartnerLocations(
      _.times(3, () => fabricate("partner_location"))
    )
    this.view = new PartnerPhoneNumberView({
      model: this.artwork,
      collection: this.locations,
    })
    return this.view.render()
  })

  describe("#render", function () {
    it("is renders nothing when the collection is empty", function () {
      const view = new PartnerPhoneNumberView({
        model: this.artwork,
        collection: new PartnerLocations(),
      })
      return view.render().$el.html().should.equal("")
    })

    return it("renders all of the phone numbers", function () {
      this.view.$(".show-phone-number").length.should.equal(1)
      return this.view.$(".partner-phone-number").length.should.equal(3)
    })
  })

  return describe("#showPhoneNumber", () =>
    it('removes the "Show Phone Number" link and displays the phone numbers when clicked', function () {
      this.view.$(".show-phone-number").click()
      return this.view.$(".show-phone-number").length.should.equal(0)
    }))
})
