/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const routes = require("../routes")
const Shortcut = require("../../../models/shortcut.coffee")

describe("Shortcut routes", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.req = { params: { short: "Shortcut" } }
    return (this.res = {
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: { sd: { APP_URL: "http://localhost:5000" } },
    })
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#index", function () {
    it("redirects to the long url", function () {
      routes.index(this.req, this.res)
      _.last(Backbone.sync.args)[2].success({
        short: "shortcut",
        long: "https://long-url.com",
      })
      return this.res.redirect.args[0][0].should.equal("https://long-url.com")
    })

    return it("lowercases shortcut", function () {
      routes.index(this.req, this.res)
      return _.last(Backbone.sync.args)[1].attributes.id.should.equal(
        "shortcut"
      )
    })
  })
})
