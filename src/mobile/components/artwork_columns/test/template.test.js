/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const Artwork = require("../../../models/artwork")
const Artworks = require("../../../collections/artworks")
const Partner = require("../../../models/partner")
const cheerio = require("cheerio")
const { fabricate } = require("@artsy/antigravity")
const path = require("path")
const fs = require("fs")
const jade = require("jade")

const render = function (locals) {
  const filename = path.resolve(__dirname, "../template.jade")
  return jade.compile(fs.readFileSync(filename), { filename })(locals)
}

describe("artwork_columns component", function () {
  it("renders basic artwork columns", function () {
    const artworks = new Artworks([
      new Artwork(fabricate("artwork")),
      new Artwork(fabricate("artwork")),
    ])
    const $ = cheerio.load(render({ artworkColumns: [artworks.models] }))
    return $(".artwork-columns-artwork").length.should.eql(2)
  })

  it("renders contact gallery for inquireable artworks", function () {
    const artworks = new Artworks([
      new Artwork(fabricate("artwork", { inquireable: true })),
    ])
    const $ = cheerio.load(render({ artworkColumns: [artworks.models] }))
    return $.html().should.containEql("Contact Gallery")
  })

  it("does not render contact gallery for non-inquireable artworks", function () {
    const artworks = new Artworks([
      new Artwork(fabricate("artwork", { inquireable: false })),
    ])
    const $ = cheerio.load(render({ artworkColumns: [artworks.models] }))
    return $.html().should.not.containEql("Contact Gallery")
  })

  return it("does not render contact gallery for auction artworks", function () {
    const artworks = new Artworks([
      new Artwork(
        fabricate("artwork", {
          forsale: true,
          inquireable: true,
          partner: fabricate("partner", { type: "Auction" }),
        })
      ),
    ])
    const $ = cheerio.load(render({ artworkColumns: [artworks.models] }))
    $.html().should.containEql("Bid now")
    return $.html().should.not.containEql("Contact Gallery")
  })
})
