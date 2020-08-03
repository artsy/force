/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const fs = require("fs")
const jade = require("jade")
const path = require("path")
const benv = require("benv")
const { fabricate } = require("@artsy/antigravity")
const PartnerShows = require("../../../collections/partner_shows")

const render = function (template) {
  const filename = path.resolve(__dirname, `../${template}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Featured Shows templates", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      return done()
    })
  )

  after(() => benv.teardown())

  it("renders the template", function () {
    const shows = new PartnerShows(_.times(4, () => fabricate("show")))
    const $html = $(render("large")({ shows: shows.models }))
    $html.find(".featured-shows-featured-show").length.should.equal(4)
    return $html
      .find(".fsfs-running-dates")
      .last()
      .text()
      .should.equal("Jul 12 – Aug 23, 2013")
  })

  it("optionally displays the location", function () {
    const shows = new PartnerShows([fabricate("show")])
    const $html = $(
      render("large")({ shows: shows.models, displayLocation: true })
    )
    return $html
      .find(".fsfs-running-dates")
      .last()
      .text()
      .should.containEql("New York")
  })

  return describe("relative date logic", () =>
    it("renders correctly", function () {
      const shows = new PartnerShows(
        _.times(3, () => fabricate("show", { status: "closed" }))
      )
      shows.add(fabricate("show", { status: "running" }))
      shows.add(fabricate("show", { status: "upcoming" }))
      const $html = $(render("large")({ shows: shows.models }))
      $html.find(".fsfs-running-dates").length.should.equal(4)
      return $($html.find(".featured-shows-featured-show").get(4))
        .html()
        .should.containEql("Opening Jul 12")
    }))
})
