/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const benv = require("benv")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Partner = require("../../../../../models/partner")
const PartnerCellView = benv.requireWithJadeify(require.resolve("../view"), [
  "template",
])

PartnerCellView.__set__("Cities", [
  {
    slug: "new-york-ny-usa",
    name: "New York",
    full_name: "New York, NY, USA",
    coords: [40.71, -74.01],
  },
])

describe("PartnerCellView", function () {
  before(done =>
    benv.setup(function () {
      benv.expose({ $: benv.require("jquery"), jQuery: benv.require("jquery") })
      Backbone.$ = $
      return done()
    })
  )

  after(() => benv.teardown())

  beforeEach(function () {
    return (this.partner = {
      id: "soze-gallery",
      name: "Soze Gallery",
      initials: "SG",
      locations: [{ city: "Los Angeles" }, { city: "New York" }],
      profile: {
        id: "soze-gallery",
        href: "/soze-gallery",
        image: { cropped: { url: "/something.jpeg" } },
      },
    })
  })

  return describe("#render", function () {
    it("renders partner data", function () {
      this.view = new PartnerCellView({ partner: this.partner })
      this.view.render()
      this.view.$(".partner-cell-name").text().should.equal("Soze Gallery")
      this.view
        .$(".partner-cell-follow-button")
        .data("id")
        .should.equal("soze-gallery")
      this.view
        .$(".partner-featured-image")
        .attr("href")
        .should.equal("/soze-gallery")
      this.view
        .$(".partner-cell-name")
        .attr("href")
        .should.equal("/soze-gallery")
      return this.view.$(".hoverable-image").data("initials").should.equal("SG")
    })

    describe("with an image", function () {
      beforeEach(function () {
        this.view = new PartnerCellView({ partner: this.partner })
        return this.view.render()
      })

      it("sets the class", function () {
        return this.view
          .$(".hoverable-image")
          .hasClass("is-missing")
          .should.be.false()
      })

      return it("sets background image", function () {
        return this.view
          .$(".hoverable-image")
          .attr("style")
          .should.containEql("background-image: url(/something.jpeg)")
      })
    })

    describe("without an image", function () {
      beforeEach(function () {
        this.partner.profile.image = {}
        this.view = new PartnerCellView({ partner: this.partner })
        return this.view.render()
      })

      it("sets the class", function () {
        return this.view
          .$(".hoverable-image")
          .hasClass("is-missing")
          .should.be.true()
      })

      return it("does not set background image", function () {
        return this.view.$(".hoverable-image").is("style").should.be.false()
      })
    })

    return describe("preferred city", function () {
      it("lists preferred city first if gallery location matches", function () {
        this.view = new PartnerCellView({
          partner: this.partner,
          preferredCitySlug: "new-york-ny-usa",
        })
        this.view.render()

        return this.view
          .$(".partner-cell-location")
          .text()
          .should.equal("New York & 1 other location")
      })

      it("lists first location first if gallery location does not match", function () {
        this.view = new PartnerCellView({
          partner: this.partner,
          preferredCitySlug: "tokyo",
        })
        this.view.render()

        return this.view
          .$(".partner-cell-location")
          .text()
          .should.equal("Los Angeles & 1 other location")
      })

      return it("lists first location first if no peferred city provided", function () {
        this.view = new PartnerCellView({ partner: this.partner })
        this.view.render()

        return this.view
          .$(".partner-cell-location")
          .text()
          .should.equal("Los Angeles & 1 other location")
      })
    })
  })
})
