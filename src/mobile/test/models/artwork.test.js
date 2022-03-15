/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const Backbone = require("backbone")
const { Artwork } = require("../../models/artwork")
const { fabricate } = require("@artsy/antigravity")

describe("Artwork", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.artwork = new Artwork(fabricate("artwork")))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#defaultImageUrl", function () {
    it("returns the first medium image url by default", function () {
      return this.artwork
        .defaultImageUrl()
        .should.match(new RegExp(`/local/additional_images/.*/medium.jpg`))
    })

    return it("works if there are no images", function () {
      this.artwork.set({ images: [] })
      return this.artwork
        .defaultImageUrl()
        .should.equal("/images/missing_image.png")
    })
  })

  describe("#showPriceLabel", function () {
    it("shows the prices label if theres a price, no ediitons, and inquireable", function () {
      this.artwork.set({ price: "1000", edition_sets: [], inquireable: true })
      return this.artwork.showPriceLabel().should.be.ok()
    })

    it("doesnt shows the prices label if theres no price", function () {
      this.artwork.set({ price: null, edition_sets: [], inquireable: false })
      return this.artwork.showPriceLabel().should.not.be.ok()
    })

    return it("shows the label for artworks that are contact for price", function () {
      this.artwork.set({
        price: "",
        sale_message: "Contact For Price",
        edition_sets: [],
        inquireable: true,
      })
      return this.artwork.showPriceLabel().should.be.ok()
    })
  })

  describe("#editionSets", () =>
    it("wraps the edition sets in a collection", function () {
      this.artwork.set({ edition_sets: [{ foo: "bar" }] })
      return this.artwork.editionSets().first().get("foo").should.equal("bar")
    }))

  describe("#partnerHref", function () {
    it("blank with collecting institution and profile", function () {
      this.artwork.set({
        collecting_institution: "foobar",
        partner: {
          profile: fabricate("profile"),
        },
      })
      return this.artwork.partnerHref().should.equal("")
    })

    it("links to the profile page second", function () {
      this.artwork.set({
        collecting_institution: null,
        partner: {
          has_full_profile: true,
          id: "foobaz",
        },
      })
      return this.artwork.partnerHref().should.equal("/partner/foobaz")
    })

    it("links to website last", function () {
      this.artwork.set({
        collecting_institution: null,
        partner: {
          has_full_profile: false,
          default_profile_id: "foobaz",
          website: "moobarz.com",
        },
      })
      return this.artwork.partnerHref().should.equal("moobarz.com")
    })

    return it("without any collecting_institution, profile page, or website, returns empty string", function () {
      this.artwork.set({
        collecting_institution: null,
        partner: {
          has_full_profile: null,
          default_profile_id: null,
          website: null,
        },
      })
      return this.artwork.partnerHref().should.equal("")
    })
  })

  describe("#partnerName", () =>
    it("shows collecting institution first", function () {
      this.artwork.set({
        collecting_institution: "Österreichische Galerie Belvedere, Vienna",
      })
      return this.artwork
        .partnerName()
        .should.equal("Österreichische Galerie Belvedere, Vienna")
    }))

  describe("#hasMoreInfo", () =>
    it("returns true if the artwork has more info to display and false otherwise", function () {
      this.artwork.hasMoreInfo().should.be.true()
      this.artwork.set({
        provenance: "",
        exhibition_history: "",
        signature: "",
        additional_information: "",
        literature: "",
      })
      return this.artwork.hasMoreInfo().should.be.false()
    }))

  describe("#saleMessage", () =>
    it("formats sold sale message", function () {
      this.artwork.set({ sale_message: "$6,000 - Sold", price: "$6,000" })
      this.artwork.saleMessage().should.equal("Sold — $6,000")
      this.artwork.set({ sale_message: "$6,000" })
      return this.artwork.saleMessage().should.equal("$6,000")
    }))

  return describe("#availableForSale", function () {
    it("shows if the artwork is for sale", function () {
      this.artwork.set({ availability: "for sale" })
      return this.artwork.availableForSale().should.be.ok()
    })

    it("doesn't show artworks that are 'sold'", function () {
      this.artwork.set({ availability: "sold" })
      return this.artwork.availableForSale().should.be.false()
    })

    it("doesn't show artworks that are 'on hold'", function () {
      this.artwork.set({ availability: "on hold" })
      return this.artwork.availableForSale().should.be.false()
    })

    return it("doesn't show artworks that are 'not for sale'", function () {
      this.artwork.set({ availability: "not for sale" })
      return this.artwork.availableForSale().should.be.false()
    })
  })
})
