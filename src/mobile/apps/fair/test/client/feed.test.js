/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
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

describe("Fair feed page client-side code", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      return benv.render(
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

          this.view = new FeedView({
            fair: new Fair(fabricate("fair")),
            el: $("body"),
            collection: new FairEntries(fabricatedFeed),
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

  return describe("FeedView", () =>
    describe("#render", () =>
      it("renders entries properly", function () {
        this.view.render()
        this.view.$(".fair-feed__entry").length.should.equal(1)
        this.view
          .$(".fair-feed__entry__names__author-name")
          .first()
          .html()
          .should.containEql("Sophie-Alexia")
        return this.view
          .$(".fair-feed__entry__names__username")
          .first()
          .html()
          .should.containEql("sophie_alexia")
      })))
})
