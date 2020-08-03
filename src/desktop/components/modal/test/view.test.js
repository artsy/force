/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const rewire = require("rewire")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const mediator = require("../../../lib/mediator.coffee")
const { resolve } = require("path")
const ModalView = benv.requireWithJadeify(resolve(__dirname, "../view"), [
  "modalTemplate",
])

xdescribe("ModalView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })

      Backbone.$ = $
      $.support.transition = { end: "transitionend" }
      $.fn.emulateTransitionEnd = function () {
        return this.trigger($.support.transition.end)
      }

      return benv.render(resolve(__dirname, "../template.jade"), {}, () => {
        this.closeSpy = sinon.spy(ModalView.prototype, "close")
        this.openSpy = sinon.spy(ModalView.prototype, "open")
        this.mediatorSpy = sinon.spy(mediator, "trigger")
        this.view = new ModalView({ $container: $("#modal-container") })
        return done()
      })
    })
  })

  afterEach(function () {
    this.closeSpy.restore()
    this.openSpy.restore()
    this.mediatorSpy.restore()
    this.view.close()
    benv.teardown()
    return mediator.off()
  })

  describe("#initialize", function () {
    it("Sets up some sensible defaults", function () {
      return this.view.dimensions.should.eql({ width: "400px" })
    })

    return it("Should auto-open", function () {
      return this.openSpy.called.should.be.ok()
    })
  })

  describe("#escape", () =>
    it("is triggered by the escape keyup event; publishes 'modal:close'", function (done) {
      mediator.on("modal:close", function () {
        true.should.be.ok()
        return done()
      })
      return $(window).trigger($.Event("keyup", { which: 27 }))
    }))

  describe("#open", function () {
    describe("#setup", function () {
      it("renders the inner template function", function () {
        return this.view.$el.html().should.containEql("Requires a template")
      })

      it("set the $dialog width", function () {
        return this.view.$dialog.width().should.equal(400)
      })

      it("disables scrolling on the document body", () =>
        $("body").hasClass("is-scrolling-disabled").should.be.ok())

      it("sets the default classes", function () {
        const classes = this.view.$el.attr("class")
        classes.should.containEql("is-fade-in")
        return classes.should.containEql("has-backdrop")
      })

      return it("should be able to accept backdrop and transition options", function () {
        let modal = new ModalView({
          $container: $("#modal-container"),
          backdrop: false,
        })
        let classes = modal.$el.attr("class")
        classes.should.containEql("is-fade-in")
        classes.should.containEql("has-nobackdrop")

        modal = new ModalView({
          $container: $("#modal-container"),
          backdrop: false,
          transition: "slide",
        })
        classes = modal.$el.attr("class")
        classes.should.containEql("is-slide-in")
        return classes.should.containEql("has-nobackdrop")
      })
    })

    return it("triggers 'modal:opened' on the mediator", function () {
      return this.mediatorSpy.args[0][0].should.equal("modal:opened")
    })
  })

  describe("#close", function () {
    it("should set the $el state", function () {
      this.view.close()
      return this.view.$el.data("state").should.equal("closed")
    })

    it("should accept a callback", function (done) {
      return this.view.close(done)
    })

    return it("should ignore arguments that arent functions", function (done) {
      this.view.close("ignoreme")
      return done()
    })
  })

  return describe("interaction", function () {
    it("removes itself when the close button is clicked", function () {
      this.view.$(".modal-close").click()
      return this.closeSpy.called.should.be.ok()
    })

    return it("removes itself when the backdrop is clicked", function () {
      this.view.$(".modal-backdrop").click()
      return this.closeSpy.called.should.be.ok()
    })
  })
})
