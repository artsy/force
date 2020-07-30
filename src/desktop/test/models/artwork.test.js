/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const should = require("should")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Artwork = require("../../models/artwork")

describe("Artwork", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.artwork = new Artwork(fabricate("artwork"), { parse: true }))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#saleMessage", function () {
    it("returns sold when artwork is sold (w/ or w/o price)", function () {
      this.artwork.set({ sale_message: "$6,000 - Sold" })
      this.artwork.saleMessage().should.equal("Sold")
      this.artwork.set({ sale_message: "Sold" })
      return this.artwork.saleMessage().should.equal("Sold")
    })

    it("returns On loan when artwork is on loan", function () {
      this.artwork.set({ availability: "on loan" })
      return this.artwork.saleMessage().should.equal("On loan")
    })

    it("returns the price when on hold", function () {
      this.artwork.set({ availability: "on hold", price: "$420" })
      this.artwork.saleMessage().should.equal("$420, on hold")
      this.artwork.unset("price")
      return this.artwork.saleMessage().should.equal("On hold")
    })

    return describe('sale_message is "Contact for Price" or availability is "not for sale" or "permanent collection"', () =>
      it("returns undefined", function () {
        this.artwork.set({ availability: "permanent collection" })
        _.isUndefined(this.artwork.saleMessage()).should.be.true()
        this.artwork.set({
          sale_message: "Contact For Price",
          price: "$6,000",
          availability: "for sale",
        })
        _.isUndefined(this.artwork.saleMessage()).should.be.true()
        this.artwork.unset("sale_message", "price")
        this.artwork.set({ availability: "not for sale" })
        return _.isUndefined(this.artwork.saleMessage()).should.be.true()
      }))
  })

  describe("#downloadableFilename", () =>
    it("returns a human readable filename", function () {
      return this.artwork
        .downloadableFilename()
        .should.equal("andy-warhol-skull-1999.jpg")
    }))

  describe("#downloadableUrl", function () {
    describe("as a normal user", () =>
      it('returns the URL to the "larger" file', function () {
        this.artwork.downloadableUrl().should.containEql("larger.jpg")
        return this.artwork
          .downloadableUrl({
            isAdmin() {
              return false
            },
          })
          .should.containEql("larger.jpg")
      }))

    return describe("as an admin", () =>
      it('returns the URL to the "original" file', function () {
        return this.artwork
          .downloadableUrl({
            isAdmin() {
              return true
            },
          })
          .should.containEql("original.jpg")
      }))
  })

  describe("display conditions:", function () {
    describe("can be downloadable", function () {
      it("is downloadable if it is downloadable", function () {
        this.artwork.defaultImage().set("downloadable", false)
        this.artwork.isDownloadable().should.be.false()
        this.artwork.defaultImage().set("downloadable", true)
        return this.artwork.isDownloadable().should.be.true()
      })

      return it("is downloadable no matter what if the user is an admin", function () {
        this.artwork.defaultImage().set("downloadable", false)
        this.artwork.isDownloadable().should.be.false()
        this.artwork
          .isDownloadable({
            isAdmin() {
              return false
            },
          })
          .should.be.false()
        return this.artwork
          .isDownloadable({
            isAdmin() {
              return true
            },
          })
          .should.be.true()
      })
    })

    it("can have a price displayed", function () {
      sinon.stub(this.artwork, "isMultipleEditions").returns(false)
      sinon.stub(this.artwork, "isUnavailableButInquireable").returns(false)
      this.artwork.set({ price: "existy", inquireable: true })
      this.artwork.isPriceDisplayable().should.be.true()
      this.artwork.set({ inquireable: false, sold: true })
      this.artwork.isPriceDisplayable().should.be.true()
      this.artwork.set({ inquireable: false, sold: false })
      this.artwork.isPriceDisplayable().should.be.false()
      this.artwork.set({ inquireable: true, price: undefined })
      this.artwork.isPriceDisplayable().should.be.false()
      this.artwork.set({ inquireable: true, price: "existy" })
      this.artwork.isPriceDisplayable().should.be.true()
      this.artwork.isMultipleEditions.restore()
      return this.artwork.isUnavailableButInquireable.restore()
    })

    it("can have multiple editions", function () {
      this.artwork.set("edition_sets", undefined)
      this.artwork.isMultipleEditions().should.be.false()
      this.artwork.set("edition_sets", [0])
      this.artwork.isMultipleEditions().should.be.false()
      this.artwork.set("edition_sets", [0, 0])
      return this.artwork.isMultipleEditions().should.be.true()
    })

    it("normalizes dimensions", function () {
      this.artwork.set({ dimensions: { cm: "10 × 200 × 30cm" } })
      this.artwork.normalizedDimensions().should.eql([10, 200, 30])
      this.artwork.set({ dimensions: { cm: "10 × 200 × 30" } })
      this.artwork.normalizedDimensions().should.eql([10, 200, 30])
      this.artwork.set({ dimensions: { cm: "101 × 20cm" } })
      this.artwork.normalizedDimensions().should.eql([101, 20])
      this.artwork.set({ dimensions: { cm: "1525cm" } })
      return this.artwork.normalizedDimensions().should.eql([1525])
    })

    it("might be too big (more than 1524 cmches on a side)", function () {
      this.artwork.set({ dimensions: { cm: "10 × 20cm" } })
      this.artwork.tooBig().should.be.false()
      this.artwork.set({ dimensions: { cm: "1524 × 1524cm" } })
      this.artwork.tooBig().should.be.false()
      this.artwork.set({ dimensions: { cm: "1524.5 × 1524cm" } })
      this.artwork.tooBig().should.be.true()
      this.artwork.set({ dimensions: { cm: "1524 × 1525cm" } })
      return this.artwork.tooBig().should.be.true()
    })

    it("can be hung", function () {
      this.artwork.set({ depth: undefined, height: 1, width: "1" })
      this.artwork.set("category", "Design")
      this.artwork.isHangable().should.be.false()
      this.artwork.set("category", "Painting")
      this.artwork.isHangable().should.be.true()
      this.artwork.set("depth", 1)
      this.artwork.isHangable().should.be.false()
      this.artwork.unset("depth")
      this.artwork.set({ dimensions: { cm: "1524 × 20cm" } })
      this.artwork.isHangable().should.be.true()
      this.artwork.set({ dimensions: { cm: "1525 × 20cm" } })
      this.artwork.isHangable().should.be.false()
      this.artwork.set({ dimensions: { cm: "1524 × 20cm" } })
      this.artwork.isHangable().should.be.true()
      this.artwork.set("diameter", 1)
      return this.artwork.isHangable().should.be.false()
    })

    describe("#isPartOfAuction", function () {
      beforeEach(function () {
        return this.artwork.related().sales.reset()
      })

      return it("returns true if the artwork has a related auction", function () {
        this.artwork.isPartOfAuction().should.be.false()
        // Adds a promo
        this.artwork
          .related()
          .sales.add({ sale_type: "auction promo", auction_state: "preview" })
        this.artwork.isPartOfAuction().should.be.false()
        // Adds auction
        this.artwork.related().sales.add({ is_auction: true })
        return this.artwork.isPartOfAuction().should.be.true()
      })
    })

    describe("#isPartOfAuctionPromo", function () {
      beforeEach(function () {
        return this.artwork.related().sales.reset()
      })

      return it("might be part of an auction promo", function () {
        this.artwork.related().sales.add({ is_auction: true })
        this.artwork.isPartOfAuctionPromo().should.be.false()
        this.artwork.related().sales.add({ sale_type: "auction promo" })
        return this.artwork.isPartOfAuctionPromo().should.be.true()
      })
    })

    describe("#isContactable", function () {
      it("can be contacted given the correct flags", function () {
        this.artwork.set({
          forsale: true,
          partner: "existy",
          acquireable: false,
        })
        this.artwork.isContactable().should.be.true()
        this.artwork.set({
          forsale: true,
          partner: "existy",
          acquireable: true,
        })
        this.artwork.isContactable().should.be.false()
        this.artwork.set({
          forsale: false,
          partner: "existy",
          acquireable: false,
        })
        this.artwork.isContactable().should.be.false()
        this.artwork.set({
          forsale: true,
          partner: undefined,
          acquireable: false,
        })
        return this.artwork.isContactable().should.be.false()
      })

      describe("with auction promo", function () {
        beforeEach(function () {
          return this.artwork.related().sales.reset()
        })

        return it("is contactable given an auction promo in the preview state", function () {
          this.artwork.set({
            forsale: true,
            partner: "existy",
            acquireable: true,
          })
          // Despite being normally uncontactable
          this.artwork.isContactable().should.be.false()
          // Becomes contactable in the presence of a previeable promo
          this.artwork
            .related()
            .sales.add({ sale_type: "auction promo", auction_state: "preview" })
          return this.artwork.isContactable().should.be.true()
        })
      })

      return describe("with an auction", function () {
        beforeEach(function () {
          return this.artwork.related().sales.reset()
        })

        return it("is not contactable at all", function () {
          this.artwork.set({
            forsale: true,
            partner: "existy",
            acquireable: false,
          })
          // Contactable at first
          this.artwork.isContactable().should.be.true()
          // Auction enters
          this.artwork.related().sales.add({ is_auction: true })
          // No longer contactable
          return this.artwork.isContactable().should.be.false()
        })
      })
    })

    return it("might be unavailable... but inquireable", function () {
      this.artwork.set({ forsale: false, inquireable: true, sold: false })
      this.artwork.isUnavailableButInquireable().should.be.true()
      this.artwork.set({ forsale: true, inquireable: true, sold: false })
      this.artwork.isUnavailableButInquireable().should.be.false()
      this.artwork.set({ forsale: false, inquireable: true, sold: true })
      return this.artwork.isUnavailableButInquireable().should.be.false()
    })
  })

  describe("#hasDimension", () =>
    it("returns true on any attribute vaguely numeric", function () {
      this.artwork.set({ width: 1 })
      this.artwork.hasDimension("width").should.be.true()
      this.artwork.set({ width: "nope" })
      this.artwork.hasDimension("width").should.be.false()
      this.artwork.set({ width: "1 nope" })
      this.artwork.hasDimension("width").should.be.true()
      this.artwork.set({ width: "1 1/2 in" })
      this.artwork.hasDimension("width").should.be.true()
      this.artwork.unset("width")
      return this.artwork.hasDimension("width").should.be.false()
    }))

  describe("#hasMoreInfo", function () {
    it("has more info", function () {
      this.artwork.set({
        provenance: undefined,
        exhibition_history: "",
        signature: "",
        additional_information: undefined,
        literature: undefined,
      })
      this.artwork.hasMoreInfo().should.be.false()
      this.artwork.set("literature", "existy")
      return this.artwork.hasMoreInfo().should.be.true()
    })

    return it("has more info when there is a blurb", function () {
      this.artwork.clear()
      this.artwork.hasMoreInfo().should.be.false()
      this.artwork.set("blurb", "existy")
      return this.artwork.hasMoreInfo().should.be.true()
    })
  })

  describe("#contactLabel", () =>
    it("says to contact the appropriate thing", function () {
      this.artwork.set("partner", { type: "Gallery" })
      this.artwork.contactLabel().should.equal("gallery")
      this.artwork.set("partner", { type: "Institution" })
      this.artwork.contactLabel().should.equal("seller")
      this.artwork.unset("partner")
      return this.artwork.contactLabel().should.equal("seller")
    }))

  describe("#priceDisplay", () =>
    it("displays the price or not", function () {
      this.artwork.set({
        availability: "for sale",
        price_hidden: false,
        price: "$_$",
      })
      this.artwork.priceDisplay().should.equal("$_$")
      this.artwork.set({
        availability: "for sale",
        price_hidden: false,
        price: undefined,
        sale_message: "Contact For Price",
      })
      this.artwork.priceDisplay().should.equal("Contact For Price")
      this.artwork.set({
        availability: "for sale",
        price_hidden: true,
        price: "$_$",
      })
      return this.artwork.priceDisplay().should.equal("Contact For Price")
    }))

  describe("#editionStatus", () =>
    it("displays what kind of edition it is otherwise is undefined", function () {
      this.artwork.set({ unique: true })
      this.artwork.editions = new Backbone.Collection()
      this.artwork.editionStatus().should.equal("Unique")
      this.artwork.set({ unique: false })
      _.isUndefined(this.artwork.editionStatus()).should.be.true()
      this.artwork.editions.add({ editions: "1 of 5" })
      return this.artwork.editionStatus().should.equal("1 of 5")
    }))

  describe("#defaultImageUrl", function () {
    it("returns the first medium image url by default", function () {
      return this.artwork
        .defaultImageUrl()
        .should.match(new RegExp(`/local/additional_images/.*/medium.jpg`))
    })

    // Have to unset the images attribute as well as resetting the collection
    // due to #defaultImage falling back to wrapping the first element
    // of the images attribute
    return it("works if there are no images", function () {
      this.artwork.unset("images")
      this.artwork.related().images.reset()
      return this.artwork
        .defaultImageUrl()
        .should.equal(this.artwork.defaultImage().missingImageUrl())
    })
  })

  describe("#defaultImage", () =>
    it("works if artwork.images is null but has images", function () {
      this.artwork.images = null
      return this.artwork
        .defaultImage()
        .get("id")
        .should.equal(this.artwork.get("images")[1].id)
    }))

  describe("#titleAndYear", function () {
    it("returns empty string without title or year", function () {
      this.artwork.set({ title: false, date: false })
      return this.artwork.titleAndYear().should.equal("")
    })

    it("renderes correctly with just a date", function () {
      this.artwork.set({ title: false, date: "1905" })
      return this.artwork.titleAndYear().should.equal("1905")
    })

    return it("emphasises the title", function () {
      this.artwork.set({ title: "title", date: "1905" })
      return this.artwork.titleAndYear().should.equal("<em>title</em>, 1905")
    })
  })

  describe("#partnerName", function () {
    it("partner name", function () {
      this.artwork.set({ partner: fabricate("partner") })
      this.artwork.unset("collecting_institution")
      return this.artwork.partnerName().should.equal("Gagosian Gallery")
    })

    return it("partner name with collecting institution", function () {
      this.artwork.set({ partner: fabricate("partner") })
      return this.artwork.partnerName().should.equal("MOMA")
    })
  })

  describe("#partnerLink", function () {
    it("empty without partner", function () {
      this.artwork.unset("partner")
      return should.strictEqual(undefined, this.artwork.partnerLink())
    })

    it("partner profile", function () {
      this.artwork.get("partner").default_profile_public = true
      this.artwork.get("partner").default_profile_id = "profile-id"
      return this.artwork.partnerLink().should.equal("/profile-id")
    })

    it("doesn't render an external website", function () {
      this.artwork.get("partner").default_profile_public = false
      this.artwork.get("partner").default_profile_id = "profile-id"
      this.artwork.get("partner").website = "mah-website.com"
      return should.strictEqual(undefined, this.artwork.partnerLink())
    })

    return it("partner website if profile and profile is private", function () {
      this.artwork.get("partner").type = "Auction"
      return should.strictEqual(undefined, this.artwork.partnerLink())
    })
  })

  describe("#href", () =>
    it("creates an href for linking to this artwork", function () {
      return this.artwork
        .href()
        .should.equal(`/artwork/${this.artwork.get("id")}`)
    }))

  describe("#toAltText", function () {
    it("Includes title, date and artist name", function () {
      return this.artwork
        .toAltText()
        .should.equal("Andy Warhol, 'Skull,' 1999, Gagosian Gallery")
    })

    return it("Works without title, date, partner, and artist name", function () {
      this.artwork.set({
        artist: undefined,
        date: undefined,
        title: undefined,
        partner: undefined,
      })
      return this.artwork.toAltText().should.equal("")
    })
  })

  describe("artistName", () =>
    it("renders correctly", function () {
      new Artwork({ title: "title", forsale: false })
        .artistName()
        .should.equal("")
      new Artwork({
        title: "title",
        forsale: false,
        artist: { name: undefined },
      })
        .artistName()
        .should.equal("")
      new Artwork({
        title: "title",
        forsale: false,
        artists: [{ name: undefined }],
      })
        .artistName()
        .should.equal("")
      new Artwork({
        title: "title",
        forsale: false,
        artist: { name: "popeye the sailor" },
      })
        .artistName()
        .should.equal("popeye the sailor")
      new Artwork({
        title: "title",
        forsale: false,
        artists: [{ name: "cap'n crunch" }],
      })
        .artistName()
        .should.equal("cap'n crunch")
      new Artwork({
        title: "title",
        forsale: false,
        artists: [{ name: "cap'n crunch" }, { name: "popeye the sailor" }],
      })
        .artistName()
        .should.equal("cap'n crunch")
      new Artwork({
        title: "title",
        forsale: false,
        artists: [{ name: undefined }, { name: "so and so" }],
      })
        .artistName()
        .should.equal("so and so")
      return new Artwork({
        title: "title",
        forsale: false,
        artist: { name: undefined },
        artists: [{ name: "so and so" }],
      })
        .artistName()
        .should.equal("so and so")
    }))

  describe("artistsNames", () =>
    it("renders correctly", function () {
      new Artwork({ title: "title", forsale: false })
        .artistsNames()
        .should.equal("")
      new Artwork({
        title: "title",
        forsale: false,
        artist: { name: "john doe" },
      })
        .artistsNames()
        .should.equal("john doe")
      new Artwork({
        title: "title",
        forsale: false,
        artists: [{ name: "john doe" }, { name: "mark twain" }],
      })
        .artistsNames()
        .should.equal("john doe and mark twain")
      new Artwork({
        title: "title",
        forsale: false,
        artists: [{ name: undefined }, { name: "mark twain" }],
      })
        .artistsNames()
        .should.equal("mark twain")
      new Artwork({
        title: "title",
        forsale: false,
        artists: [
          { name: "john doe" },
          { name: "mark twain" },
          { name: "joey pepperoni" },
        ],
      })
        .artistsNames()
        .should.equal("john doe, mark twain and joey pepperoni")
      return new Artwork({
        title: "title",
        forsale: false,
        artists: [
          { name: undefined },
          { name: "mark twain" },
          { name: "joey pepperoni" },
        ],
      })
        .artistsNames()
        .should.equal("mark twain and joey pepperoni")
    }))

  describe("#toPageTitle", () =>
    it("renders correctly", function () {
      new Artwork({ title: "", forsale: false })
        .toPageTitle()
        .should.equal("Artsy")
      new Artwork({ title: "title", forsale: false })
        .toPageTitle()
        .should.equal("title | Artsy")
      new Artwork({ title: "title", forsale: true })
        .toPageTitle()
        .should.equal("title, Available for Sale | Artsy")
      new Artwork({
        title: "title",
        forsale: false,
        artist: { name: "john doe" },
      })
        .toPageTitle()
        .should.equal("john doe | title | Artsy")
      new Artwork({
        title: "title",
        forsale: false,
        artists: [{ name: "john doe" }, { name: "santa claus" }],
      })
        .toPageTitle()
        .should.equal("john doe and santa claus | title | Artsy")
      new Artwork({
        title: "title",
        forsale: false,
        artists: [
          { name: "john doe" },
          { name: "santa claus" },
          { name: "hello kitty" },
        ],
      })
        .toPageTitle()
        .should.equal("john doe, santa claus and hello kitty | title | Artsy")
      new Artwork({ title: "", forsale: false, artist: { name: "last" } })
        .toPageTitle()
        .should.equal("last | Artsy")
      new Artwork({ title: "title", forsale: false, date: "2010" })
        .toPageTitle()
        .should.equal("title (2010) | Artsy")
      new Artwork({
        title: "title",
        forsale: false,
        date: "2010",
        artist: { name: "last" },
      })
        .toPageTitle()
        .should.equal("last | title (2010) | Artsy")
      new Artwork({
        title: "title",
        forsale: false,
        date: "2010-2011",
        artist: { name: "first last" },
      })
        .toPageTitle()
        .should.equal("first last | title (2010-2011) | Artsy")
      return new Artwork({
        title: "title",
        forsale: false,
        date: "2010, 2011, 2012",
        artist: { name: "first last" },
      })
        .toPageTitle()
        .should.equal("first last | title (2010, 2011, 2012) | Artsy")
    }))

  describe("#toPageDescription", () =>
    it("renders correctly", function () {
      new Artwork({ title: "title" }).toPageDescription().should.equal("title")
      new Artwork({
        title: "title",
        partner: { name: "partner" },
        forsale: false,
      })
        .toPageDescription()
        .should.equal("From partner, title")
      new Artwork({
        title: "title",
        partner: { name: "partner" },
        forsale: true,
      })
        .toPageDescription()
        .should.equal("Available for sale from partner, title")
      new Artwork({
        title: "title",
        dimensions: { in: "2 × 1 × 3 in" },
        metric: "in",
        forsale: false,
      })
        .toPageDescription()
        .should.equal("title, 2 × 1 × 3 in")
      new Artwork({
        title: "title",
        dimensions: { in: "2 × 1 × 3 in" },
        metric: "in",
        medium: "Awesomeness",
        forsale: false,
      })
        .toPageDescription()
        .should.equal("title, Awesomeness, 2 × 1 × 3 in")
      new Artwork({
        title: "title",
        dimensions: { cm: "45000000 × 2000000000 cm" },
        metric: "cm",
        forsale: false,
      })
        .toPageDescription()
        .should.equal("title, 45000000 × 2000000000 cm")
      new Artwork({
        title: "title",
        dimensions: { cm: "45000000 × 2000000000 cm" },
        metric: "cm",
        medium: "Awesomeness",
        forsale: false,
      })
        .toPageDescription()
        .should.equal("title, Awesomeness, 45000000 × 2000000000 cm")
      new Artwork({
        title: "title",
        dimensions: { cm: "20 cm diameter" },
        metric: "cm",
        forsale: false,
      })
        .toPageDescription()
        .should.equal("title, 20 cm diameter")
      new Artwork({
        title: "title",
        dimensions: { cm: "20 cm diameter" },
        metric: "cm",
        medium: "Awesomeness",
        forsale: false,
      })
        .toPageDescription()
        .should.equal("title, Awesomeness, 20 cm diameter")
      return new Artwork({
        title: "title",
        dimensions: { cm: "20 cm diameter" },
        metric: "cm",
        medium: "Awesomeness",
        artist: { name: "first last" },
        forsale: false,
      })
        .toPageDescription()
        .should.equal("first last, title, Awesomeness, 20 cm diameter")
    }))

  return describe("#toJSONLD", () =>
    it("returns valid json", function () {
      const json = this.artwork.toJSONLD()
      json["@context"].should.equal("http://schema.org")
      json["@type"].should.equal("CreativeWork")
      return json.name.should.equal("Skull")
    }))
})
