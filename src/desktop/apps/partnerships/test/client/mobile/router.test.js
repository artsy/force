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

describe("GalleryPartnershipsRouter", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      this.Router = rewire("../../../client/mobile/router")
      this.Router.__set__("View", Backbone.View)
      return done()
    })
  })

  after(() => benv.teardown())

  return describe("#toSection", function () {
    beforeEach(function () {
      this.router = new this.Router()
      this.window = this.router.$window = { scrollTop: sinon.stub() }
      return sinon.stub($.fn, "offset").returns({ top: 200 })
    })

    afterEach(() => $.fn.offset.restore())

    return it("navigates to the section", function () {
      this.router.toSection("section2")
      this.window.scrollTop.called.should.be.true()
      return this.window.scrollTop.args[0][0].should.equal(200)
    })
  })
})
