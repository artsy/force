/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const should = require("should")
const Backbone = require("backbone")
const FeaturedLink = require("../../models/featured_link.coffee")
const FeaturedSet = require("../../models/featured_set.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("FeaturedSet", function () {
  beforeEach(function () {
    return (this.set = new FeaturedSet({
      owner: fabricate("feature", { image_versions: ["wide"] }),
      id: "52b347c59c18db5aef000208",
      published: true,
      key: "1",
      name: "Top 10 Posts",
      item_type: "FeaturedLink",
      type: "featured link",
      owner_type: "Feature",
      data: new Backbone.Collection([fabricate("featured_link")], {
        model: FeaturedLink,
      }),
    }))
  })

  it("mixes in Markdown methods", function () {
    return this.set.mdToHtml.should.be.an.instanceof(Function)
  })

  return describe("#models", () =>
    it("provides access to an array of models", function () {
      this.set.models().should.have.lengthOf(1)
      this.set.models().should.be.instanceOf(Array)
      return this.set.models()[0].should.be.instanceOf(FeaturedLink)
    }))
})
