/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const SaleArtwork = require("../../../models/sale_artwork")
const Artworks = require("../../../collections/artworks")
const { fabricate } = require("@artsy/antigravity")
const path = require("path")
const fs = require("fs")
const jade = require("jade")

const render = function (locals) {
  const filename = path.resolve(__dirname, "../template.jade")
  return jade.compile(fs.readFileSync(filename), { filename })(locals)
}

describe("artwork_list component", () =>
  it("renders markdown from sales", function () {
    const artworks = new Artworks(
      fabricate("artwork", { sale_artwork: { user_notes: "**Lovely!**" } })
    )
    return render({ artworks: artworks.models }).should.containEql(
      "<strong>Lovely!</strong>"
    )
  }))
