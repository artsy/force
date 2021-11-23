const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { Article } = require("../../../models/article")
const { Articles } = require("../../../collections/articles")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

describe("ArticleView", () => {
  let article
  let ArticleView
  beforeEach(done => {
    benv.setup(() => {
      benv.expose({
        $: benv.require("jquery"),
        Element: window.Element,
      })
      article = fabricate("article", {
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

      benv.render(
        resolve(__dirname, "../templates/index.jade"),
        {
          article: new Article(article),
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
          Backbone.$ = $
          ArticleView = benv.requireWithJadeify(
            resolve(__dirname, "../client/view"),
            []
          ).ArticleView
          sinon.stub(Backbone, "sync")
          done()
        }
      )
    })
  })

  afterEach(() => {
    benv.teardown()
    Backbone.sync.restore()
  })

  describe("#clickPlay", () => {
    let view
    it("replaces iFrame with an autoplay attribute", () => {
      view = new ArticleView({ el: $("body") })
      view.$(".article-video-play-button").click()
      view
        .$(".article-section-video iframe")
        .attr("src")
        .should.containEql("autoplay=1")
    })
  })
})
