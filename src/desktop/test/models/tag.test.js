/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Tag = require("../../models/tag.coffee")
const sinon = require("sinon")

describe("Tag", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.tag = new Tag(fabricate("tag")))
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#fetchFilterSuggest", () =>
    it("fetches the filter meta data", function (done) {
      this.tag.fetchFilterSuggest(
        { sort: "-foo" },
        {
          success(m, res) {
            res.total.should.equal(100)
            return done()
          },
        }
      )
      Backbone.sync.args[0][2].data.sort.should.equal("-foo")
      return Backbone.sync.args[0][2].success({ total: 100 })
    }))
})
