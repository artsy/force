/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sd = require("sharify").data
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const moment = require("moment")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Fair = require("../../../../models/fair.coffee")

xdescribe("ForYouView", function () {
  before(function (done) {
    return benv.setup(() => {
      sd.API_URL = "localhost:3003"

      sd.CURRENT_PATH = ""
      sd.CURRENT_USER = "hello"
      sd.NODE_ENV = "test"
      benv.expose({ $: benv.require("jquery") })
      sinon.stub(Backbone, "sync")
      this.OverviewView = require("../../client/overview.coffee")
      Backbone.$ = $

      this.fair = new Fair(fabricate("fair"))
      return done()
    })
  })

  after(function () {
    benv.teardown()
    Backbone.sync.restore()
    return (sd.CURRENT_USER = undefined)
  })

  return describe("#initialize", () =>
    it("renders personalized artist list", function () {
      const view = new this.OverviewView({
        el: $(`<div>
<div class='clock'></div>
<div class='container-left'><div class='large-section-subheading'></div></div>
</div>`),
        fair: this.fair,
        model: this.model,
      })

      Backbone.sync.args[0][2].success({
        time: moment().subtract("minutes", 2).format("YYYY-MM-DD HH:mm:ss ZZ"),
      })
      Backbone.sync.args[1][2].success([{ artist: fabricate("artist") }])
      Backbone.sync.args[2][2].success([])

      view.$el.html().should.not.containEql("undefined")
      view.$el.html().should.not.containEql("#{")
      view.$el.html().should.not.containEql("NaN")

      view.$(".container-left .large-section-subheading").length.should.equal(1)
      return view
        .$(".container-left .large-section-subheading")
        .text()
        .should.containEql("Pablo Picasso")
    }))
})
