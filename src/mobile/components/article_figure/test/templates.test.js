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
      article: new Article(
        _.extend(fixtures.article, { thumbnail_title: "hi" })
      ),
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
    return html.should.containEql("article-item-author")
  })

  it("handles one contributing author", function () {
    const html = render("template")({
      article: new Article({
        contributing_authors: [{ name: "Kana", profile_id: "user345" }],
        sd: {},
      }),
    })
    return html.should.not.containEql("Kana,")
  })

  it("handles two contributing authors", function () {
    const html = render("template")({
      article: new Article({
        contributing_authors: [
          { name: "Kana", profile_id: "user345" },
          { name: "Kina", profile_id: "user355" },
        ],
      }),
      sd: {},
    })
    html.should.containEql("&nbspand&nbsp")
    html.should.containEql('class="article-item-contributing-name">Kina')
    return html.should.containEql('class="article-item-contributing-name">Kana')
  })

  return it("handles three or more contributing authors", function () {
    const html = render("template")({
      article: new Article({
        contributing_authors: [
          { name: "Kana", profile_id: "user345" },
          { name: "Kina", profile_id: "user355" },
          { name: "Yoshie", profile_id: "user356" },
        ],
      }),
      sd: {},
    })
    html.should.containEql('class="article-item-contributing-name">Kana')
    html.should.containEql('class="article-item-contributing-name">Kina')
    return html.should.containEql(
      'class="article-item-contributing-name">Yoshie'
    )
  })
})
