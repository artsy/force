import Backbone from "backbone"
import { fabricate } from "@artsy/antigravity"
const Items = require("../items.coffee")

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
      items.url().should.containEql("/api/v1/set/foobar/items")
    })
  })

  describe("#model", () => {
    it("news up the appropriate class", () => {
      items.at(0).constructor.name.should.equal("FeaturedLink")
      items.at(1).constructor.name.should.equal("Item")
    })
  })
})
