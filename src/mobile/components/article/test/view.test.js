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
const sd = require("sharify").data
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("ArticleView", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        Element: window.Element,
      })
      // benv bug that doesn't attach globals to window
      Backbone.$ = $
      this.article = fabricate("article", {
        sections: [
          {
            type: "video",
            url: "http://youtube.com",
            caption: "caption",
            cover_image_url: "http://artsy.net/cover_image_url.jpg",
            layout: "full-width",
            background_color: "black",
          },
        ],
        contributing_authors: [],
        section_ids: [],
      })

      return benv.render(
        resolve(__dirname, "../templates/index.jade"),
        {
          article: new Article(this.article),
          asset() {},
          sd: {},
          resize() {},
          crop() {},
          embed: sinon.stub().returns("<iframe>Test-video</iframe>"),
          footerArticles: new Backbone.Collection(),
          superArticle: new Article({ super_article: {} }),
          relatedArticles: new Articles(),
        },
        () => {
          this.ArticleView = benv.requireWithJadeify(
            resolve(__dirname, "../client/view"),
            []
          )
          sinon.stub(Backbone, "sync")
          return done()
        }
      )
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  return describe("#clickPlay", () =>
    it("replaces iFrame with an autoplay attribute", function () {
      this.view = new this.ArticleView({ el: $("body") })
      $(".article-video-play-button").click()
      return $(".article-section-video iframe")
        .attr("src")
        .should.containEql("autoplay=1")
    }))
})
