/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const benv = require("benv")
const { resolve } = require("path")

describe("HomePageView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        analytics: { track: sinon.stub() },
        Element: window.Element,
      })
      Backbone.$ = $
      return benv.render(
        resolve(__dirname, "../templates/page.jade"),
        {
          heroUnits: [],
          sd: {},
        },
        () => {
          this.HomePageView = benv.requireWithJadeify(
            resolve(__dirname, "../client/view"),
            [
              "featuredItemsTemplate",
              "currentShowsTemplate",
              "artworkColumnsTemplate",
            ]
          )
          sinon.stub(Backbone, "sync")
          this.HomePageView.__set__("Flickity", (this.Flickity = sinon.stub()))
          this.HomePageView.__set__("sd", {})
          this.view = new this.HomePageView()
          return done()
        }
      )
    })
  })

  afterEach(function () {
    Backbone.sync.restore()
    return benv.teardown()
  })

  describe("#initialize", function () {
    it("renders shows on sync", function () {
      this.view.onSync = sinon.stub()
      this.view.initialize()
      this.view.collection.trigger("sync")
      return this.view.onSync.called.should.be.ok()
    })

    xit("on infinite scroll calls next page on the collection with no arguments", function () {
      this.view.shows.nextPage = sinon.stub()
      $(window).trigger("infiniteScroll")
      return this.view.shows.nextPage.args[0].length.should.equal(0)
    })

    return it("sets up hero units", function () {
      this.view.onSync = sinon.stub()
      this.view.initialize()
      this.Flickity.args[0][0].should.equal("#carousel-track")
      return this.Flickity.args[0][1].autoPlay.should.equal(10000)
    })
  })

  describe("#renderCurrentShows", () =>
    it("renders the current shows", function () {
      this.view.collection.reset([
        fabricate("show", { name: "Kittens on the wall" }),
      ])
      this.view.onSync()
      return this.view.$el.html().should.containEql("Kittens on the wall")
    }))

  xdescribe("#onSwipeStart", function () {})

  return xdescribe("#onSwipeEnd", function () {})
})
