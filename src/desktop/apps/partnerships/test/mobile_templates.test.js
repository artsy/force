/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const $ = require("cheerio")
const benv = require("benv")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const { fabricate } = require("@artsy/antigravity")

const render = function (opts) {
  const filename = path.resolve(__dirname, "../templates/mobile/index.jade")
  return jade.compile(fs.readFileSync(filename), { filename })(
    _.extend(
      require("./fixture/content.json"),
      {
        sd: {},
        crop() {},
        asset() {},
        path: "/gallery-partnerships",
      },
      opts
    )
  )
}

describe("Gallery partnerships templates", function () {
  it("shows the h1 header", () =>
    $(render()).find("h1").html().should.equal("Artsy for Galleries"))

  it("shows the h2 headers for each section", () =>
    _.map($(render()).find("h2"), x => $(x).html()).should.eql([
      "Network",
      "Audience",
      "Access",
      "Tools",
      "Artsy Folio",
      "Support",
    ]))

  return it("shows the CTA in the apply section", () =>
    $(render())
      .find("#apply .apply-button")
      .attr("href")
      .should.equal("https://www.artsy.net/apply/"))
})
