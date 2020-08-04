/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const Article = require("../../../models/article")
const Articles = require("../../../collections/articles")
const fixtures = require("../../../test/helpers/fixtures.coffee")
const sd = require("sharify").data
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const { stubChildClasses } = require("../../../test/helpers/stubs")
const embed = require("particle")

xdescribe("ArticleView", function () {
  before(function () {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        jQuery: benv.require("jquery"),
        _s: benv.require("underscore.string"),
      })
      Backbone.$ = $
      $.fn.imagesLoaded = sinon.stub()
      $.fn.waypoint = sinon.stub()
      $.fn.fillwidthLite = sinon.stub().yieldsTo("done", [{ $el: $("img") }])
      this.ArticleView = benv.requireWithJadeify(
        resolve(__dirname, "../client/view"),
        ["editTemplate"]
      )
      stubChildClasses(this.ArticleView, this, ["initCarousel"], [])
      this.ArticleView.__set__("imagesLoaded", sinon.stub())
      this.ArticleView.__set__("Sticky", () => ({
        add: sinon.stub(),
      }))
      return (this.locals = {
        footerArticles: new Backbone.Collection(),
        slideshowArtworks: null,
        article: (this.article = new Article(
          _.extend({}, fixtures.article, {
            author_id: "4d8cd73191a5c50ce210002a",
            sections: [
              {
                type: "text",
                body:
                  '<p><a class="is-follow-link">Damon Zucconi</a><a class="artist-follow" data-id="damon-zucconi"></a></p>',
              },
              {
                type: "image_set",
                images: [
                  {
                    type: "image",
                    url: "https://image.png",
                    caption: "Trademarked",
                  },
                ],
              },
              {
                type: "image",
                url: "https://image2.png",
                caption: "Trademarked 2",
                layout: "column_width",
              },
              {
                type: "image_collection",
                layout: "overflow_fillwidth",
                images: [
                  {
                    type: "image",
                    url: "https://image.png",
                    caption: "Trademarked",
                  },
                  {
                    type: "artwork",
                    id: "5321b73dc9dc2458c4000196",
                    slug: "govinda-sah-azad-in-between-1",
                    date: "2015",
                    title: "In Between",
                    image:
                      "https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ/larger.jpg",
                    partner: {
                      name: "October Gallery",
                      slug: "october-gallery",
                    },
                    artists: [
                      {
                        name: "Govinda Sah 'Azad'",
                        slug: "govinda-sah-azad",
                      },
                    ],
                  },
                ],
              },
            ],
          })
        )),
        author: new Backbone.Model(fabricate("user")),
        sd: {
          SCROLL_ARTICLE: "static",
        },
        asset() {},
        embed,
        moment: sinon.stub(),
        resize: sinon.stub(),
        crop: sinon.stub(),
        _s,
      })
    })
  })

  after(() => benv.teardown())

  beforeEach(function (done) {
    sinon.stub(Backbone, "sync")
    this.fillwidth = sinon.spy(this.ArticleView.prototype, "fillwidth")
    this.imgsFillContainer = sinon.spy(
      this.ArticleView.prototype,
      "imgsFillContainer"
    )
    this.setupMaxImageHeights = sinon.spy(
      this.ArticleView.prototype,
      "setupMaxImageHeights"
    )
    this.resetImageSetPreview = sinon.spy(
      this.ArticleView.prototype,
      "resetImageSetPreview"
    )
    return benv.render(
      resolve(__dirname, "../templates/index.jade"),
      this.locals,
      () => {
        this.view = new this.ArticleView({
          el: $("body"),
          article: this.article,
          _s,
        })
        return done()
      }
    )
  })

  afterEach(function () {
    Backbone.sync.restore()
    this.fillwidth.restore()
    this.imgsFillContainer.restore()
    this.setupMaxImageHeights.restore()
    return this.resetImageSetPreview.restore()
  })

  describe("#renderSlideshow", () =>
    it("renders the slideshow", function () {
      this.view.renderSlideshow()
      return this.initCarousel.called.should.be.ok()
    }))

  describe("#resizeImages", () =>
    it("fillwidth is called on each image section", function () {
      this.view.resizeImages()
      return _.defer(() => {
        return this.fillwidth.callCount.should.be(above(1))
      })
    }))

  describe("#checkEditable", () =>
    it(`shows the edit button when the author_id matches user and the user has \
partner access`, function () {
      this.view.user = _.extend(fabricate("user"), {
        id: "4d8cd73191a5c50ce210002a",
        has_partner_access: true,
      })
      this.view.checkEditable()
      return this.view.renderedEditButton.should.be.ok()
    }))

  describe("#setupFollowButtons", () =>
    it("sets the list of artists in an article with ids", function () {
      this.view.setupFollowButtons()
      return this.view.artists[0].id.should.equal("damon-zucconi")
    }))

  describe("#refreshWindowSize", function () {
    it("resets image sizes for imageset previews", function () {
      return this.resetImageSetPreview.callCount.should.equal(1)
    })

    it("calls fillwidth on images", function () {
      this.view.refreshWindowSize()
      return this.fillwidth.callCount.should.equal(1)
    })

    return it("calls setupMaxImageHeights on single images", function () {
      this.view.refreshWindowSize()
      return this.setupMaxImageHeights.callCount.should.equal(1)
    })
  })

  describe("#resetImageSetPreview", function () {
    it("on large screens, images are full height", function () {
      this.view.windowWidth = 900
      this.view.resetImageSetPreview()
      return this.view
        .$(".article-section-image-set__image-container")
        .height()
        .should.equal(150)
    })

    return it("on small screens, resets image sizes for imageset previews", function () {
      this.view.windowWidth = 600
      return this.imgsFillContainer.callCount.should.equal(1)
    })
  })

  return describe("#imgsFillContainer", () =>
    it("returns true if images are narrower than their container", function () {
      const container = this.view.$(".article-section-artworks ul").width(1400)
      const imgsFillContainer = this.view.imgsFillContainer(
        [{ width: 600 }, { width: 700 }],
        container,
        5
      )
      return imgsFillContainer.isFilled.should.equal(true)
    }))
})
