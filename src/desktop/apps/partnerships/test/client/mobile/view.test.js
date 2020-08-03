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
const { resolve } = require("path")

describe("GalleryPartnershipsView", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
      })
      Backbone.$ = $
      this.GalleryPartnershipsView = rewire("../../../client/mobile/view")
      $.fn.waypoint = sinon.stub()
      const data = _.extend(require("../../fixture/content.json"), { sd: {} })
      return benv.render(
        resolve(__dirname, "../../../templates/mobile/index.jade"),
        data,
        () => done()
      )
    })
  })

  after(() => benv.teardown())

  beforeEach(function () {
    sinon.stub(this.GalleryPartnershipsView.prototype, "initialize")
    this.view = new this.GalleryPartnershipsView({ el: $("body") })
    return (this.clock = sinon.useFakeTimers())
  })

  afterEach(function () {
    this.clock.restore()
    return this.view.initialize.restore()
  })

  return describe("slideshow", function () {
    before(function () {
      return (this.$fixture = $(`\
<ul>
  <li class='fixture'>a</li>
  <li class='fixture'>b</li>
  <li class='fixture'>c</li>
</ul>\
`))
    })

    return describe("#stepSlide", () =>
      it("toggles one frame at a time and loops back to the beginning", function () {
        this.view.fixtureFrame = 0
        const $frames = this.$fixture.find(".fixture")
        this.view.stepSlide($frames, "fixture")
        this.view.fixtureFrame.should.equal(1)
        this.$fixture.find(".is-active").text().should.equal("a")
        this.view.stepSlide($frames, "fixture")
        this.view.fixtureFrame.should.equal(2)
        this.$fixture.find(".is-active").text().should.equal("b")
        this.view.stepSlide($frames, "fixture")
        this.view.fixtureFrame.should.equal(0)
        this.$fixture.find(".is-active").text().should.equal("c")
        this.view.stepSlide($frames, "fixture")
        this.view.fixtureFrame.should.equal(1)
        return this.$fixture.find(".is-active").text().should.equal("a")
      }))
  })
})
