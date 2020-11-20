/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const $ = require("cheerio")
const _ = require("underscore")
const fs = require("fs")
const jade = require("jade")
const { fabricate } = require("@artsy/antigravity")
const ArtistsByLetter = require("../collections/artists_by_letter")
const sd = require("sharify").data

const render = function (template) {
  const filename = require.resolve(`../templates/${template}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Artists", function () {
  return describe("letter page", function () {
    before(function () {
      const artists = [
        fabricate("artist", { image_versions: ["four_thirds", "tall"] }),
        fabricate("artist", { image_versions: ["four_thirds", "tall"] }),
      ]

      this.artistsByLetter = new ArtistsByLetter(artists, {
        letter: "a",
        state: { currentPage: 1, totalRecords: 1000 },
      })

      const template = render("letter")({
        artists: this.artistsByLetter,
        asset() {},
        letter: "A",
        letterRange: ["a", "b", "c"],
        sd: _.extend(sd, {
          APP_URL: "http://localhost:5000",
          CURRENT_PATH: "/artists-starting-with-a",
          WEBFONT_URL: "http://webfonts.artsy.net/",
        }),
      })

      return (this.$ = $.load(template))
    })

    it("renders the alphabetical nav", function () {
      this.$.html().should.not.containEql("undefined")
      return this.$(".alphabetical-index-range").text().should.equal("abc")
    })

    it("has a single <h1> that displays the name of the artists set", function () {
      const $h1 = this.$("h1")
      $h1.length.should.equal(1)
      return $h1.text().should.equal("Artists – A")
    })

    return it("includes meta tags", function () {
      const html = this.$.html()
      html.should.containEql(
        '<link rel="next" href="http://localhost:5000/artists-starting-with-a?page=2"'
      )
      html.should.containEql(
        '<meta property="og:title" content="Artists Starting With A'
      )
      return html.should.containEql(
        '<meta property="og:description" content="Research and discover artists starting with A on Artsy. Find works for sale, biographies, CVs, and auction results'
      )
    })
  })
})
