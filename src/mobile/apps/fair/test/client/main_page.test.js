/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const Fair = require("../../../../models/fair")
const Profile = require("../../../../models/profile")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const benv = require("benv")
const { resolve } = require("path")

describe("Main page client-side code", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      $.onInfiniteScroll = function () {}
      sinon.stub(Backbone.history, "start")
      sinon.stub(Backbone, "sync")
      return benv.render(
        resolve(__dirname, "../../templates/main_page.jade"),
        {
          fair: new Fair(fabricate("fair")),
          profile: new Profile(fabricate("profile")),
          sections: new Backbone.Collection([
            {
              section: "FOCUS",
              partner_shows_count: 13,
            },
            {
              section: "Pier 92",
              partner_shows_count: 42,
            },
          ]).models,
          byPriceHash: { "1:1000": "Under $1,000" },
          sd: {},
        },
        () => {
          const { FairMainPageView } = benv.requireWithJadeify(
            resolve(__dirname, "../../client/main_page"),
            [
              "featuredLinksTemplate",
              "primarySetTemplate",
              "imageNavItemTemplate",
            ]
          )
          this.view = new FairMainPageView({
            el: $("body"),
            model: new Fair(fabricate("fair")),
          })
          return done()
        }
      )
    })
  })

  afterEach(function () {
    benv.teardown()
    Backbone.sync.restore()
    return Backbone.history.start.restore()
  })

  return describe("FairMainPageView", () =>
    describe("#renderFeaturedLinks", function () {
      it("fetches the fairs sets", function () {
        this.view.renderFeaturedLinks()
        return _.last(Backbone.sync.args)[2].url.should.containEql(
          "/sets?owner_type=Fair"
        )
      })

      return it("renders the featured links", function () {
        this.view.renderFeaturedLinks()
        _.last(Backbone.sync.args)[2].success([
          fabricate("set", { key: "editorial", display_on_martsy: true }),
        ])
        _.last(Backbone.sync.args)[2].success([
          fabricate("featured_link", {
            title: "Featured link for this awesome page",
            display_on_martsy: true,
          }),
        ])
        return this.view.$el
          .html()
          .should.containEql("Featured link for this awesome page")
      })
    }))
})
