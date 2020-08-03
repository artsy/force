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

describe("articles feed template", function () {
  it("renders the article_figure template for each article", function () {
    const html = render("articles_feed")({
      articles: [_.clone(fixtures.article)],
      crop(url) {
        return url
      },
      sd: {},
    })

    html.should.containEql("article-item")
    html.should.not.containEql("article-item-first")
    return html.should.not.containEql("news-panel")
  })

  return it("renders the NewsPanel", function () {
    const html = render("articles_feed")({
      articles: [_.clone(fixtures.article)],
      crop(url) {
        return url
      },
      newsArticles: [{ layout: "news" }],
      sd: {},
    })

    html.should.containEql("article-item-first")
    html.should.containEql("article-item")
    return html.should.containEql("news-panel")
  })
})

describe("section template", function () {
  it("renders the section title", function () {
    this.Articles = new Articles()
    this.Articles.model = Article
    this.Articles.add([_.extend(_.clone(fixtures.article), { slug: "foobar" })])

    const html = render("section")({
      articles: this.Articles,
      crop(url) {
        return url
      },
      sd: {},
      asset() {},
      featuredSection: new Section(
        _.extend(_.clone(fixtures.section), { title: "Moo Bar" })
      ),
    })

    return html.should.containEql("Moo Bar")
  })

  return it("links to the section website", function () {
    this.Articles = new Articles()
    this.Articles.model = Article
    this.Articles.add([
      _.extend(_.clone(fixtures.article), {
        id: "foo",
        title: "Foo and Bars are Great!",
      }),
      _.extend(_.clone(fixtures.article), { id: "bar" }),
      _.extend(_.clone(fixtures.article), { id: "baz" }),
    ])

    const section = new Section(
      _.extend(_.clone(fixtures.section), {
        title: "Moo Bar",
        partner_website_url: "www.foobar.com",
      })
    )

    const html = render("section")({
      articles: this.Articles,
      crop(url) {
        return url
      },
      sd: {},
      asset() {},
      featuredSection: section,
    })

    const $ = cheerio.load(html)
    return $(".articles-section-header__banner a")
      .attr("href")
      .should.equal("www.foobar.com")
  })
})
