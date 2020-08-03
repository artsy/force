/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const path = require("path")
const Artworks = require("../../../../collections/artworks.coffee")
const Artwork = require("../../../../models/artwork.coffee")
const Profile = require("../../../../models/profile")
const { fabricate } = require("@artsy/antigravity")

describe("PartnerArtworksView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      $.onInfiniteScroll = sinon.stub()
      Backbone.$ = $
      sinon.stub(Backbone, "sync")

      const artworkColumns = [
        [new Artwork(fabricate("artwork"))],
        [new Artwork(fabricate("artwork"))],
      ]
      return benv.render(
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
          this.view = new PartnerArtworksView({
            collection: new Artworks([]),
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

  return describe("#render", () =>
    it("appends artworks in collection to columns", function () {
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
      this.view.collection = artworks
      this.view.render()

      $(".artwork-columns-column").length.should.equal(2)
      $(".artwork-columns-column")
        .eq(0)
        .find(".artwork-columns-artwork")
        .length.should.equal(3)
      return $(".artwork-columns-column")
        .eq(1)
        .find(".artwork-columns-artwork")
        .length.should.equal(2)
    }))
})
