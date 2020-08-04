/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Auction = require("../../../models/auction")
const Artworks = require("../../../collections/artworks")
const AuctionArtworksView = benv.requireWithJadeify(
  resolve(__dirname, "../view"),
  ["template"]
)

describe("AuctionArtworksView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      this.$el = $(`\
<section>
  <a class='js-toggle-artworks-sort' href='#' data-mode='grid' data-sort='default'>Grid</a>
  <a class='js-toggle-artworks-sort' href='#' data-mode='list' data-sort='name_asc'>Artists A–Z</a>
  <div class='js-auction-artworks'></div>
</section>\
`)
      this.user = new Backbone.Model()
      this.artworks = new Artworks([
        fabricate("artwork", { id: "z-z", artist: { sortable_id: "z-z" } }),
        fabricate("artwork", { id: "a-a", artist: { sortable_id: "a-a" } }),
      ])
      return done()
    })
  })

  afterEach(() => benv.teardown())

  describe("default auction", function () {
    beforeEach(function () {
      return (this.view = new AuctionArtworksView({
        el: this.$el,
        model: (this.auction = new Auction(
          fabricate("sale", { auction_state: "open" })
        )),
        collection: this.artworks,
        user: this.user,
      }))
    })

    describe("#render", () =>
      it("renders the default state", function () {
        this.view.render()
        this.view.$(".js-auction-artworks").data("mode").should.equal("grid")
        this.view.$(".auction-grid-artwork").should.have.lengthOf(2)
        this.view.$(".js-bid-button").should.have.lengthOf(2)
        return this.view.$(".js-inquiry-button").should.have.lengthOf(0)
      }))

    return describe("#setState", function () {
      beforeEach(function () {
        return this.view.$('a[data-sort="name_asc"]').click()
      })

      it("sets the view state", function () {
        return this.view.state.attributes.should.eql({
          mode: "list",
          sort: "name_asc",
        })
      })

      it("activates the link", function () {
        return this.view.$(".is-active").data("sort").should.equal("name_asc")
      })

      return it("triggers a sort and re-render", function () {
        this.view.$(".auction-grid-artwork").should.have.lengthOf(0)
        this.view.$(".auction-list-artwork").should.have.lengthOf(2)
        this.view
          .$(".auction-list-artwork:first-child a")
          .attr("href")
          .should.containEql("/artwork/a-a")
        return this.view
          .$(".auction-list-artwork:last-child a")
          .attr("href")
          .should.containEql("/artwork/z-z")
      })
    })
  })

  return describe("auction promo", function () {
    beforeEach(function () {
      return (this.view = new AuctionArtworksView({
        el: this.$el,
        model: (this.auction = new Auction(
          fabricate("sale", { sale_type: "auction promo" })
        )),
        collection: this.artworks,
        user: this.user,
      }))
    })

    return describe("#render", function () {
      beforeEach(function () {
        return this.view.render()
      })

      describe("nav", () =>
        it("renders the approprate sort options", function () {
          this.view.$(".garamond-tab").should.have.lengthOf(4)
          return this.view
            .$(".garamond-tab")
            .text()
            .should.equal("DefaultArtists A–ZHighest EstimateLowest Estimate")
        }))

      describe("isPreview", function () {
        beforeEach(function () {
          this.auction.set("auction_state", "preview")
          return this.view.render()
        })

        return it("renders correctly", function () {
          this.view.$(".auction-grid-artwork").should.have.lengthOf(2)
          this.view.$(".js-bid-button").should.have.lengthOf(0)
          return this.view.$(".js-inquiry-button").should.have.lengthOf(2)
        })
      })

      describe("isOpen", function () {
        beforeEach(function () {
          this.auction.set("auction_state", "open")
          return this.view.render()
        })

        return it("renders correctly", function () {
          this.view.$(".auction-grid-artwork").should.have.lengthOf(2)
          this.view.$(".js-bid-button").should.have.lengthOf(0)
          return this.view.$(".js-inquiry-button").should.have.lengthOf(0)
        })
      })

      return describe("isClosed", function () {
        beforeEach(function () {
          this.auction.set("auction_state", "closed")
          return this.view.render()
        })

        return it("renders correctly", function () {
          this.view.$(".auction-grid-artwork").should.have.lengthOf(2)
          this.view.$(".js-bid-button").should.have.lengthOf(0)
          return this.view.$(".js-inquiry-button").should.have.lengthOf(0)
        })
      })
    })
  })
})
