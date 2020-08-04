/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const rewire = require("rewire")
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const { FairsView } = benv.requireWithJadeify(
  resolve(__dirname, "../client/index.coffee"),
  ["pastFairsTemplate"]
)
const ViewHelpers = require("../helpers/view_helpers.coffee")
const moment = require("moment")
const mediator = require("../../../lib/mediator.coffee")

describe("FairsView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.spy(mediator, "trigger")
      return done()
    })
  )

  after(function () {
    mediator.trigger.restore()
    return benv.teardown()
  })

  beforeEach(function (done) {
    this.image = { url: "https://www.example.com/cat.jpg" }
    this.profile = {
      is_published: true,
      icon: { url: "https://www.example.com/cat.jpg" },
    }
    const fair = fabricate("fair", { image: this.image, profile: this.profile })
    this.fairs = [fair]
    return benv.render(
      resolve(__dirname, "../templates/index.jade"),
      {
        sd: { FAIRS: this.fairs },
        featuredFairs: this.fairs,
        currentFairRows: ViewHelpers.currentRows(this.fairs),
        upcomingFairs: this.fairs,
        pastFairs: this.fairs,
        ViewHelpers,
        asset() {},
      },
      () => {
        this.view = new FairsView({
          el: $("body"),
          user: null,
        })
        return done()
      }
    )
  })

  describe("#renderPastFairs", function () {
    beforeEach(function () {
      return this.view.initialize({ el: $("body") })
    })

    return it("appends the additional fair(s)", function () {
      this.view.$(".fairs__past-fairs-list a").length.should.eql(1)
      this.view.renderPastFairs([
        fabricate("fair", {
          is_published: true,
          has_listing: true,
          has_full_feature: true,
          image: this.image,
          profile: this.profile,
          end_at: moment().subtract(10, "days").format(),
        }),
      ])
      return this.view.$(".fairs__past-fairs-list a").length.should.eql(2)
    })
  })

  return it("opens the auth modal with expected args", function () {
    this.view.$(".fairs__promo__sign-up").click()
    mediator.trigger.args[0][0].should.containEql("open:auth")
    mediator.trigger.args[0][1].mode.should.containEql("signup")
    return mediator.trigger.args[0][1].copy.should.containEql(
      "Sign up to follow fairs"
    )
  })
})
