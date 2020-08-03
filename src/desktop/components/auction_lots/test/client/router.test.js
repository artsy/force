/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")

describe("AuctionResultsRouter", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      this.AuctionResultsRouter = rewire("../../client/router")
      this.AuctionResultsRouter.__set__(
        "DetailView",
        (this.detailStub = sinon.stub())
      )
      return done()
    })
  })

  after(() => benv.teardown())

  beforeEach(function () {
    this.AuctionResultsRouter.prototype.close = this.closeStub = sinon.stub()
    return (this.router = new this.AuctionResultsRouter())
  })

  describe("#initialize", () =>
    // FIXME: fails intermittently in circle
    xit("sets the original path", function () {
      return this.router.originalPath.should.be.an.instanceOf(String)
    }))

  return describe("#details", function () {
    // FIXME: fails intermittently in circle
    xit("calls out to #close if the originalPath is the same as the current path", function () {
      this.router.details()
      return this.closeStub.called.should.be.ok()
    })

    return it("news up a DetailView if the path is different", function () {
      this.router.originalPath = "something/else"
      this.router.details()
      this.closeStub.called.should.not.be.ok()
      return this.detailStub.called.should.be.ok()
    })
  })
})
