/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const template = require("jade").compileFile(
  require.resolve("../templates/index.jade")
)
const fixture = require("./fixture")
const bidIncrements = require("../bid_increments")
const data = _.extend({}, { asset() {}, sd: {} }, fixture, {
  markdown() {},
  bidIncrements,
})

describe("/how-auctions-work", () =>
  describe("index", () =>
    it("renders correctly", () =>
      template(data).should.containEql(
        '<h1 class="haw-page-title">How Artsy Auctions Work</h1>'
      ))))
