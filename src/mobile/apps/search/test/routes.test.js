/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Q = require("bluebird-q")
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const routes = require("../routes")
const { fabricate } = require("@artsy/antigravity")

describe("Search routes", () =>
  describe("#index", () =>
    describe("success", function () {
      beforeEach(() => sinon.stub(Backbone, "sync").returns(Q.resolve()))

      afterEach(() => Backbone.sync.restore())

      it("makes the appropriate request and removes accents", function (done) {
        const req = { params: {}, query: { term: "f\uFF4Fob\u00C0r" } }
        const res = { render: sinon.stub(), locals: { sd: {} } }
        const next = sinon.stub()

        routes.index(req, res, next)

        Backbone.sync.args[0][0].should.equal("read")
        Backbone.sync.args[0][2].data.term.should.equal("foobAr")

        return done()
      })

      it("works with query", function () {
        const req = { params: {}, query: { q: "percy" } }
        const res = { render: sinon.stub(), locals: { sd: {} } }
        routes.index(req, res)
        Backbone.sync.args[0][2].success([{}])
        return res.render.called.should.be.ok
      })

      it("works with term", function () {
        const req = { params: {}, query: { term: "percy" } }
        const res = { render: sinon.stub(), locals: { sd: {} } }
        routes.index(req, res)
        Backbone.sync.args[0][2].success([{}])
        return res.render.called.should.be.ok
      })

      return it("redirects without query or term", function () {
        const req = { params: {}, query: {} }
        const res = { redirect: sinon.stub(), locals: { sd: {} } }
        routes.index(req, res)
        return res.redirect.args[0][0].should.equal("/")
      })
    })))
