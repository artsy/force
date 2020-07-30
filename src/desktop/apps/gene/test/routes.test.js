/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const Backbone = require("backbone")
const routes = require("../routes")

describe("Gene routes", function () {
  beforeEach(function () {
    this.req = {
      params: {
        id: "foo",
      },
    }
    this.res = {
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: {
        sd: { APP_URL: "http://localhost:5000", CURRENT_PATH: "/gene/foo" },
      },
    }
    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#index", function () {
    xit("bootstraps the gene", function () {
      // sinon.stub Backbone, 'sync'
      //   .yieldsTo 'success', fabricate('gene', id: 'foo')
      //   .onCall 0
      routes.index(this.req, this.res)
      Backbone.sync.args[0][0].success(fabricate("gene", { id: "foo" }))
      this.res.locals.sd.GENE.id.should.equal("foo")
      return this.res.render.args[0][0].should.equal("index")
    })

    return xit("redirects to the correct URL if the gene slug has been updated", function () {
      sinon
        .stub(Backbone, "sync")
        .yieldsTo("success", fabricate("gene", { id: "not-foo" }))
        .onCall(0)
      return routes.index(this.req, this.res).then(() => {
        this.res.redirect.called.should.be.true()
        this.res.redirect.args[0].should.eql([301, "/gene/not-foo"])
        return this.res.render.called.should.be.false()
      })
    })
  })
})
