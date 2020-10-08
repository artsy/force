const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const path = require("path")
const PartnerShows = require("../../../collections/partner_shows.coffee")
const Show = require("../../../models/show.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("ShowCityView", () => {
  let view
  beforeEach(done => {
    benv.setup(() => {
      const partnerShows = new PartnerShows([
        fabricate("show", { status: "running" }),
        fabricate("show", { status: "running" }),
        fabricate("show"),
      ])
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
      })
      sinon.stub(Backbone, "sync")
      benv.render(
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
          Backbone.$ = $
          view = new ShowCityView({
            collection: partnerShows,
            el: $("body"),
            params: {},
          })
          done()
        }
      )
    })
  })

  afterEach(() => {
    benv.teardown()
    Backbone.sync.restore()
  })

  describe("#initialize", () => {
    it("should start fetching at page 1", () => {
      view.page.should.equal(1)
    })

    it("should make the initial fetch", () => {
      view.onInitialFetch()
      view.$("#running li").length.should.equal(3)
    })
  })

  describe("#onInfiniteScroll", () => {
    it("fetches more shows", () => {
      view.onInfiniteScroll()
      Backbone.sync.callCount.should.equal(2)
    })
  })
})
