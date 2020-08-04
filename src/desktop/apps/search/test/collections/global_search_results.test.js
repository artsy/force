/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const GlobalSearchResults = require("../../collections/global_search_results.coffee")

describe("GlobalSearchResults", () =>
  describe("#parse", function () {
    beforeEach(function () {
      return (this.response = [
        { display: "Artist page", model: "artist", artist: "zoe leonard" },
        {
          display: "Partner Show Page",
          model: "partnershow",
          venue: "Foo Gallery",
        },
      ])
    })

    return it("filters out sensitive results", function () {
      const results = new GlobalSearchResults(this.response, { parse: true })
      return results.length.should.equal(1)
    })
  }))
