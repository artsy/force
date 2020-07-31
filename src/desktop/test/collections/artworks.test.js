/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Artworks = require("../../collections/artworks")

describe("Artworks", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.artworks = new Artworks([fabricate("artwork")]))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#initialize", function () {
    it("attaches to artwork collection its a part of if passed in", function () {
      const as = new Artworks([{ id: "foo" }], { artworkCollection: "foo" })
      return as.first().collection.artworkCollection.should.equal("foo")
    })

    return it("sets total count on sync", function () {
      this.artworks.trigger("sync", null, null, {
        xhr: {
          getResponseHeader() {
            return 90
          },
        },
      })
      return this.artworks.totalCount.should.equal(90)
    })
  })

  describe("#fillwidthDimensions", () =>
    it("maps the artworks into a dimensions array for fillwidth", function () {
      this.artworks.reset([
        fabricate("artwork", {
          images: [
            {
              original_width: 100,
              original_height: 200,
              aspect_ratio: 0.7,
            },
          ],
        }),
      ])
      this.artworks.fillwidthDimensions(260)[0].width.should.equal(182)
      return this.artworks.fillwidthDimensions(260)[0].height.should.equal(260)
    }))

  describe("#groupByColumnsInOrder", () =>
    it("groups models into an array of columns for rendering by the artwork columns component", function () {
      _.times(14, () => this.artworks.add(fabricate("artwork")))
      this.artworks.length.should.equal(15)
      const columns = this.artworks.groupByColumnsInOrder(3)
      columns.should.have.lengthOf(3)
      for (let column of Array.from(columns)) {
        column.should.have.lengthOf(5)
      }
      columns[0][0].get("id").should.equal(this.artworks.first().get("id"))
      columns[1][0].get("id").should.equal(this.artworks.at(1).get("id"))
      return columns[2][0].get("id").should.equal(this.artworks.at(2).get("id"))
    }))

  describe("@fromSale", function () {
    it("returns sale info injected in artworks", function () {
      const artworks = Artworks.fromSale(
        new Backbone.Collection([
          {
            artwork: fabricate("artwork"),
            user_notes: "The vomit on this canvas is truely exquisit.",
          },
        ])
      )
      return artworks
        .first()
        .related()
        .saleArtwork.get("user_notes")
        .should.containEql("vomit")
    })

    return it("sets the current bid", function () {
      const artworks = Artworks.fromSale(
        new Backbone.Collection([
          {
            artwork: fabricate("artwork"),
            display_highest_bid_amount_dollars: "$10",
          },
        ])
      )
      return artworks
        .first()
        .related()
        .saleArtwork.currentBid()
        .should.containEql("$10")
    })
  })

  describe("#hasAny", () =>
    it("returns true if any artworks have a blurb", function () {
      this.artworks.hasAny("blurb").should.be.false()
      this.artworks.first().set("blurb", "Existence!")
      return this.artworks.hasAny("blurb").should.be.true()
    }))

  return describe("#maxBlurbHeight", () =>
    it("returns a pixel value based on the estimated height of the longest blurb", function () {
      this.artworks.maxBlurbHeight(true).should.equal("26px") // A single line
      _.isUndefined(this.artworks.maxBlurbHeight(false)).should.be.true()
      this.artworks.first().set("blurb", "Existence!")
      this.artworks.maxBlurbHeight(true).should.equal("31px")
      this.artworks
        .last()
        .set(
          "blurb",
          "Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence!"
        )
      return this.artworks.maxBlurbHeight(true).should.equal("82px")
    }))
})
