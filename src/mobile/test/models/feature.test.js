/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Backbone = require("backbone")
const sinon = require("sinon")
const Feature = require("../../models/feature")
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")

describe("Feature", function () {
  beforeEach(function () {
    this.feature = new Feature(fabricate("feature"))
    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#hasImage", () =>
    it("returns false if version not there", function () {
      this.feature.set({ image_versions: [] })
      return this.feature.hasImage("wide").should.not.be.ok()
    }))
})
