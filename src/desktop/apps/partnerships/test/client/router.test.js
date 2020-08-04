/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const rewire = require("rewire")
const sinon = require("sinon")
const Backbone = require("backbone")

describe("PartnershipsRouter", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      this.Router = rewire("../../client/router")
      this.Router.__set__("View", Backbone.View)
      return done()
    })
  })

  after(() => benv.teardown())

  beforeEach(function () {
    const jumpProto = this.Router.__get__("Jump").prototype
    sinon.stub(jumpProto, "scrollToTop")
    sinon.stub(jumpProto, "scrollToPosition")
    return (this.router = new this.Router())
  })

  afterEach(function () {
    this.router.jump.scrollToTop.restore()
    return this.router.jump.scrollToPosition.restore()
  })

  describe("#toTop", () =>
    it("navigates to the top", function () {
      this.router.$window.scrollTop = () => 1
      this.router.toTop()
      return this.router.jump.scrollToTop.called.should.be.true()
    }))

  return describe("#toSection", function () {
    beforeEach(() => sinon.stub($.fn, "offset").returns({ top: 200 }))

    afterEach(() => $.fn.offset.restore())

    return it("navigates to the section", function () {
      this.router.toSection("section2")
      this.router.jump.scrollToPosition.called.should.be.true()
      return this.router.jump.scrollToPosition.args[0][0].should.equal(200)
    })
  })
})
