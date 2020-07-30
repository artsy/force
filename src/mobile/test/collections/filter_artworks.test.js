/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const _ = require("underscore")
const Backbone = require("backbone")
const { fabricate2 } = require("@artsy/antigravity")
const FilterArtworks = require("../../collections/filter_artworks")

describe("Filter Artworks", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.artworks = new FilterArtworks(fabricate2("filter_artworks"), {
      parse: true,
    }))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#prepareCounts", function () {
    it("should sort the mediums alphabetically", function () {
      _.keys(this.artworks.counts.medium)[0].should.equal("design")
      _.keys(this.artworks.counts.medium)[1].should.equal("drawing")
      _.keys(this.artworks.counts.medium)[2].should.equal("film-slash-video")
      return _.keys(this.artworks.counts.medium)[3].should.equal("installation")
    })

    return it("should sort the price ranges by value", function () {
      _.keys(this.artworks.counts.price_range)[0].should.equal("*-1000")
      _.keys(this.artworks.counts.price_range)[1].should.equal("1000-5000")
      return _.keys(this.artworks.counts.price_range)[2].should.equal(
        "5000-10000"
      )
    })
  })

  return describe("#sync", () =>
    it("should map related_gene to gene_id", function () {
      this.artworks.fetch({ data: { related_gene: "cabbie" } })
      return Backbone.sync.args[0][2].data.should.equal("gene_id=cabbie")
    }))
})
