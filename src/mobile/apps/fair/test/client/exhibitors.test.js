/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const Fair = require("../../../../models/fair")
const ShowsFeed = require("../../../../collections/shows_feed")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const benv = require("benv")
const { resolve } = require("path")

describe("Exhibitors page client-side code", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      $.onInfiniteScroll = sinon.stub()
      sinon.stub(Backbone, "sync")
      return benv.render(
        resolve(__dirname, "../../templates/exhibitors_page.jade"),
        {
          fair: new Fair(fabricate("fair")),
          shows: new ShowsFeed(),
          showParams: {},
          artworkColumnsTemplate() {},
          sd: {},
        },
        () => {
          const { FairExhibitorsView } = benv.requireWithJadeify(
            resolve(__dirname, "../../client/exhibitors"),
            ["exhibitorsTemplate", "artworkColumnsTemplate"]
          )
          this.view = new FairExhibitorsView({
            el: $("body"),
            collection: new ShowsFeed([
              fabricate("show", { fair_location: { display: "booth 7" } }),
            ]),
            showParams: { foo: "bar" },
          })
          return done()
        }
      )
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("init", () =>
    xit("injects the showParams and shows into the view", function () {
      sd.SHOW_PARAMS = { foo: "baz" }
      sd.SHOWS = [fabricate("show", { fair_location: { display: "Dock 4" } })]
      const view = this.init()
      view.showParams.foo.should.equal("baz")
      return view.collection.first().formattedLocation().should.equal("Dock 4")
    }))

  return describe("FairMainPageView", function () {
    describe("#initialize", () =>
      it("attaches the show params", function () {
        return this.view.showParams.foo.should.equal("bar")
      }))

    describe("#setupInfiniteScroll", function () {
      xit("doesnt set up infinite scroll if in a partner scope", function () {
        this.view.showParams.partner = { foo: "bar" }
        this.view.setupInfiniteScroll()
        return $.onInfiniteScroll.called.should.not.be.ok()
      })

      it("sets up infinite scroll for non-partner scope", function () {
        this.view.setupInfiniteScroll()
        return $.onInfiniteScroll.called.should.be.ok()
      })

      return it("fetches the next page on infinite scroll", function () {
        this.view.collection.nextPage = sinon.stub()
        this.view.setupInfiniteScroll()
        $.onInfiniteScroll.args[0][0]()
        return this.view.collection.nextPage.called.should.be.ok()
      })
    })

    return describe("#renderShows", () =>
      it("renders the shows", function () {
        this.view.collection.reset([
          fabricate("show", { fair_location: { display: "Pier FooBar" } }),
        ])
        this.view.renderShows()
        return this.view.$el.html().should.containEql("Pier FooBar")
      }))
  })
})
