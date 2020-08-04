/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Genes = require("../../../collections/genes")
const routes = require("../routes")
const sinon = require("sinon")

describe("Artists routes", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.res = { render: sinon.stub() })
  })

  afterEach(() => Backbone.sync.restore())

  return it("returns a successful fetch/response of the sets", function () {
    routes.index({ path: "/artists" }, this.res)
    Backbone.sync.args[0][2].success([fabricate("set")])
    Backbone.sync.args[1][2].success([fabricate("gene"), fabricate("gene")])
    return this.res.render.args[0][1].genes.length.should.be.above(1)
  })
})
