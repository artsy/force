/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const ViewHelpers = require("../helpers/view_helpers.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("Fairs", () =>
  describe("#fillRows", function () {
    it("returns one full width show if only one x-large show exists", function () {
      const fairs = [fabricate("fair", { id: "fair1", banner_size: "x-large" })]
      const rows = ViewHelpers.fillRows(fairs)
      rows.length.should.eql(1)
      rows[0].type.should.eql("full")
      return rows[0].fairs[0].id.should.eql("fair1")
    })

    it("returns one row with a equal sized banners if two fairs that are not x-large", function () {
      const fairs = [
        fabricate("fair", { id: "fair1", banner_size: "large" }),
        fabricate("fair", { id: "fair2", banner_size: "medium" }),
      ]
      const rows = ViewHelpers.fillRows(fairs)
      rows.length.should.eql(1)
      rows[0].type.should.eql("half")
      return rows[0].fairs.length.should.eql(2)
    })

    return it("returns two rows with one full size and two equal sized banners", function () {
      const fairs = [
        fabricate("fair", { id: "fair1", banner_size: "x-large" }),
        fabricate("fair", { id: "fair2", banner_size: "large" }),
        fabricate("fair", { id: "fair3", banner_size: "medium" }),
      ]
      const rows = ViewHelpers.fillRows(fairs)
      rows.length.should.eql(2)
      rows[0].type.should.eql("full")
      rows[0].fairs.length.should.eql(1)
      rows[1].type.should.eql("half")
      return rows[1].fairs.length.should.eql(2)
    })
  }))
