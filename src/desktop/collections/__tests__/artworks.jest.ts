import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
import { times } from "lodash"
const { Artworks } = require("../artworks")

describe("Artworks", () => {
  let artworks

  beforeEach(() => {
    Backbone.sync = jest.fn()
    artworks = new Artworks([fabricate("artwork")])
  })

  describe("#initialize", () => {
    it("attaches to artwork collection its a part of if passed in", () => {
      const as = new Artworks([{ id: "foo" }], { artworkCollection: "foo" })
      as.first().collection.artworkCollection.should.equal("foo")
    })

    it("sets total count on sync", () => {
      artworks.trigger("sync", null, null, {
        xhr: {
          getResponseHeader: jest.fn().mockReturnValue(90),
        },
      })
      artworks.totalCount.should.equal(90)
    })
  })

  describe("#fillwidthDimensions", () => {
    it("maps the artworks into a dimensions array for fillwidth", () => {
      artworks.reset([
        fabricate("artwork", {
          images: [
            {
              aspect_ratio: 0.7,
              original_height: 200,
              original_width: 100,
            },
          ],
        }),
      ])
      artworks.fillwidthDimensions(260)[0].width.should.equal(182)
      artworks.fillwidthDimensions(260)[0].height.should.equal(260)
    })
  })

  describe("#groupByColumnsInOrder", () => {
    it("groups models into an array of columns for rendering by the artwork columns component", () => {
      times(14, () => artworks.add(fabricate("artwork")))
      artworks.length.should.equal(15)
      const columns = artworks.groupByColumnsInOrder(3)
      columns.should.have.lengthOf(3)

      columns[0].should.have.lengthOf(5)
      columns[0][0].get("id").should.equal(artworks.first().get("id"))
      columns[1][0].get("id").should.equal(artworks.at(1).get("id"))
      columns[2][0].get("id").should.equal(artworks.at(2).get("id"))
    })
  })

  describe("#hasAny", () => {
    it("returns true if any artworks have a blurb", () => {
      artworks.hasAny("blurb").should.be.false()
      artworks.first().set("blurb", "Existence!")
      artworks.hasAny("blurb").should.be.true()
    })
  })

  describe("#maxBlurbHeight", () => {
    it("returns a pixel value based on the estimated height of the longest blurb", () => {
      artworks.maxBlurbHeight(true).should.equal("26px") // A single line
      expect(artworks.maxBlurbHeight(false)).toBeUndefined()
      artworks.first().set("blurb", "Existence!")
      artworks.maxBlurbHeight(true).should.equal("31px")
      artworks
        .last()
        .set(
          "blurb",
          "Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence! Existence!"
        )
      artworks.maxBlurbHeight(true).should.equal("82px")
    })
  })
})
