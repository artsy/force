/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const ShowsFeed = require("../../collections/shows_feed")

describe("ShowsFeed", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.shows = new ShowsFeed([fabricate("show"), fabricate("show")]))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#parse", function () {
    it("returns the results from the json", function () {
      return this.shows
        .parse({ results: [{ foo: "bar" }] })[0]
        .foo.should.equal("bar")
    })

    return it("sets the next cursor", function () {
      this.shows.parse({ next: "foobar" })
      return this.shows.nextCursor.should.equal("foobar")
    })
  })

  return describe("#nextPage", function () {
    beforeEach(function () {
      this.shows.nextCursor = "foobar"
      return this.shows.nextPage()
    })

    it("fetches the next page of results based off the last cursor", () =>
      Backbone.sync.args[0][2].data.cursor.should.equal("foobar"))

    it("adds to the collection", () =>
      Backbone.sync.args[0][2].remove.should.equal(false))

    return it("doesnt fetch any further if the cursor is the same", function () {
      Backbone.sync.args[0][2].success({ results: [], next: "foo" })
      this.shows.nextPage()
      Backbone.sync.args[1][2].success({ results: [], next: "foo" })
      this.shows.nextPage().should.equal(false)
      return (Backbone.sync.args[2] != null).should.not.be.ok()
    })
  })
})
