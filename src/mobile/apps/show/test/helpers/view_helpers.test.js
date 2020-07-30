/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Show = require("../../../../models/show")
const { fabricate } = require("@artsy/antigravity")
const ViewHelper = require("../../helpers/view_helpers.coffee")

describe("toJSONLD", function () {
  context("when show has location", function () {
    beforeEach(function () {
      const show = new Show(fabricate("show"))
      return (this.jsonLD = ViewHelper.toJSONLD(show))
    })

    it("jsonld has the show name", function () {
      return this.jsonLD.name.should.containEql("Inez & Vinoodh")
    })

    it("jsonld has the show url", function () {
      return this.jsonLD.url.should.containEql(
        "/show/gagosian-gallery-inez-and-vinoo"
      )
    })

    it("jsonld has the image", function () {
      return this.jsonLD.image.should.containEql(
        "/local/partner_show_images/51f6a51d275b24a787000c36/1/:version.jpg"
      )
    })

    it("jsonld has the show dates", function () {
      this.jsonLD.startDate.should.containEql("2013-07-12")
      return this.jsonLD.endDate.should.containEql("2013-08-23")
    })

    return it("jsonld has the address", function () {
      this.jsonLD.location["@type"].should.eql("Place")
      this.jsonLD.location.address["@type"].should.eql("PostalAddress")
      this.jsonLD.location.address.streetAddress.should.eql(
        "529 W 20th St.2nd Floor"
      )
      this.jsonLD.location.address.addressLocality.should.eql("New York")
      this.jsonLD.location.address.addressRegion.should.eql("NY")
      return this.jsonLD.location.address.postalCode.should.eql("10011")
    })
  })

  return context("when show does not have location", function () {
    beforeEach(function () {
      const show = new Show(fabricate("show", { location: null }))
      return (this.jsonLD = ViewHelper.toJSONLD(show))
    })
    return it("set jsonLD to null", function () {
      return (this.jsonLD === undefined).should.equal(true)
    })
  })
})
