/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const _s = require("underscore.string")
const cheerio = require("cheerio")
const embed = require("particle")
const path = require("path")
const jade = require("jade")
const fs = require("fs")
const moment = require("moment")
const markdown = require("../../../components/util/markdown")
const Article = require("../../../models/article")
const Articles = require("../../../collections/articles")
const fixtures = require("../../../test/helpers/fixtures.coffee")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("super_article_sticky_header", function () {
  it("superSubArticles can render fullscreen header and SA menu with correct classes", function () {
    const html = render("super_article_sticky_header")({
      article: {
        title: "hi",
        sections: [],
        contributing_authors: [],
        is_super_article: true,
        hero_section: {
          type: "fullscreen",
          url: "http://image.jpg",
        },
      },
      superArticle: new Article({
        super_article: {
          partner_logo: "http://logo.jpg",
          partner_logo_link: "http://logo.com",
        },
      }),
      superSubArticles: { models: [] },
      crop(url) {
        return url
      },
      resize(u) {
        return u
      },
      moment,
      sd: {},
      asset() {},
    })
    html.should.containEql("article-sa-sticky-header")
    html.should.containEql(
      '<a href="http://logo.com"><img src="http://logo.jpg"/>'
    )
    return html.should.not.containEql("visible no-transition")
  })

  return it("super articles show nav when they do not have a fullscreen hero", function () {
    const html = render("super_article_sticky_header")({
      article: new Article({
        title: "Super Article Title",
        sections: [],
        contributing_authors: [],
        is_super_article: true,
      }),
      footerArticles: new Articles(),
      superArticle: new Article({
        super_article: {},
      }),
      superSubArticles: new Articles(),
      crop() {},
      resize() {},
      moment,
      sd: {},
      asset() {},
      markdown,
    })
    return html.should.containEql("visible no-transition")
  })
})

describe("super_article_footer", function () {
  it("super articles have markdown-supported footers", function () {
    const html = render("super_article_footer")({
      article: new Article({
        title: "Super Article Title",
        sections: [],
        contributing_authors: [],
        is_super_article: true,
      }),
      footerArticles: new Articles(),
      superArticle: new Article({
        super_article: {
          partner_logo: "http://logo.jpg",
          partner_logo_link: "http://logo.com",
          partner_fullscreen_header_logo: "http://fullscreen-logo.jpg",
          footer_blurb: "Article Test [Link](http://artsy.net)",
        },
      }),
      superSubArticles: new Articles(),
      crop() {},
      resize() {},
      moment,
      sd: {},
      asset() {},
      markdown,
    })
    return html.should.containEql('<a href="http://artsy.net">Link</a>')
  })

  it("super articles display a footer_title", function () {
    const html = render("super_article_footer")({
      article: {
        title: "Super Article Title",
        sections: [],
        contributing_authors: [],
        is_super_article: true,
      },
      superArticle: new Article({
        super_article: {
          footer_title: "Footer Title",
        },
      }),
      superSubArticles: new Articles(),
      crop() {},
      resize() {},
      moment,
      sd: {},
      asset() {},
      markdown,
    })
    return html.should.containEql("Footer Title")
  })

  return it("super articles fallback on the title when there is no footer_title", function () {
    const html = render("super_article_footer")({
      article: {
        sections: [],
        contributing_authors: [],
        is_super_article: true,
      },
      footerArticles: new Articles(),
      superArticle: new Article({
        title: "Super Article Title",
        super_article: {
          footer_title: "",
        },
      }),
      superSubArticles: new Articles(),
      crop() {},
      resize() {},
      moment,
      sd: {},
      asset() {},
      markdown,
    })
    return html.should.containEql("Super Article Title")
  })
})
