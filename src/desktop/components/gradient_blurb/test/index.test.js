/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const blurb = require("../index")
const sinon = require("sinon")

describe("blurb", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      $.fn.imagesLoaded = cb => cb()
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    $("body").html(`\
<div class='to-blurb' style='height: 400px'>A short text ...</div>\
`)
    return (this.$el = $(".to-blurb"))
  })

  describe("long text", () =>
    it("blurbifies the text if height is greater than limit", function () {
      blurb(this.$el, { limit: 399, label: "Read more by clicking here" })
      this.$el.css("max-height").should.equal("399px")
      this.$el.hasClass("gradient-blurb").should.be.true()
      this.$el.find(".gradient-blurb-read-more").should.have.lengthOf(1)
      return this.$el
        .find(".gradient-blurb-read-more")
        .text()
        .trim()
        .should.equal("Read more by clicking here")
    }))

  describe("short text", () =>
    it("does not blurbify the text if height is not greater than limit", function () {
      blurb(this.$el, { limit: 401, label: "Read more by clicking here" })
      this.$el.css("max-height").should.equal("")
      this.$el.hasClass("gradient-blurb").should.be.false()
      return this.$el.find(".gradient-blurb-read-more").should.have.lengthOf(0)
    }))

  describe("with an offset window specified", function () {
    it("blurbifies the text if height is greater than limit and offset window", function () {
      blurb(this.$el, {
        limit: 389,
        label: "Read more by clicking here",
        heightBreakOffset: 10,
      })
      this.$el.css("max-height").should.equal("389px")
      this.$el.hasClass("gradient-blurb").should.be.true()
      this.$el.find(".gradient-blurb-read-more").should.have.lengthOf(1)
      return this.$el
        .find(".gradient-blurb-read-more")
        .text()
        .trim()
        .should.equal("Read more by clicking here")
    })

    return it("does not blurbify text if height is not greater than limit and offset window", function () {
      blurb(this.$el, {
        limit: 399,
        label: "Read more by clicking here",
        heightBreakOffset: 10,
      })
      this.$el.css("max-height").should.equal("")
      this.$el.hasClass("gradient-blurb").should.be.false()
      return this.$el.find(".gradient-blurb-read-more").should.have.lengthOf(0)
    })
  })

  describe("gradient", function () {
    it("renders a gradient by default", function () {
      blurb(this.$el)
      this.$el.hasClass("mask-gradient").should.be.true()
      return this.$el.hasClass("mask-block").should.be.false()
    })

    return it("does not render a gradient", function () {
      blurb(this.$el, { showGradient: false })
      this.$el.hasClass("mask-gradient").should.be.false()
      return this.$el.hasClass("mask-block").should.be.true()
    })
  })

  describe("default button", () =>
    it("renders a default button if options.$button is not provided", function () {
      blurb(this.$el)
      this.$el.hasClass("gradient-blurb").should.be.true()
      return this.$el
        .find(".gradient-blurb-read-more")
        .text()
        .trim()
        .should.equal("Read More")
    }))

  return describe("custom button", () =>
    it("renders a custom button if options.$button is provided", function () {
      const $button = $(`\
<div class='custom-container'>
<a class='custom-button' href='#'>
  Expand
</a>
</div>\
`)

      blurb(this.$el, { $button })

      return this.$el
        .find(".custom-button")
        .text()
        .trim()
        .should.equal("Expand")
    }))
})
