/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const cheerio = require("cheerio")
const fs = require("fs")
const jade = require("jade")
const path = require("path")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Artwork = require("../../../models/artwork")
const Artworks = require("../../../collections/artworks")

const render = function (template) {
  const filename = path.resolve(__dirname, `../${template}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Artwork Columns template", function () {
  before(function () {
    return (this.artworks = new Artworks([
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
    ]))
  })

  it("renders artwork items in columns", function () {
    const twoCols = this.artworks.groupByColumnsInOrder(2)
    let $ = cheerio.load(render("template")({ artworkColumns: twoCols }))
    $(".artwork-column")
      .first()
      .find(".artwork-item")
      .should.have.lengthOf(this.artworks.length / 2)
    $(".artwork-column")
      .last()
      .find(".artwork-item")
      .should.have.lengthOf(this.artworks.length / 2)
    $(".artwork-column").should.have.lengthOf(2)

    const threeCols = this.artworks.groupByColumnsInOrder(3)
    $ = cheerio.load(render("template")({ artworkColumns: threeCols }))
    $(".artwork-column").first().find(".artwork-item").should.have.lengthOf(3)
    $(".artwork-column").last().find(".artwork-item").should.have.lengthOf(2)
    $(".artwork-column").should.have.lengthOf(3)

    const eightCols = this.artworks.groupByColumnsInOrder(8)
    $ = cheerio.load(render("template")({ artworkColumns: eightCols }))
    $(".artwork-column").first().find(".artwork-item").should.have.lengthOf(1)
    return $(".artwork-column").should.have.lengthOf(8)
  })

  it("can render empty columns to be populated by the view", function () {
    const $ = cheerio.load(render("template")({ numberOfColumns: 5 }))
    $(".artwork-column").should.have.lengthOf(5)
    return $(".artwork-column").is(":empty").should.be.true()
  })

  return it("will pass an image version for a given height to the artwork item template", function () {
    const threeCols = this.artworks.groupByColumnsInOrder(3)
    let $ = cheerio.load(
      render("template")({ artworkColumns: threeCols, setHeight: 200 })
    )
    let artwork = this.artworks.models[0]
    let imgSrc = $(
      `.artwork-item[data-artwork='${artwork.get("id")}'] img`
    ).attr("src")
    imgSrc.should.containEql(artwork.defaultImage().imageSizeForHeight(200))

    $ = cheerio.load(
      render("template")({ artworkColumns: threeCols, setHeight: 400 })
    )
    artwork = this.artworks.models[0]
    imgSrc = $(`.artwork-item[data-artwork='${artwork.get("id")}'] img`).attr(
      "src"
    )
    return imgSrc.should.containEql(
      artwork.defaultImage().imageSizeForHeight(400)
    )
  })
})
