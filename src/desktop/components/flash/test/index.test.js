/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const benv = require("benv")
const sinon = require("sinon")
const { resolve } = require("path")
const FlashMessage = require("../index")

describe("FlashMessage", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      $.support.transition = { end: "transitionend" }
      $.fn.emulateTransitionEnd = function () {
        return this.trigger($.support.transition.end)
      }
      this.sandbox = sinon.sandbox.create()
      this.startTimerStub = this.sandbox.stub(
        FlashMessage.prototype,
        "startTimer"
      )
      return benv.render(resolve(__dirname, "../template.jade"), {}, () => {
        return done()
      })
    })
  })

  afterEach(function () {
    this.sandbox.restore()
    return benv.teardown()
  })

  describe("#initialize", function () {
    it("requires a message option", () =>
      (() => new FlashMessage()).should.throw("You must pass a message option"))

    it("accepts the message option", function () {
      const flash = new FlashMessage({ message: "A caesura" })
      return flash.message.should.equal("A caesura")
    })

    describe("accepts the autoclose option", function () {
      it("can autoclose", function () {
        const flash = new FlashMessage({
          message: "A caesura",
          autoclose: true,
        })
        return flash.startTimer.called.should.be.true()
      })

      return it("can autoclose", function () {
        const flash = new FlashMessage({
          message: "A caesura",
          autoclose: false,
        })
        return flash.startTimer.called.should.be.false()
      })
    })

    return describe("accepts a backdrop option", function () {
      it("defaults to true", function (done) {
        // `backdrop` defaults to true
        const flash = new FlashMessage({ message: "A caesura" })
        return _.defer(function () {
          flash.$el.hasClass("is-sans-backdrop").should.be.false()
          return done()
        })
      })

      return it("may be false", function (done) {
        const flash = new FlashMessage({
          message: "A caesura",
          backdrop: false,
        })
        return _.defer(function () {
          flash.$el.hasClass("is-sans-backdrop").should.be.true()
          return done()
        })
      })
    })
  })

  describe("#setup", function () {
    beforeEach(function () {
      return (this.flash = new FlashMessage({ message: "Goodbye world." }))
    })

    it("renders the flash message", function () {
      $("#main-layout-flash").length.should.equal(1)
      $(".fullscreen-flash-message").length.should.equal(1)
      return $(".fullscreen-flash-message")
        .text()
        .should.equal("Goodbye world.")
    })

    return it("takes over the el of an existing flash message and updates the message if a flash is already on screen", function (done) {
      this.flash.$container.text().should.equal("Goodbye world.")
      const anotherFlash = new FlashMessage({ message: "Hello world." })
      sinon.spy(anotherFlash, "update")
      return _.defer(() => {
        anotherFlash.update.called.should.be.true()
        this.flash.$container.text().should.equal("Hello world.")
        return done()
      })
    })
  })

  describe("#close", function () {
    beforeEach(function () {
      location.assign = sinon.stub()
      return (this.flash = new FlashMessage({ message: "Goodbye world." }))
    })

    it("removes the flash message when clicked, leaving the container empty", function (done) {
      this.flash.$el.on("transitionend", () =>
        _.defer(function () {
          $("body").html().should.equal('<div id="main-layout-flash"></div>')
          return done()
        })
      )
      return this.flash.$el.click()
    })

    it("redirects if an href is present", function (done) {
      const flash = new FlashMessage({
        message: "A caesura",
        href: "/something/else",
        autoclose: false,
      })
      this.flash.$el.on("transitionend", () =>
        _.defer(function () {
          location.assign.args[0][0].should.equal("/something/else")
          return done()
        })
      )
      return this.flash.$el.click()
    })

    return it("accepts a callback", function (done) {
      const flash = new FlashMessage({ message: "A caesura", autoclose: false })
      return this.flash.close(function () {
        true.should.be.true()
        return done()
      })
    })
  })

  describe("#update", function () {
    beforeEach(function () {
      return (this.flash = new FlashMessage({ message: "Goodbye world." }))
    })

    return it("updates the message", function () {
      $(".fullscreen-flash-message").text().should.equal("Goodbye world.")
      this.flash.update("Hello world.")
      return $(".fullscreen-flash-message").text().should.equal("Hello world.")
    })
  })

  describe("XSS", function () {
    it("escapes HTML", function () {
      const flash = new FlashMessage({
        message: '><img src=x onerror=alert("PWN")>',
      })
      return $("body").text().should.equal('><img src=x onerror=alert("PWN")>')
    })

    return it("allows for HTML when passed the `safe: false` option", function () {
      const flash = new FlashMessage({
        safe: false,
        message: "<strong>I <em>am</em> strong</strong>",
      })
      return $("body").text().should.equal("I am strong")
    })
  })

  return describe("#open", () =>
    it("checks to see if the container is empty before starting the timer", function () {
      const firstFlash = new FlashMessage({ message: "Goodbye world." })
      $("body").text().should.equal("Goodbye world.")
      this.startTimerStub.restore()
      this.startTimerStub = this.sandbox.stub(
        FlashMessage.prototype,
        "startTimer"
      )
      const secondFlash = new FlashMessage({
        message: "A caesura",
        autoclose: true,
      })
      secondFlash.startTimer.called.should.be.false()
      return $("body").text().should.equal("Goodbye world.")
    }))
})
