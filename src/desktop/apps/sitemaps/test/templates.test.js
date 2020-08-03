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
const moment = require("moment")
const { fabricate } = require("@artsy/antigravity")
const {
  getFullEditorialHref,
} = require("@artsy/reaction/dist/Components/Publishing/Constants")
const Article = require("../../../models/article")
const Articles = require("../../../collections/articles")
const Artwork = require("../../../models/artwork")
const Section = require("../../../models/section")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("misc sitemap template", () =>
  it("renders the correct misc URLs", function () {
    const xml = render("misc")({
      sd: { APP_URL: "www.artsy.net" },
    })
    xml.should.containEql("<loc>www.artsy.net</loc><priority>1</priority>")
    xml.should.containEql("www.artsy.net/about")
    xml.should.containEql("/press/in-the-media")
    xml.should.containEql("/press/press-releases")
    xml.should.containEql("/collect")
    xml.should.containEql("/log_in")
    xml.should.containEql("/security")
    xml.should.containEql("/privacy")
    xml.should.containEql("/shows")
    xml.should.containEql("/artists")
    xml.should.containEql("/categories")
    xml.should.containEql("/sign_up")
    return xml.should.containEql("/terms")
  }))

describe("news sitemap template", () =>
  it("renders article info", function () {
    const articles = [
      new Article(fabricate("article", { layout: "standard" })),
      new Article(
        fabricate("article", {
          layout: "news",
          slug: "banksys-half-shredded-painting-will-view-german-museum",
        })
      ),
    ]

    const xml = render("news")({ articles, getFullEditorialHref })

    xml.should.containEql("/article/editorial-on-the-heels-of-a-stellar-year")
    xml.should.containEql(
      "/news/banksys-half-shredded-painting-will-view-german-museum"
    )
    xml.should.containEql("<news:name>Artsy</news:name>")
    xml.should.containEql("2014-09-24T23:24:54.000Z")
    return xml.should.containEql(
      "On The Heels of A Stellar Year in the West, Sterling Ruby Makes His Vivid Mark on Asia"
    )
  }))
