const _ = require("underscore")
const Backbone = require("backbone")
const Fair = require("../../../../models/fair")
const FairEntries = require("../../../../collections/fair_entries")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const benv = require("benv")
const fabricatedFeed = require("./fabricate_feed.json")
const { resolve } = require("path")
const cheerio = require("cheerio")

describe("Fair feed page client-side code", () => {
  let view
  beforeEach(done => {
    benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      sinon.stub(Backbone, "sync")
      benv.render(
        resolve(__dirname, "../../templates/feed.jade"),
        {
          fair: new Fair(fabricate("fair")),
          sd: {},
        },
        () => {
          const { FeedView } = benv.requireWithJadeify(
            resolve(__dirname, "../../client/feed"),
            ["fairEntriesTemplate"]
          )
          Backbone.$ = $
          view = new FeedView({
            fair: new Fair(fabricate("fair")),
            el: $("body"),
            collection: new FairEntries(fabricatedFeed),
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

  describe("FeedView", () => {
    describe("#render", () => {
      it("renders entries properly", () => {
        view.render()
        view.$(".fair-feed__entry").length.should.equal(1)
        view
          .$(".fair-feed__entry__names__author-name")
          .first()
          .html()
          .should.containEql("Sophie-Alexia")
        view
          .$(".fair-feed__entry__names__username")
          .first()
          .html()
          .should.containEql("sophie_alexia")
      })
    })
  })
})
