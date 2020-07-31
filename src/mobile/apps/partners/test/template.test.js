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
const { fabricate } = require("@artsy/antigravity")
const Partner = require("../../../models/partner")
const Profiles = require("../../../collections/profiles")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Partners", function () {
  before(function () {
    this.sd = { API_URL: "http://localhost:5000" }
    this.profiles = new Profiles([
      fabricate("featured_partners_profiles", {
        id: "gagosian",
        owner: new Partner(
          fabricate("partner", {
            type: "Gallery",
            locations: new Backbone.Collection([fabricate("location")]),
          })
        ),
      }),
      fabricate("featured_partners_profiles", {
        id: "getty",
        owner: new Partner(
          fabricate("partner", {
            type: "Institution",
            name: "J. Paul Getty Museum",
            locations: new Backbone.Collection([fabricate("location")]),
          })
        ),
      }),
      fabricate("featured_partners_profiles", {
        id: "lacma",
        owner: new Partner(
          fabricate("partner", {
            type: "Institution",
            name: "LACMA",
            locations: new Backbone.Collection([fabricate("location")]),
          })
        ),
      }),
    ])
    return (this.html = render("template")({
      sd: this.sd,
      featuredPartnerProfiles: this.profiles,
    }))
  })

  return describe("template", function () {
    it("renders featured partners", function () {
      const $ = cheerio.load(this.html)
      $("a.nav-image-item").length.should.equal(3)
      return this.profiles.each(function (profile) {
        const partner = profile.get("owner")
        const $partnerItem = $(`a.nav-image-item[href='/${profile.get("id")}']`)
        $partnerItem.length.should.equal(1)
        $partnerItem.find(".nav-image-item-label-title").length.should.equal(1)
        $partnerItem
          .find(".nav-image-item-label-title")
          .text()
          .should.equal(partner.get("name"))
        return $partnerItem
          .find(".nav-image-item-label-subtitle")
          .text()
          .should.containEql(partner.get("locations").first().get("city"))
      })
    })

    it("includes a page title", function () {
      const $ = cheerio.load(this.html)
      return $(".page-heading").text().should.equal("Featured Partners")
    })

    it('includes a link to the "become a partner" form', function () {
      const $ = cheerio.load(this.html)
      $(".featured-partners-invite").length.should.equal(1)
      return $(".featured-partners-invite a")
        .attr("href")
        .should.equal("https://www.artsy.net/apply/")
    })

    // TODO: Add this with the other index pages
    //it 'includes links to galleries and instutions in the header and footer', ->
    //  $ = cheerio.load @html
    //  $('.featured-partners-nav').length.should.equal 2
    //  $(".featured-partners-nav a[href='/galleries']").length.should.equal 2
    //  $(".featured-partners-nav a[href='/institutions']").length.should.equal 2

    return describe("with incomplete location data", () =>
      it("renders without a location", function () {
        this.profiles = new Profiles([
          fabricate("featured_partners_profiles", {
            id: "gagosian",
            owner: new Partner(
              fabricate(
                "partner",
                {
                  type: "Gallery",
                  locations: new Backbone.Collection(),
                } // No locations
              )
            ),
          }),
          fabricate("featured_partners_profiles", {
            id: "pace",
            owner: new Partner(
              fabricate(
                "partner",
                {
                  type: "Gallery",
                  locations: new Backbone.Collection([
                    fabricate("location", { city: "" }),
                  ]),
                } // No city
              )
            ),
          }),
        ])
        const html = render("template")({
          sd: this.sd,
          featuredPartnerProfiles: this.profiles,
        })
        const $ = cheerio.load(html)
        $(".nav-image-item-label-subtitle").length.should.equal(1)
        return $(".nav-image-item-label-subtitle").text().should.equal("")
      }))
  })
})
