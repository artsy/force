/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const path = require("path")
const { Artworks } = require("../../../../collections/artworks")
const { Artwork } = require("../../../../models/artwork")
const { Profile } = require("../../../../models/profile")
const { fabricate } = require("@artsy/antigravity")

describe("PartnerArtworksView", function () {
  let view
  beforeEach(done => {
    benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      $.onInfiniteScroll = sinon.stub()
      sinon.stub(Backbone, "sync")

      const artworkColumns = [
        [new Artwork(fabricate("artwork"))],
        [new Artwork(fabricate("artwork"))],
      ]
      benv.render(
        path.resolve(__dirname, "../../templates/artworks.jade"),
        {
          sd: {},
          profile: new Profile(fabricate("profile")),
          artworkColumns,
        },
        () => {
          const { PartnerArtworksView } = benv.requireWithJadeify(
            path.resolve(__dirname, "../../client/artworks.coffee"),
            ["artworkColumnsTemplate"]
          )
          Backbone.$ = $
          view = new PartnerArtworksView({
            collection: new Artworks([]),
            el: $("body"),
            params: {},
          })
          done()
        }
      )
    })
  })

  afterEach(function () {
    benv.teardown()
    Backbone.sync.restore()
  })

  describe("#render", () => {
    it("appends artworks in collection to columns", () => {
      $(".artwork-columns-column").length.should.equal(2)
      $(".artwork-columns-column")
        .eq(0)
        .find(".artwork-columns-artwork")
        .length.should.equal(1)
      $(".artwork-columns-column")
        .eq(1)
        .find(".artwork-columns-artwork")
        .length.should.equal(1)

      const artworks = new Artworks([
        fabricate("artwork"),
        fabricate("artwork"),
        fabricate("artwork"),
      ])
      view.collection = artworks
      view.render()

      $(".artwork-columns-column").length.should.equal(2)
      $(".artwork-columns-column")
        .eq(0)
        .find(".artwork-columns-artwork")
        .length.should.equal(3)
      $(".artwork-columns-column")
        .eq(1)
        .find(".artwork-columns-artwork")
        .length.should.equal(2)
    })
  })
})
