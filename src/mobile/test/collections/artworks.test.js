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

  describe("@fromSale", function () {
    it("returns sale info inject in artworks", function () {
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

  return describe("#groupByColumnsInOrder", () =>
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
})
