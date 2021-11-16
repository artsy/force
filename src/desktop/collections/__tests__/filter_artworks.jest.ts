import { fabricate2 } from "@artsy/antigravity"
import Backbone from "backbone"
import { keys } from "lodash"
const { FilterArtworks } = require("../filter_artworks")

describe("Filter Artworks", () => {
  let artworks

  beforeEach(() => {
    Backbone.sync = jest.fn()
    artworks = new FilterArtworks(fabricate2("filter_artworks"), {
      parse: true,
    })
  })

  describe("#prepareCounts", () => {
    it("should sort the mediums alphabetically", () => {
      expect(keys(artworks.counts.medium)[0]).toBe("design")
      expect(keys(artworks.counts.medium)[1]).toBe("drawing")
      expect(keys(artworks.counts.medium)[2]).toBe("film-slash-video")
      expect(keys(artworks.counts.medium)[3]).toBe("installation")
    })

    it("should sort the price ranges by value", () => {
      expect(keys(artworks.counts.price_range)[0]).toBe("*-1000")
      expect(keys(artworks.counts.price_range)[1]).toBe("1000-5000")
      expect(keys(artworks.counts.price_range)[2]).toBe("5000-10000")
    })
  })

  describe("#sync", () => {
    it("should map related_gene to gene_id", () => {
      artworks.fetch({ data: { related_gene: "cabbie" } })
      Backbone.sync.mock.calls[0][2].data.should.equal("gene_id=cabbie")
    })
  })
})
