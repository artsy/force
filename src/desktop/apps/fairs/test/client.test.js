import { mediator } from "lib/mediator"
const rewire = require("rewire")
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

describe("FairsView", () => {
  let view
  const image = { url: "https://www.example.com/cat.jpg" }
  const profile = {
    is_published: true,
    icon: { url: "https://www.example.com/cat.jpg" },
  }

  before(done =>
    benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.spy(mediator, "trigger")
      done()
    })
  )

  after(() => {
    mediator.trigger.restore()
    benv.teardown()
  })

  beforeEach(done => {
    const fairs = [fabricate("fair", { image: image, profile: profile })]
    benv.render(
      resolve(__dirname, "../templates/index.jade"),
      {
        sd: { FAIRS: fairs },
        featuredFairs: fairs,
        currentFairRows: ViewHelpers.currentRows(fairs),
        upcomingFairs: fairs,
        pastFairs: fairs,
        ViewHelpers,
        asset() {},
      },
      () => {
        view = new FairsView({
          el: $("body"),
          user: null,
        })
        done()
      }
    )
  })

  describe("#renderPastFairs", () => {
    beforeEach(() => {
      view.initialize({ el: $("body") })
    })

    it("appends the additional fair(s)", () => {
      view.$(".fairs__past-fairs-list a").length.should.eql(1)
      view.renderPastFairs([
        fabricate("fair", {
          is_published: true,
          has_listing: true,
          has_full_feature: true,
          image: image,
          profile: profile,
          end_at: moment().subtract(10, "days").format(),
        }),
      ])
      view.$(".fairs__past-fairs-list a").length.should.eql(2)
    })
  })

  it("opens the auth modal with expected args", () => {
    view.$(".fairs__promo__sign-up").click()
    mediator.trigger.args[0][0].should.containEql("open:auth")
    mediator.trigger.args[0][1].mode.should.containEql("signup")
    mediator.trigger.args[0][1].copy.should.containEql(
      "Sign up to follow fairs"
    )
  })
})
