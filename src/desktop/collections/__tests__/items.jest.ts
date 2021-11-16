import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
const Items = require("../items")

describe("Items", () => {
  let items

  beforeEach(() => {
    Backbone.sync = jest.fn()
    items = new Items([fabricate("featured_link"), {}], {
      id: "foobar",
    })
  })

  describe("#url", () => {
    it("should the appropriate url", () => {
      items.id.should.equal("foobar")
      expect(items.url()).toEqual(expect.stringContaining("/api/v1/set/foobar/items"))
    })
  })

  describe("#model", () => {
    it("news up the appropriate class", () => {
      expect(items.at(0).constructor.name).toEqual("FeaturedLink")
      expect(items.at(1).constructor.name).toEqual("Item")
    })
  })
})
