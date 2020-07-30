/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const TeamChannelNavView = require("../view.coffee")
const sd = require("sharify").data

describe("TeamChannelView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      $.fn.waypoint = this.waypoint = sinon.stub()
      this.carousel = { navigation: {} }
      this.view = new TeamChannelNavView({
        el: $("<div></div>"),
        $content: $("<div></div>"),
        $waypointEl: $("<div></div>"),
        offset: -400,
      })
      return done()
    })
  })

  afterEach(() => benv.teardown())

  describe("#setupStickyNav", () =>
    it("adds a waypoint", function () {
      this.waypoint.called.should.be.true()
      return this.waypoint.args[0][1].offset.should.equal(-400)
    }))

  return describe("#toggleHamburgerNav", function () {
    it("toggles the hamburger on if it is closed", function () {
      this.view.toggleHamburgerNav()
      return $("body").hasClass("is-open").should.be.true()
    })

    return it("toggles the hamburger off if it is open", function () {
      $("body").addClass("is-open")
      this.view.toggleHamburgerNav()
      return $("body").hasClass("is-open").should.be.false()
    })
  })
})
