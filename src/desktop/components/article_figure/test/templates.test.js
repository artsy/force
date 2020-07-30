/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const cheerio = require("cheerio")
const path = require("path")
const jade = require("jade")
const fs = require("fs")
const Article = require("../../../models/article")
const fixtures = require("../../../test/helpers/fixtures")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("article figure template", function () {
  it("renders article fields", function () {
    const html = render("template")({
      article: new Article({ thumbnail_title: "hi", contributing_authors: [] }),
      sd: {},
    })
    return html.should.containEql("hi")
  })

  it("handles contributing author section from Artsy Editorial", function () {
    const html = render("template")({
      article: new Article({
        thumbnail_title: "hi",
        author_id: "503f86e462d56000020002cc",
        contributing_authors: [{ name: "Kana", profile_id: "user345" }],
      }),
      sd: { CURRENT_PATH: "/articles" },
    })
    return html.should.not.containEql('"article-figure-author"')
  })

  it("handles contributing author not from Artsy Editorial", function () {
    const html = render("template")({
      article: new Article({
        thumbnail_title: "hi",
        author_id: "123",
        contributing_authors: [{ name: "Kana", profile_id: "user345" }],
      }),
      sd: { CURRENT_PATH: "/articles" },
    })
    return html.should.containEql("article-figure-author")
  })

  it("handles one contributing author", function () {
    const html = render("template")({
      article: new Article({
        author_id: "123",
        contributing_authors: [{ name: "Kana", profile_id: "user345" }],
      }),
      sd: {},
    })
    html.should.not.containEql("Kana,")
    return html.should.containEql("has-contributing-author")
  })

  it("handles two contributing authors", function () {
    const html = render("template")({
      article: new Article({
        contributing_authors: [{ name: "Kana" }, { name: "Kina" }],
      }),
      sd: {},
    })
    html.should.containEql("Kana and Kina")
    html.should.containEql("Kina")
    html.should.containEql("Kana")
    return html.should.containEql("has-contributing-author")
  })

  it("handles three or more contributing authors", function () {
    const html = render("template")({
      article: new Article({
        contributing_authors: [
          { name: "Kana" },
          { name: "Kina" },
          { name: "Yoshie" },
        ],
      }),
      sd: {},
    })
    html.should.containEql(
      '<div class="article-figure-contributing-name">By Kana, Kina and Yoshie</div>'
    )
    return html.should.containEql("has-contributing-author")
  })

  return it("does not render author name if Artsy Editorial, /articles, and has contributing authors", function () {
    const html = render("template")({
      article: new Article({
        author_id: "123",
        contributing_authors: [{ name: "Kana" }],
      }),
      sd: { CURRENT_PATH: "/articles", ARTSY_EDITORIAL_CHANNEL: "123" },
    })
    return html.should.not.containEql('class="article-figure-author"')
  })
})
