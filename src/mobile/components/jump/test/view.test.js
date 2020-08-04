/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const JumpView = require("../view.coffee")
const { resolve } = require("path")

describe("JumpView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      this.view = new JumpView()
      return done()
    })
  })

  afterEach(() => benv.teardown())

  describe("#initialize", () =>
    it("should have some defaults", function () {
      return this.view.isScrolling.should.equal(false)
    }))

  return describe("Scrolling", function () {
    beforeEach(function () {
      return (this.animateSpy = sinon.spy($.fn, "animate"))
    })
    afterEach(function () {
      return this.animateSpy.restore()
    })

    return describe("#scrollToPosition", () =>
      it("scrolls to a position on the page", function () {
        this.view.scrollToPosition(200)
        this.animateSpy.args[0][0].scrollTop.should.equal(200)
        return this.animateSpy.args[0][1].should.equal(this.view.duration)
      }))
  })
})
