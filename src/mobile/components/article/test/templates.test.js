/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const fs = require("fs")
const jade = require("jade")
const path = require("path")
const cheerio = require("cheerio")
const Backbone = require("backbone")
const { resolve } = require("path")
const Article = require("../../../models/article")
const Section = require("../../../models/section")
const Articles = require("../../../collections/articles")
const fixtures = require("../../../test/helpers/fixtures")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("article page", function () {
  before(function () {
    this.article = new Article(
      _.extend({}, fixtures.article, {
        section_ids: ["03434"],
        hero_section: {
          type: "fullscreen",
          background_url: "http://video.mp4",
        },
      })
    )

    this.featuredArticles = new Articles()
    this.featuredArticles.model = Article
    this.featuredArticles.add([
      _.extend({}, fixtures.article, {
        title: "Featured Section Article Title",
      }),
    ])

    this.sectionArticles = new Articles()
    this.sectionArticles.model = Article
    this.sectionArticles.add([
      _.extend({}, fixtures.article, { title: "Section Article Title" }),
    ])

    const html = render("index")({
      sd: {},
      resize() {},
      crop(url) {
        return url
      },
      embed(url) {
        return url
      },
      article: this.article,
      footerArticles: new Backbone.Collection(),
      featuredSection: new Section(
        _.extend({}, fixtures.section, { title: "Moo Bar" })
      ),
      featuredSectionArticles: this.sectionArticles,
    })

    return (this.$ = cheerio.load(html))
  })

  it("renders the headline", function () {
    return this.$("h1").first().text().should.equal("Top Ten Booths")
  })

  it("renders the sections", function () {
    this.article.get("sections").length.should.equal(5)
    return this.$("section").length.should.equal(5)
  })

  it("renders slideshows", function () {
    return this.$(".article-section-slideshow").length.should.equal(1)
  })

  it("renders image collections", function () {
    return this.$(".article-section-image-collection").length.should.equal(1)
  })

  it("renders artworks", function () {
    this.$(".article-section-image-collection").should.have.lengthOf(1)
    this.$(".article-section-image-collection")
      .html()
      .should.containEql("/artwork/govinda-sah-azad-in-between-1")
    return this.$(".article-section-image-collection")
      .html()
      .should.containEql(
        "https://d32dm0rphc51dk.cloudfront.net/zjr8iMxGUQAVU83wi_oXaQ/larger.jpg"
      )
  })

  it("can render artworks with two artists", function () {
    this.$(".article-section-image-collection")
      .html()
      .should.containEql("Govinda Sah")
    return this.$(".article-section-image-collection")
      .html()
      .should.containEql("Andy Warhol")
  })

  return it("renders video with a cover", function () {
    this.$(".article-video-container")
      .eq(1)
      .html()
      .should.containEql("https://artsy.net/video_cover_image.jpg")
    return this.$(".article-video-container")
      .eq(1)
      .html()
      .should.containEql("http://youtu.be/yYjLrJRuMnY")
  })
})
