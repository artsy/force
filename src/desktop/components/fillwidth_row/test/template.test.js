/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const cheerio = require("cheerio")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Artwork = require("../../../models/artwork")

const render = function () {
  const filename = path.resolve(__dirname, "../template.jade")
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Fillwidth row", function () {
  describe("artwork with a partner", function () {
    beforeEach(function () {
      this.artworks = [
        new Artwork(
          fabricate("artwork", { partner: { name: "House of Bitty" } })
        ),
      ]
      return (this.template = render("index")({
        sd: {},
        artworks: this.artworks,
      }))
    })

    return it("correctly renders and displays the partner name", function () {
      return this.template.should.containEql("House of Bitty")
    })
  })

  return describe("artwork with a partner", function () {
    beforeEach(function () {
      this.artworks = [new Artwork(fabricate("artwork"))]
      return (this.template = render("index")({
        sd: {},
        artworks: this.artworks,
      }))
    })

    return it("correctly renders and displays the partner name", function () {
      return this.template.should.containEql("Gagosian")
    })
  })
})
