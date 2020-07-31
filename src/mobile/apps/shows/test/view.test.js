/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const path = require("path")
const PartnerShows = require("../../../collections/partner_shows.coffee")
const Show = require("../../../models/show.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("ShowCityView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      const partnerShows = new PartnerShows([
        fabricate("show", { status: "running" }),
        fabricate("show", { status: "running" }),
        fabricate("show"),
      ])
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      return benv.render(
        path.resolve(__dirname, "../templates/city.jade"),
        {
          sd: {},
          asset() {},
          city: { name: "new-york" },
          shows: partnerShows,
          opening: [],
          upcoming: [],
          current: [new Show(fabricate("show")).set("status", "running")],
          past: [],
        },
        () => {
          let mod
          const { ShowCityView } = (mod = benv.requireWithJadeify(
            path.resolve(__dirname, "../client/shows.coffee"),
            ["showTemplate"]
          ))
          this.view = new ShowCityView({
            collection: partnerShows,
            el: $("body"),
            params: {},
          })
          return done()
        }
      )
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("#initialize", function () {
    it("should start fetching at page 1", function () {
      return this.view.page.should.equal(1)
    })

    return it("should make the initial fetch", function () {
      this.view.onInitialFetch()
      return $("#running li").length.should.equal(3)
    })
  })

  return describe("#onInfiniteScroll", () =>
    it("fetches more shows", function () {
      this.view.onInfiniteScroll()
      return Backbone.sync.callCount.should.equal(2)
    }))
})
