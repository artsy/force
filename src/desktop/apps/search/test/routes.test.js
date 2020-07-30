/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const routes = require("../routes")
const Search = require("../../../collections/search")
const { fabricate } = require("@artsy/antigravity")

describe("Search routes", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  describe("#image", function () {
    before(function () {
      this.req = {
        params: { model: "artist", id: "foo-bar" },
        pipe: sinon.stub().returns({ pipe: sinon.stub() }),
      }
      return (this.res = { status: sinon.stub() })
    })

    xit("pipes the image request", function () {
      routes.image(this.req, this.res)
      return decodeURIComponent(this.req.pipe.args[0][0].url).should.containEql(
        "/artist/foo-bar/image"
      )
    })

    return xit("sets the status code", function () {
      routes.image(this.req, this.res)
      const imgReq = this.req.pipe.args[0][0]
      imgReq.res = { statusCode: 400 }
      imgReq.emit("end")
      return this.res.status.args[0][0].should.equal(400)
    })
  })

  return describe("#index", function () {
    it("makes the appropriate request and removes accents", function () {
      const req = { params: {}, query: { q: "f\uFF4Fob\u00C0r" } }
      const res = { render: sinon.stub(), locals: { sd: {} } }
      routes.index(req, res)
      Backbone.sync.args[0][0].should.equal("read")
      return Backbone.sync.args[0][2].data.term.should.equal("foobAr")
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
  })
})
