/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const FeaturedLinks = require("../../collections/featured_links")
const { fabricate } = require("@artsy/antigravity")

describe("FeaturedLinks", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.links = new FeaturedLinks([
      fabricate("featured_link"),
      fabricate("featured_link"),
    ]))
  })

  afterEach(() => Backbone.sync.restore())

  return describe("@fetchHomepageSet", function () {
    it("fetches from the homepage:features key", function () {
      FeaturedLinks.fetchHomepageSet()
      return Backbone.sync.args[0][1].url.should.containEql("homepage:features")
    })

    return it("calls back with the featured links", function (done) {
      FeaturedLinks.fetchHomepageSet({
        success(links) {
          links.first().get("title").should.equal("Kittens are the new black!")
          return done()
        },
      })
      Backbone.sync.args[0][2].success({ id: "foobar" })
      return Backbone.sync.args[1][2].success([
        fabricate("featured_link", { title: "Kittens are the new black!" }),
        fabricate("featured_link"),
      ])
    })
  })
})
