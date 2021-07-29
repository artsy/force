const sinon = require("sinon")
const Backbone = require("backbone")
const routes = require("../routes")

describe("Search routes", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  describe("#image", function () {
    before(function () {
      this.req = {
        params: { model: "artist", id: "foo-bar" },
        pipe: sinon.stub().returns({ pipe: sinon.stub() }),
      }
      this.res = { status: sinon.stub() }
    })

    it.skip("pipes the image request", function () {
      routes.image(this.req, this.res)
      decodeURIComponent(this.req.pipe.args[0][0].url).should.containEql(
        "/artist/foo-bar/image"
      )
    })

    it.skip("sets the status code", function () {
      routes.image(this.req, this.res)
      const imgReq = this.req.pipe.args[0][0]
      imgReq.res = { statusCode: 400 }
      imgReq.emit("end")
      this.res.status.args[0][0].should.equal(400)
    })
  })

  describe("#index", function () {
    it("makes the appropriate request and removes accents", function () {
      const req = { params: {}, query: { q: "f\uFF4Fob\u00C0r" } }
      const res = { render: sinon.stub(), locals: { sd: {} } }
      routes.index(req, res)
      Backbone.sync.args[0][0].should.equal("read")
      Backbone.sync.args[0][2].data.term.should.equal("foobAr")
    })

    it("works with query", function () {
      const req = { params: {}, query: { q: "percy" } }
      const res = { render: sinon.stub(), locals: { sd: {} } }
      routes.index(req, res)
      Backbone.sync.args[0][2].success([{}])
      res.render.called.should.be.ok
    })

    it("works with term", function () {
      const req = { params: {}, query: { term: "percy" } }
      const res = { render: sinon.stub(), locals: { sd: {} } }
      routes.index(req, res)
      Backbone.sync.args[0][2].success([{}])
      res.render.called.should.be.ok
    })

    it("redirects without query or term", function () {
      const req = { params: {}, query: {} }
      const res = { redirect: sinon.stub(), locals: { sd: {} } }
      routes.index(req, res)
      res.redirect.args[0][0].should.equal("/")
    })
  })
})
