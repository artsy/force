/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Q = require("bluebird-q")
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Article = require("../../../models/article")
const Articles = require("../../../collections/articles")
const CurrentUser = require("../../../models/current_user")
const fixtures = require("../../../test/helpers/fixtures.coffee")
const sd = require("sharify").data
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const { stubChildClasses } = require("../../../test/helpers/stubs")

describe("SuperArticleView", function () {
  beforeEach(function () {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      window.resize = function () {}
      $.fn.waypoint = sinon.stub()
      Backbone.$ = $
      this.ArticleView = benv.requireWithJadeify(
        resolve(__dirname, "../client/super_article"),
        []
      )
      stubChildClasses(this.ArticleView, this, ["initCarousel"], [])
      return $("body").html(
        '<div class="article-sa-sticky-header"><div class="article-sa-sticky-related-container"></div></div><div class="article-content"></div>'
      )
    })
  })

  afterEach(() => benv.teardown())

  describe("on mobile screen", function () {
    beforeEach(function () {
      window.matchMedia = sinon.stub().returns({ matches: true })
      sinon.stub(Backbone, "sync")
      this.view = new this.ArticleView({
        article: this.article,
      })
      this.view.setElement($("body"))
      return (this.view.article = this.article)
    })

    afterEach(() => Backbone.sync.restore())

    return it("#toggleHamburgerNav", function () {
      this.view.toggleHamburgerNav()
      return this.view.$body.hasClass("is-open").should.be.true()
    })
  })

  return describe("on wide screen", function () {
    beforeEach(function () {
      window.matchMedia = sinon.stub().returns({ matches: false })
      sinon.stub(Backbone, "sync")
      this.view = new this.ArticleView({
        article: this.article,
      })
      this.view.setElement($("body"))
      return (this.view.article = this.article)
    })

    afterEach(() => Backbone.sync.restore())

    it("#setupSuperArticle", function () {
      return this.initCarousel.called.should.be.ok()
    })

    it("opens nav on mouseenter", function () {
      this.view.$stickyHeader.mouseenter()
      return this.view.$superArticleNavToc.hasClass("visible").should.be.true()
    })

    it("closes nav on mouseleave", function () {
      this.view.$stickyHeader.hover()
      return this.view.$superArticleNavToc.hasClass("visible").should.be.false()
    })

    it("hides the nav on scroll", function () {
      this.view.$superArticleNavToc.addClass("visible")
      this.view.$window.scroll()
      return this.view.$superArticleNavToc.hasClass("visible").should.be.false()
    })

    return it("#setWaypoints", function () {
      $.fn.waypoint.args[0][0]("down")
      return this.view.$stickyHeader.hasClass("visible").should.be.true()
    })
  })
})
