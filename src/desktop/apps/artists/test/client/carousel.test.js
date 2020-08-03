/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const Backbone = require("backbone")
const sinon = require("sinon")
const { fabricate } = require("@artsy/antigravity")
const Artist = require("../../../../models/artist")

const elWidth = 1000
const fixture = `\
<div class='artists-featured-carousel' style='width: ${elWidth}px;'>
  <div class='afc-next'></div>
  <div class='afc-prev'></div>
  <div class='afc-track'>
    <div class='afc-artist' style='width: 50%; float: left;'></div>
    <div class='afc-artist' style='width: 50%; float: left;'></div>
    <div class='afc-artist' style='width: 50%; float: left;'></div>
    <div class='afc-artist' style='width: 50%; float: left;'></div>
    <div class='afc-artist' style='width: 50%; float: left;'></div>
    <div class='afc-artist' style='width: 50%; float: left;'></div>
  </div>
</div>\
`

describe("CarouselView", function () {
  before(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      $.support.transition = { end: "transitionend" }
      $.fn.emulateTransitionEnd = function () {
        return this.trigger($.support.transition.end)
      }
      this.CarouselView = require("../../client/carousel.coffee")
      return done()
    })
  })

  after(() => benv.teardown())

  beforeEach(function () {
    this.view = new this.CarouselView({ el: $(fixture), skipN: 2 })
    return this.view.updateValues($.Event())
  }) // Imitate imagesLoaded

  afterEach(function () {
    return delete this.view
  })

  describe("#initalize", function () {
    it("starts at the beginning", function () {
      return this.view.$el.data("position").should.equal("start")
    })
    it("parses the panels", function () {
      return this.view.$panels.length.should.equal(6)
    })
    it("sets the stop positions", function () {
      this.view.positions.length.should.equal(this.view.$panels.length)
      return _.each(this.view.positions, position =>
        position.should.be.type("number")
      )
    })
    return it("sets fixed pixel dimensions on the panels", function () {
      return this.view.$panels
        .first()
        .attr("style")
        .should.containEql(`width: ${elWidth / this.view.increment}px`)
    })
  })

  describe("#setPosition", () =>
    it("sets the position appropriately", function () {
      this.view.active = 2
      this.view.setPosition()
      this.view.$el.attr("data-position").should.equal("middle")
      this.view.active = 0
      this.view.setPosition()
      this.view.$el.attr("data-position").should.equal("start")
      this.view.active = 4
      this.view.setPosition()
      this.view.$el.attr("data-position").should.equal("end")
      this.view.active = 6
      this.view.setPosition()
      return this.view.$el.attr("data-position").should.equal("end")
    }))

  describe("#moveToActive", function () {
    it("disallows movement past the bounds of the positions array", function () {
      this.view.setPosition = sinon.stub()
      this.view.active = -1
      this.view.moveToActive()
      this.view.active.should.equal(0)
      this.view.setPosition.called.should.not.be.ok()
      this.view.active = this.view.positions.length + 1
      this.view.moveToActive()
      this.view.active.should.equal(this.view.stopAt)
      return this.view.setPosition.called.should.not.be.ok()
    })
    return it("moves the track to the appropriate position", function () {
      this.view.active = 2
      this.view.moveToActive()
      return this.view.$track
        .css("marginLeft")
        .should.equal(`-${this.view.positions[this.view.active]}px`)
    })
  })

  describe("#next", function () {
    it("increments the active attribute", function () {
      this.view.active.should.equal(0)
      this.view.next()
      this.view.active.should.equal(this.view.increment)
      this.view.next()
      return this.view.active.should.equal(this.view.increment * 2)
    })
    return it("calls #moveToActive", function () {
      this.view.moveToActive = sinon.stub()
      this.view.next()
      this.view.next()
      return this.view.moveToActive.calledTwice.should.be.ok()
    })
  })

  return describe("#prev", function () {
    it("increments the active attribute", function () {
      this.view.active.should.equal(0)
      this.view.prev()
      this.view.active.should.equal(0)
      this.view.active = 4
      this.view.prev()
      return this.view.active.should.equal(4 - this.view.increment)
    })
    return it("calls #moveToActive", function () {
      this.view.moveToActive = sinon.stub()
      this.view.prev()
      this.view.prev()
      return this.view.moveToActive.calledTwice.should.be.ok()
    })
  })
})
