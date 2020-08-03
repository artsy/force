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
const CurrentUser = require("../../../models/current_user")
const { fabricate } = require("@artsy/antigravity")

const render = function (opts) {
  const filename = path.resolve(__dirname, "../templates/index.jade")
  return jade.compile(fs.readFileSync(filename), { filename })(
    _.extend(
      require("./fixture/auction_content.json"),
      {
        sd: {},
        asset() {},
        crop() {},
        subject: "auction",
        path: "/auction-partnerships",
      },
      opts
    )
  )
}

describe("Partnerships templates", function () {
  it("shows the h1 header", () =>
    $(render()).find("h1").html().should.equal("Artsy for Auctions"))

  it("shows the h2 headers for each section", () =>
    _.map($(render()).find("h2"), x => $(x).html()).should.eql([
      "Experience",
      "Audience",
      "Access",
      "Visibility",
      "Event Services",
      "Support",
    ]))

  return it("shows the CTA in nav", () =>
    $(render())
      .find(".partnerships-section-nav a:last-child")
      .attr("href")
      .should.containEql("/apply"))
})
