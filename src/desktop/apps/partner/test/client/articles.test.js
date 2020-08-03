/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const Backbone = require("backbone")
const sinon = require("sinon")
const Partner = require("../../../../models/partner.coffee")
const Profile = require("../../../../models/profile.coffee")
const Articles = require("../../../../collections/articles.coffee")
const benv = require("benv")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const fixtures = require("../../../../test/helpers/fixtures.coffee")

describe("ArticlesAdapter", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose(
        {
          $: benv.require("jquery"),
          sd: { ARTSY_EDITORIAL_CHANNEL: "123" },
        },
        (location.replace = sinon.stub())
      )
      $.fn.imagesLoaded = sinon.stub()
      $.fn.waypoint = sinon.stub()
      $.fn.fillwidthLite = sinon.stub()
      this.ArticlesAdapter = benv.requireWithJadeify(
        resolve(__dirname, "../../client/articles"),
        ["articleTemplate", "jsonldTemplate"]
      )
      this.ArticlesGridView = benv.requireWithJadeify(
        resolve(__dirname, "../../../../components/articles_grid/view"),
        ["template", "button", "figure", "empty"]
      )
      this.ArticleView = benv.requireWithJadeify(
        resolve(__dirname, "../../../../components/article/client/view"),
        ["editTemplate"]
      )
      this.ArticleView.__set__("initCarousel", sinon.stub())
      sinon.stub(this.ArticleView.prototype, "fillwidth")
      this.ArticlesAdapter.__set__("ArticlesGridView", this.ArticlesGridView)
      this.ArticlesAdapter.__set__("ArticleView", this.ArticleView)
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      return benv.render(
        resolve(__dirname, "../../templates/index.jade"),
        {
          profile: new Profile(fabricate("partner_profile")),
          sd: { PROFILE: fabricate("partner_profile") },
          asset() {},
          params: {},
        },
        () => done()
      )
    })
  })

  afterEach(function () {
    Backbone.sync.restore()
    return benv.teardown()
  })

  describe("#constructor", function () {
    beforeEach(function () {
      this.renderArticlesGrid = sinon.stub(
        this.ArticlesAdapter.prototype,
        "renderArticlesGrid"
      )
      return (this.renderArticle = sinon.stub(
        this.ArticlesAdapter.prototype,
        "renderArticle"
      ))
    })

    afterEach(function () {
      this.renderArticlesGrid.restore()
      return this.renderArticle.restore()
    })

    it("calls #renderArticlesGrid if /articles", function () {
      sinon.stub(this.ArticlesAdapter.prototype, "isArticle").returns(false)
      const view = new this.ArticlesAdapter({
        profile: new Profile(fabricate("partner_profile")),
        partner: new Partner(fabricate("partner")),
        cache: {},
        el: $("body"),
      })
      this.renderArticlesGrid.callCount.should.equal(1)
      this.renderArticle.callCount.should.equal(0)
      return this.ArticlesAdapter.prototype.isArticle.restore()
    })

    return it("calls #renderArticle if /article/", function () {
      sinon.stub(this.ArticlesAdapter.prototype, "isArticle").returns(true)
      const view = new this.ArticlesAdapter({
        profile: new Profile(fabricate("partner_profile")),
        partner: new Partner(fabricate("partner")),
        cache: {},
        el: $("body"),
      })
      this.renderArticlesGrid.callCount.should.equal(0)
      this.renderArticle.callCount.should.equal(1)
      return this.ArticlesAdapter.prototype.isArticle.restore()
    })
  })

  describe("#renderArticlesGrid", function () {
    beforeEach(function () {
      sinon.stub(this.ArticlesAdapter.prototype, "isArticle").returns(false)
      return (this.view = new this.ArticlesAdapter({
        profile: new Profile(fabricate("partner_profile")),
        partner: new Partner(fabricate("partner")),
        cache: {},
        el: $("body"),
      }))
    })

    afterEach(function () {
      return this.ArticlesAdapter.prototype.isArticle.restore()
    })

    it("renders a loading spinner", function () {
      return this.view.el.html().should.containEql("loading-spinner")
    })

    it("removes the loading spinner when articles have loaded", function () {
      this.view.collection.add(fabricate("article"))
      this.view.collection.trigger("sync")
      return this.view.el.html().should.not.containEql("loading-spinner")
    })

    return it("renders a grid of articles", function () {
      this.view.collection.add(fabricate("article"))
      this.view.collection.trigger("sync")
      this.view.el
        .html()
        .should.containEql("On The Heels of A Stellar Year in the West")
      return this.view.el.html().should.containEql("Artsy Editorial")
    })
  })

  return describe("#renderArticle", function () {
    // FIXME: Error: Syntax error,
    // unrecognized expression: .article-container[data-id=0.016085399075416174] .article-content
    beforeEach(function () {
      sinon.stub(this.ArticlesAdapter.prototype, "isArticle").returns(true)
      return (this.view = new this.ArticlesAdapter({
        profile: new Profile(fabricate("partner_profile")),
        partner: new Partner(fabricate("partner")),
        cache: {},
        el: $("body"),
      }))
    })

    afterEach(function () {
      return this.ArticlesAdapter.prototype.isArticle.restore()
    })

    xit("redirects to the partner overview if the article is not found", function () {
      Backbone.sync.args[0][2].error()
      window.location.replace.called.should.be.true()
      return window.location.replace.args[0][0].should.equal("/gagosian")
    })

    xit("displays an article", function () {
      Backbone.sync.args[0][2].success(fixtures.article)
      this.view.el
        .html()
        .should.containEql("Just before the lines start forming")
      return this.view.el.html().should.containEql("article-container")
    })

    xit("shows a header, and omits the More button", function () {
      Backbone.sync.args[0][2].success(fixtures.article)
      this.view.collection.add(fabricate("article"))
      this.view.collection.trigger("sync")
      this.view.el.html().should.containEql("More From Gagosian Gallery")
      return this.view.el
        .html()
        .should.not.containEql("articles-grid__more-button")
    })

    return xit("renders the json-ld", function () {
      const article = _.extend({}, fixtures.article, {
        channel_id: null,
        partner_channel_id: "123",
      })
      Backbone.sync.args[0][2].success(article)
      const html = this.view.el.html()
      html.should.containEql("json-ld")
      return html.should.containEql("Partner")
    })
  })
})
