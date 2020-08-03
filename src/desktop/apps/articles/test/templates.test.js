/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const path = require("path")
const jade = require("jade")
const fs = require("fs")
const moment = require("moment")
const Articles = require("../../../collections/articles")
const Section = require("../../../models/section")
const fixtures = require("../../../test/helpers/fixtures")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("article figure template", () =>
  it("uses the article url", function () {
    const html = render("full_feed")({
      articles: new Articles([_.extend(fixtures.article, { slug: "foobar" })]),
      crop(url) {
        return url
      },
      moment,
      sd: {},
    })
    return html.should.containEql("/article/foobar")
  }))

describe("articles template", () =>
  it("shows the news panel", function () {
    const html = render("articles")({
      articles: new Articles([
        _.extend(fixtures.article, { slug: "foobar", tier: 1 }),
      ]),
      asset(url) {
        return url
      },
      crop(url) {
        return url
      },
      moment,
      sd: {},
    })
    return html.should.containEql("news-panel")
  }))

describe("section template", function () {
  it("renders the section title", function () {
    const html = render("section")({
      articles: new Articles([_.extend(fixtures.article, { slug: "foobar" })]),
      crop(url) {
        return url
      },
      moment,
      sd: {},
      asset() {},
      section: new Section(
        _.extend(_.clone(fixtures.section), { title: "Moo Bar" })
      ),
    })
    return html.should.containEql("Moo Bar")
  })

  return it("renders extra stickies if featured ones are missing", function () {
    const html = render("section")({
      articles: new Articles([_.extend(fixtures.article, { tier: 1 })]),
      crop(url) {
        return url
      },
      moment,
      sd: {},
      asset() {},
      section: new Section(
        _.extend(_.clone(fixtures.section), { title: "Moo Bar" })
      ),
    })
    return html.should.containEql(
      '<li class="grid-item"><a href="/article/foobar">'
    )
  })
})
