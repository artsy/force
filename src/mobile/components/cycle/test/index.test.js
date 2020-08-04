/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Cycle = require("../index.coffee")

describe("Cycle", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    return (this.clock = sinon.useFakeTimers())
  })

  afterEach(function () {
    return this.clock.restore()
  })

  return describe("#step", function () {
    before(function () {
      $("body").html(`\
<div id='bicycle-built-for-two'> \
<img id='first' src='/first.jpg'> \
<img id='second' src='/second.jpg'> \
</div>\
`)
      this.cycle = new Cycle({
        $el: (this.$el = $("#bicycle-built-for-two")),
        selector: "img",
      })
      this.$first = this.$el.find("#first")
      return (this.$second = this.$el.find("#second"))
    })

    return describe("step", () =>
      it("steps the cycle", function () {
        this.cycle.started.should.be.false()

        // Step #1
        this.cycle.step()
        this.cycle.started.should.be.true()

        this.$first.hasClass("is-active").should.be.true()
        this.$first.attr("style").should.containEql("z-index: 2; opacity: 1;")
        this.$second.hasClass("is-active").should.be.false()

        // Step #2
        this.cycle.step()

        this.$first.hasClass("is-active").should.be.false()
        this.$first.attr("style").should.containEql("z-index: 1; opacity: 0;")
        this.$second.hasClass("is-active").should.be.true()
        this.$second.attr("style").should.containEql("z-index: 2; opacity: 1;")

        // Step #3 (loops back around)
        this.cycle.step()

        this.$first.hasClass("is-active").should.be.true()
        this.$first.attr("style").should.containEql("z-index: 2; opacity: 1;")
        this.$second.hasClass("is-active").should.be.false()
        return this.$second
          .attr("style")
          .should.containEql("z-index: 1; opacity: 0;")
      }))
  })
})
