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
const PartnerShow = require("../../../models/partner_show")
const Partner = require("../../../models/partner")
const MapModalView = require("../view.coffee")
const template = require("jade").compileFile(
  require.resolve("./fixtures/template.jade")
)

describe("MapModalView", function () {
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
    return (this.view = new MapModalView({
      model: this.show,
      latlng: this.show.location().get("coordinates"),
      template() {
        return "foobar"
      },
      location: this.show.location(),
      element: ".js-map-modal-show-map",
    }))
  })

  afterEach(function () {
    return this.view.postRender.restore()
  })

  return describe("#render", function () {
    it("use passed in template", function () {
      this.view = new MapModalView({
        model: this.show,
        latlng: this.show.location().get("coordinates"),
        template() {
          return "foobar"
        },
        location: this.show.location(),
        element: ".js-map-modal-show-map",
      })

      this.view.render()

      return this.view.$el.html().should.containEql("foobar")
    })

    return it("displays the show information correctly", function () {
      this.view = new MapModalView({
        model: this.show,
        latlng: this.show.location().get("coordinates"),
        template,
        location: this.show.location(),
        element: ".js-map-modal-show-map",
      })

      this.view.render()

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
