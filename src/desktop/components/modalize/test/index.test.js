/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const modalize = require("../index")

class SampleView extends Backbone.View {
  render() {
    this.$el.html("SampleView")
    return this
  }
}

describe("modalize", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      $.support.transition = { end: "transitionend" }
      $.fn.emulateTransitionEnd = function () {
        return this.trigger($.support.transition.end)
      }
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.view = new SampleView()
    return (this.modal = modalize(this.view, {
      dimensions: { width: "456px" },
    }))
  })

  afterEach(function (done) {
    return this.modal.close(done)
  })

  describe("#open", function () {
    it("opens the modal", function () {
      $(".modalize").should.have.lengthOf(0)
      this.modal.open()
      return $(".modalize").should.have.lengthOf(1)
    })

    it("sets the correct width", function () {
      this.modal.open()
      this.modal.opened.should.be.true()
      return $(".modalize-dialog").width().should.equal(456)
    })

    return it("avoids being double opened", function () {
      $(".modalize").should.have.lengthOf(0)
      this.modal.open()
      $(".modalize").should.have.lengthOf(1)
      this.modal.open()
      this.modal.open()
      this.modal.open()
      return $(".modalize").should.have.lengthOf(1)
    })
  })

  describe("#close", () =>
    it("closes the modal", function (done) {
      $(".modalize").should.have.lengthOf(0)
      this.modal.open()
      $(".modalize").should.have.lengthOf(1)
      return this.modal.close(function () {
        $(".modalize").should.have.lengthOf(0)
        return done()
      })
    }))

  describe("#load", function () {
    it("sets the loading state; accepts a callback; removes the loading state when done", function (specDone) {
      return this.modal.load(modalDone => {
        this.modal.view.$el.hasClass("is-loading").should.be.true()
        modalDone()
        this.modal.view.$el.hasClass("is-loading").should.be.false()
        return specDone()
      })
    })

    return describe("rendering", function () {
      beforeEach(() => sinon.spy(SampleView.prototype, "render"))

      afterEach(function () {
        return this.modal.subView.render.restore()
      })

      return it("only renders the inner view once done has been called", function (specDone) {
        this.modal.subView.render.called.should.be.false()
        return this.modal.load(modalDone => {
          this.modal.subView.render.called.should.be.false()
          modalDone()
          this.modal.subView.render.called.should.be.true()
          this.modal.subView.render.callCount.should.equal(1)
          return specDone()
        })
      })
    })
  })

  return describe("behavior", function () {
    beforeEach(function () {
      return this.modal.open()
    })

    it("renders the subView", () =>
      $("body").html().should.containEql("SampleView"))

    it("is able to be closed by clicking the close button", function (done) {
      $(".js-modalize-close").click()
      $(".modalize").should.have.lengthOf(1)
      return _.defer(function () {
        $(".modalize").should.have.lengthOf(0)
        return done()
      })
    })

    it("is able to be closed by clicking the backdrop", function (done) {
      $(".js-modalize-backdrop").click()
      $(".modalize").should.have.lengthOf(1)
      return _.defer(function () {
        $(".modalize").should.have.lengthOf(0)
        return done()
      })
    })

    return it("allows the dialog to be visually transitioned", function (done) {
      let view
      return (view = this.modal.view).dialog("slide-out", function () {
        view.$dialog.attr("data-state").should.equal("slide-out")
        return view.dialog("slide-in", function () {
          view.$dialog.attr("data-state").should.equal("slide-in")
          return done()
        })
      })
    })
  })
})
