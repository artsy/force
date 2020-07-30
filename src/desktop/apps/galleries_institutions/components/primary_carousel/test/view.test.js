/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Profiles = require("../../../../../collections/profiles.coffee")
const rewire = require("rewire")
const PrimaryCarousel = rewire("../view.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("PrimaryCarousel", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({
        $: benv.require("jquery"),
      })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  return describe("#setupFlickity", function () {
    beforeEach(function () {
      this.initCarousel = sinon.stub()
      this.initCarousel.returns({ cells: { flickity: { on() {} } } })
      return PrimaryCarousel.__set__("initCarousel", this.initCarousel)
    })

    it("does not set up carousel if no profile", function () {
      const view = new PrimaryCarousel({
        params: new Backbone.Model(),
        profiles: new Profiles([]),
        el: $("body"),
      })

      view.setupFlickity()
      return this.initCarousel.notCalled.should.be.ok()
    })

    it("sets up carousel without auto play if only one profile", function () {
      const view = new PrimaryCarousel({
        params: new Backbone.Model(),
        profiles: new Profiles([fabricate("profile")]),
        el: $("body"),
      })

      view.setupFlickity()
      this.initCarousel.calledOnce.should.be.ok()
      return this.initCarousel.args[0][1].autoPlay.should.equal(false)
    })

    return it("sets up carousel with auto play if more than one profile", function () {
      const view = new PrimaryCarousel({
        params: new Backbone.Model(),
        profiles: new Profiles([
          fabricate("profile", { id: "1" }),
          fabricate("profile", { id: "2" }),
        ]),
        el: $("body"),
      })

      view.setupFlickity()
      this.initCarousel.calledOnce.should.be.ok()
      return this.initCarousel.args[0][1].autoPlay.should.equal(true)
    })
  })
})
