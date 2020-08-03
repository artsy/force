/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const sinon = require("sinon")
const rewire = require("rewire")
const routes = rewire("../routes")

describe("Partnerships routes", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.req = { params: { id: "foo" }, query: {} }
    this.res = {
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: {
        sd: { API_URL: "http://localhost:5000", CURRENT_PATH: "/post/post-id" },
      },
      status: sinon.stub(),
      send: sinon.stub(),
    }
    this.jsonPage = { get: sinon.stub() }
    this.JSONPage = sinon.stub().returns(this.jsonPage)
    return routes.__set__("JSONPage", this.JSONPage)
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#index", () =>
    it("reads the json into locals", function (done) {
      this.res.render = (tmpl, locals) => {
        tmpl.should.equal("index")
        locals.foo.should.equal("bar")
        return done()
      }
      this.req.url = "/gallery-partnerships"
      routes.index(this.req, this.res, done)
      return this.jsonPage.get.args[0][0](null, { foo: "bar" })
    }))
})
