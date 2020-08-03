/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const benv = require("benv")
const Backbone = require("backbone")
const Scrollbar = require("../index")

describe("Scrollbar", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    this.scrollbar = new Scrollbar()
    return (this.scrollbar.hasScrollbar = true)
  })

  it("should always have a body", function () {
    this.scrollbar.$body.length.should.equal(1)
    return this.scrollbar.$els.length.should.equal(1)
  })

  it("sets padding on the body equal to the scrollbarWidth and appends the is-scrolling-disabled class", function () {
    this.scrollbar.scrollbarWidth = 15
    this.scrollbar.disable()
    $("body").attr("style").should.equal("padding-right: 15px;")
    return $("body").hasClass("is-scrolling-disabled").should.be.true()
  })

  it("removes the padding and the modal class", function () {
    this.scrollbar.scrollbarWidth = 15
    this.scrollbar.disable()
    this.scrollbar.reenable()
    $("body").attr("style").should.be.empty
    return $("body").hasClass("is-scrolling-disabled").should.be.false()
  })

  return it("does not add padding (but adds modal class) if there is no scrollbar present", function () {
    this.scrollbar.hasScrollbar = false
    this.scrollbar.disable()
    $("body").attr("style").should.be.empty
    return $("body").hasClass("is-scrolling-disabled").should.be.true()
  })
})
