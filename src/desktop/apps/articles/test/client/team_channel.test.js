/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
const { resolve } = require("path")
const fixtures = require("../../../../test/helpers/fixtures")
const { fabricate } = require("@artsy/antigravity")
const Articles = require("../../../../collections/articles.coffee")
const Article = require("../../../../models/article.coffee")
const Channel = require("../../../../models/channel.coffee")
const sd = require("sharify").data
const { resize, crop } = require("../../../../components/resizer")

describe("TeamChannelView", function () {
  before(function (done) {
    return benv.setup(() => {
      let mod
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      window.resize = function () {}
      window.matchMedia = sinon.stub().returns({ matches: true })
      this.channel = new Channel(fixtures.channel)
      this.options = {
        sd: _.extend(sd, {
          GALLERY_INSIGHTS_CHANNEL: "55356a9deca560a0137aa4b7",
        }),
        resize,
        crop,
        channel: this.channel,
        parselyArticles: [],
        pinnedArticles: new Articles([new Article(fabricate("article"))]),
        asset() {},
      }
      $.fn.waypoint = this.waypoint = sinon.stub()
      sinon.stub(Backbone, "sync")
      ;({ TeamChannelView: this.TeamChannelView } = mod = rewire(
        "../../client/team_channel"
      ))
      this.carousel = { navigation: {} }
      mod.__set__("initCarousel", sinon.stub().returns(this.carousel))
      mod.__set__("ArticlesGridView", (this.ArticlesGridView = sinon.stub()))
      mod.__set__(
        "TeamChannelNavView",
        (this.TeamChannelNavView = sinon.stub())
      )
      return benv.render(
        resolve(__dirname, "../../templates/team_channel.jade"),
        this.options,
        () => {
          this.view = new this.TeamChannelView({
            el: $("body"),
          })
          return done()
        }
      )
    })
  })

  after(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("initialize", function () {
    it("renders the name and tagline", function () {
      $("body").html().should.containEql("Life at Artsy")
      return $("body").html().should.containEql("Office Culture at Artsy")
    })

    return it("sets up the TeamChannelNavView", function () {
      this.TeamChannelNavView.args[0][0].offset.should.equal(-400)
      this.TeamChannelNavView.args[0][0].$waypointEl.selector.should.equal(
        ".team-channel-header"
      )
      return this.TeamChannelNavView.args[0][0].$content.selector.should.equal(
        ".team-channel-body"
      )
    })
  })

  describe("#renderGrid", () =>
    it("adds articles to the grid view", function () {
      this.ArticlesGridView.called.should.be.true()
      return this.ArticlesGridView.args[0][0].header.should.containEql(
        "Latest Articles"
      )
    }))

  describe("#renderFeatured", () =>
    it("renders featuredArticles and initializes carousel", function () {
      $(".team-channel-featured__item figure").length.should.equal(1)
      return $(".team-channel-featured__item")
        .html()
        .should.containEql("On The Heels")
    }))

  return describe("#windowResized", function () {
    it("sets the advanceBy in carousel to 1 if small screen", function () {
      window.matchMedia = sinon.stub().returns({ matches: true })
      this.view.windowResized()
      return this.view.carousel.navigation.advanceBy.should.equal(1)
    })

    return it("sets the advanceBy in carousel to 2 if large screen", function () {
      window.matchMedia = sinon.stub().returns({ matches: false })
      this.view.windowResized()
      return this.view.carousel.navigation.advanceBy.should.equal(2)
    })
  })
})
