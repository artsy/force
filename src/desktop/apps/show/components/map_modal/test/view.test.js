/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const PartnerShow = require("../../../../../models/partner_show")
const Partner = require("../../../../../models/partner")
const MapModalView = benv.requireWithJadeify(require.resolve("../view"), [
  "template",
])

xdescribe("MapModalView", function () {
  beforeEach(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  afterEach(() => benv.teardown())

  beforeEach(function () {
    sinon.stub(MapModalView.prototype, "postRender")
    this.show = new PartnerShow(
      fabricate("show", {
        location: _.extend(fabricate("show").location, {
          day_schedules: [],
          coordinates: { lat: 30, lng: 30 },
        }),
      })
    )
    this.partner = new Partner(fabricate("partner"))
    return (this.view = new MapModalView({ model: this.show }))
  })

  afterEach(function () {
    return this.view.postRender.restore()
  })

  return describe("#render", function () {
    beforeEach(function () {
      return this.view.render()
    })

    return it("displays the shows information correctly", function () {
      this.view
        .$(".map-modal-partner-name")
        .html()
        .should.containEql("Gagosian Gallery")
      this.view
        .$(".map-modal-partner-location-address")
        .html()
        .should.containEql("529 W 20th St.")
      this.view
        .$(".map-modal-partner-location-city")
        .html()
        .should.containEql("New York, NY")
      return this.view
        .$(".map-modal-show-running-dates")
        .html()
        .should.containEql("Jul 12th – Aug 23rd 2013")
    })
  })
})
