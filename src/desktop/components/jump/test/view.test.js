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
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      this.view = new JumpView()
      return done()
    })
  })

  afterEach(() => benv.teardown())

  describe("#initialize", function () {
    it("should have some defaults", function () {
      this.view.state.should.equal("hidden")
      this.view.isScrolling.should.equal(false)
      return this.view.$el.attr("data-state").should.equal("hidden")
    })

    return it("accepts a direction", function () {
      let jump = new JumpView({ direction: "bottom" })
      jump.$el.hasClass("from-bottom").should.be.true()
      jump = new JumpView()
      return jump.$el.hasClass("from-top").should.be.true()
    })
  })

  describe("#toggle", () =>
    it("toggles between view states depending on the position of the window scrollTop", function () {
      this.view.state.should.equal("hidden")
      this.view.toggle()
      this.view.state.should.equal("hidden")
      const scrollStub = sinon.stub(
        $.fn,
        "scrollTop",
        () => this.view.threshold + 1
      )
      this.view.state.should.equal("hidden")
      this.view.toggle()
      this.view.state.should.equal("visible")
      return $(window).scrollTop.restore()
    })) // Restore

  describe("#shouldBe", () =>
    it("sets the view state and data-state on the $el", function () {
      this.view.state.should.equal("hidden")
      this.view.shouldBe("visible")
      this.view.state.should.equal("visible")
      return this.view.$el.data("state").should.equal("visible")
    }))

  return describe("Scrolling", function () {
    beforeEach(function () {
      return (this.animateSpy = sinon.spy($.fn, "animate"))
    })
    afterEach(function () {
      return this.animateSpy.restore()
    })

    describe("#scrollToPosition", () =>
      it("scrolls to a position on the page", function () {
        this.view.scrollToPosition(200)
        this.animateSpy.args[0][0].scrollTop.should.equal(200)
        return this.animateSpy.args[0][1].should.equal(this.view.duration)
      }))

    return describe("#scrollToTop", () =>
      it("scrolls to the top of the page and hides the navigation", function () {
        this.view.shouldBe("visible")
        this.view.scrollToTop()
        this.animateSpy.args[0][0].scrollTop.should.equal(0)
        return this.view.$el.data("state").should.equal("hidden")
      }))
  })
})
