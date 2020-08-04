/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")

describe("blurb", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
      })
      window.jQuery = $
      $.fn.imagesLoaded = cb => cb()
      return done()
    })
  )

  after(() => benv.teardown())

  describe("long text", function () {
    beforeEach(function () {
      $("body").html(`\
<div class='to-blurb' style='height: 400px'>A long text ...</div>\
`)
      return (this.$el = $(".to-blurb"))
    })

    return it("blurbifies the text", function () {
      const blurb = require("../index")
      blurb(this.$el, { limit: 399, label: "Read more by clicking here" })
      this.$el.css("max-height").should.equal("399px")
      this.$el.hasClass("gradient-blurb").should.be.true()
      this.$el.find(".gradient-blurb-read-more").should.have.lengthOf(1)
      return this.$el
        .find(".gradient-blurb-read-more")
        .text()
        .should.equal("Read more by clicking here")
    })
  })

  return describe("short text", function () {
    beforeEach(function () {
      $("body").html(`\
<div class='to-blurb' style='height: 200px'>A short text ...</div>\
`)
      return (this.$el = $(".to-blurb"))
    })

    return it("does not blurbify the text", function () {
      const blurb = require("../index")
      blurb(this.$el, { limit: 399, label: "Read more by clicking here" })

      this.$el.css("max-height").should.equal("")
      this.$el.hasClass("gradient-blurb").should.be.false()
      return this.$el.find(".gradient-blurb-read-more").should.have.lengthOf(0)
    })
  })
})
