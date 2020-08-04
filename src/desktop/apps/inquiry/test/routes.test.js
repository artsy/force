/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const routes = require("../routes")

describe("inquiry routes", function () {
  beforeEach(function () {
    this.req = { params: "foobar" }
    this.res = { render: sinon.stub(), locals: { sd: {} } }
    this.next = sinon.stub()

    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  describe("#index", function () {
    it("handles errors", function () {
      Backbone.sync.yieldsTo("error")
      routes.index(this.req, this.res, this.next)
      return this.res.render.called.should.be.false()
    })

    return it("fetches the artwork and renders the template", function () {
      Backbone.sync.yieldsTo("success", fabricate("artwork", { id: "foobar" }))

      routes.index(this.req, this.res, this.next)

      this.res.locals.sd.ARTWORK.id.should.equal("foobar")
      this.res.render.called.should.be.true()
      this.res.render.args[0][0].should.equal("index")
      return this.res.render.args[0][1].artwork.id.should.equal("foobar")
    })
  })

  return describe("#user_outcome", () =>
    it("fetches the inquiry and renders the template", function () {
      Backbone.sync.yieldsTo("success", fabricate("inquiry", { id: "foobar" }))

      this.req = {
        params: { id: "foobar" },
        query: { outcome_token: "123123", option: "selected+option" },
      }
      routes.user_outcome(this.req, this.res, this.next)

      this.res.locals.sd.INQUIRY.id.should.equal("foobar")
      this.res.render.called.should.be.true()
      this.res.render.args[0][0].should.equal("user_outcome")
      return this.res.render.args[0][1].inquiry.id.should.equal("foobar")
    }))
})
