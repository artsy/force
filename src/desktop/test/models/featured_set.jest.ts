import Backbone from "backbone"
const FeaturedLink = require("../../models/featured_link.coffee")
const FeaturedSet = require("../../models/featured_set.coffee")
import { fabricate } from "@artsy/antigravity"

describe("FeaturedSet", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.set = new FeaturedSet({
      data: new Backbone.Collection([fabricate("featured_link")], {
        model: FeaturedLink,
      }),
      id: "52b347c59c18db5aef000208",
      item_type: "FeaturedLink",
      key: "1",
      name: "Top 10 Posts",
      owner: fabricate("feature", { image_versions: ["wide"] }),
      owner_type: "Feature",
      published: true,
      type: "featured link",
    })
  })

  it("mixes in Markdown methods", () => {
    testContext.set.mdToHtml.should.be.an.instanceof(Function)
  })

  describe("#models", () => {
    it("provides access to an array of models", () => {
      testContext.set.models().should.have.lengthOf(1)
      testContext.set.models().should.be.instanceOf(Array)
      testContext.set.models()[0].should.be.instanceOf(FeaturedLink)
    })
  })
})
