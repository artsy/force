/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _s = require("underscore.string")
const cheerio = require("cheerio")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Shows = require("../../../collections/shows_feed")
const Artworks = require("../../../collections/artworks")
const FeaturedLinks = require("../../../collections/featured_links")
const { fabricate } = require("@artsy/antigravity")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Current shows template", function () {
  it("shows a properly formatted fair booth", function () {
    const shows = new Shows([
      fabricate("show", {
        name: "Splattering of Foo paint",
        fair: fabricate("fair", { name: "Foobarzalooza 2013" }),
        fair_location: { display: "Pier Bar, Booth Baz" },
        artworks: [fabricate("artwork")],
      }),
    ])
    const html = render("current_shows")({
      shows: shows.models,
      artworkColumnsTemplate() {},
    })
    html.should.containEql("Foobarzalooza 2013")
    html.should.containEql("Pier Bar, Booth Baz")
    return html.should.not.containEql("Splattering of Foo paint")
  })

  return it("shows a properly formatted non-fair exhibition", function () {
    const shows = new Shows([
      fabricate("show", {
        name: "Splattering of Foo paint",
        fair: null,
        artworks: [fabricate("artwork")],
      }),
    ])
    const html = render("current_shows")({
      shows: shows.models,
      artworkColumnsTemplate() {},
    })
    return html.should.containEql("Splattering of Foo paint")
  })
})

describe("Featured artworks template", () =>
  it("shows the blurb of featured artworks if included", function () {
    const artworks = new Artworks([
      fabricate("artwork", { blurb: "Blurb about what else, cats" }),
    ])
    const html = render("featured_works")({ artworks: artworks.models, sd: {} })
    return html.should.containEql("Blurb about what else, cats")
  }))

describe("Index", function () {
  it("with hero units", function () {
    const heroUnits = [{ title: "Diary of a cat" }, { title: "Diary of a dog" }]
    const html = render("page")({
      heroUnits,
      sd: {},
      _s,
      resize() {
        return {}
      },
    })
    html.should.containEql("Diary of a cat")
    const $ = cheerio.load(html)

    return $(".home-page-hero-unit").length.should.equal(2)
  })

  describe("with one hero unit", () => it("has no dots", function () {}))

  return it("with no hero units", function () {
    const html = render("page")({ heroUnits: [], sd: {} })
    return html.should.containEql("Current Shows")
  })
})
