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

describe("AboutRouter", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      this.AboutRouter = rewire("../../client/router")
      this.AboutRouter.__set__("AboutView", Backbone.View)
      sinon.stub(_, "defer", cb => cb())
      return done()
    })
  })

  afterEach(function () {
    _.defer.restore()
    return benv.teardown()
  })

  beforeEach(function () {
    const jumpProto = this.AboutRouter.__get__("JumpView").prototype
    sinon.stub(jumpProto, "scrollToTop")
    sinon.stub(jumpProto, "scrollToPosition")
    return (this.router = new this.AboutRouter())
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
    beforeEach(function () {
      sinon.stub($.fn, "offset").returns({ top: 200 })
      this.router.view.$spinner = $("<div>")
      return (this.router.view.loadUptoSection = (selector, cb) => cb())
    })

    afterEach(() => $.fn.offset.restore())

    return it("navigates to the section", function () {
      this.router.toSection("section2")
      this.router.jump.scrollToPosition.called.should.be.true()
      this.router.jump.scrollToPosition.args[0][0].should.equal(201)
      return this.router.view.$spinner.data("state").should.equal("loaded")
    })
  })
})
