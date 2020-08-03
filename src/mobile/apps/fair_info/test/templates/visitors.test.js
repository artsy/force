/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const cheerio = require("cheerio")
const Backbone = require("backbone")
const Fair = require("../../../../models/fair")
const PartnerLocation = require("../../../../models/partner_location")
const Profile = require("../../../../models/profile")
const InfoMenu = require("../../info_menu.coffee")
const { fabricate } = require("@artsy/antigravity")

describe("Visitors", function () {
  let infoMenu = null
  beforeEach(function () {
    infoMenu = new InfoMenu({ fair: new Fair(fabricate("fair")) })
    return (infoMenu.infoMenu = {
      events: true,
      programming: true,
      artsyAtTheFair: false,
      aboutTheFair: false,
    })
  })

  const render = function (fair, location) {
    const filename = path.resolve(__dirname, "../../templates/visitors.jade")
    return jade.compile(fs.readFileSync(filename), { filename })({
      fair,
      location,
      infoMenu,
      sd: { FAIR: fair, profile: new Profile(fabricate("fair")) },
    })
  }

  it("should not display map without coordinates", function () {
    const location = new PartnerLocation(fabricate("partner_location"))
    const fair = new Fair(fabricate("fair"))

    this.html = render(fair, location)
    this.html.should.not.containEql("fair-page-info-map")
    this.html.should.not.containEql("Hours")
    this.html.should.not.containEql("Tickets")
    return this.html.should.containEql("Links")
  })

  it("render a map with coordinates", function () {
    const fair = new Fair(fabricate("fair"))
    const location = new PartnerLocation(
      fabricate("partner_location", { coordinates: { lat: 30, lng: 74 } })
    )
    this.html = render(fair, location)
    return this.html.should.containEql("fair-info2-map")
  })

  it("renders location", function () {
    const fair = new Fair(fabricate("fair"))
    const location = new PartnerLocation(
      fabricate("partner_location", {
        summary: "401 Broadway New York, New York",
      })
    )
    this.html = render(fair, location)
    const $ = cheerio.load(this.html)
    this.html.should.containEql("Location")
    this.html.should.containEql("fair-page-info-location-summary")
    return $(".fair-page-info-location-summary")
      .html()
      .should.containEql("401 Broadway New York, New York")
  })

  it("renders hours", function () {
    const fair = new Fair(fabricate("fair", { hours: "8:00am - 5:00pm" }))
    const location = new PartnerLocation(fabricate("partner_location"))
    this.html = render(fair, location)
    const $ = cheerio.load(this.html)
    this.html.should.containEql("Hours")
    return $(".fair-info-hours.formatted-markdown")
      .html()
      .should.containEql("8:00am - 5:00pm")
  })

  it("renders tickets", function () {
    const fair = new Fair(fabricate("fair", { tickets: "Adult - $25" }))
    const location = new PartnerLocation(fabricate("partner_location"))
    this.html = render(fair, location)
    const $ = cheerio.load(this.html)
    this.html.should.containEql("Tickets")
    return $(".fair-info-tickets").html().should.containEql("Adult - $25")
  })

  it("renders contact", function () {
    const fair = new Fair(fabricate("fair"))
    const location = new PartnerLocation(fabricate("partner_location"))
    this.html = render(fair, location)
    const $ = cheerio.load(this.html)
    this.html.should.containEql("Contact")
    return $(".fair-info-contact")
      .html()
      .should.containEql("<p>Design Miami/ Office<br>Call + 1 555 555 5555</p>")
  })

  return it("renders links", function () {
    const fair = new Fair(fabricate("fair"))
    const location = new PartnerLocation(fabricate("partner_location"))
    this.html = render(fair, location)
    const $ = cheerio.load(this.html)
    this.html.should.containEql("Links")
    return $(".fair-info-link")
      .html()
      .should.containEql('<p><a href="http://google.com">Google</a></p>')
  })
})
