/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const sd = require("sharify").data
const should = require("should")
const Backbone = require("backbone")
const Profile = require("../../models/profile")
const sinon = require("sinon")

describe("Profile", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.profile = new Profile(
      fabricate("partner_profile", {
        owner_type: "PartnerInstitution",
        owner: {
          type: "Institution",
          sortable_id: "getty-museum",
          name: "J. Paul Getty Museum",
          default_profile_id: "getty",
        },
        icon: {
          id: "51eefb79275b2420810001fe",
          image_filename: "GGLogo1.jpg",
          image_url:
            "http://static2.artsy.net/profile_icons/51eefb79275b2420810001fe/:version.jpg",
          image_versions: ["square140"],
          x: 0,
          y: 0,
          width: 140,
        },
      })
    ))
  })

  afterEach(() => Backbone.sync.restore())

  describe("#isUserClass", () =>
    it("returns is-user if the profile is a user and is set to use a circular default icon", function () {
      this.profile.isUserClass().should.equal("is-partner")
      this.profile.set({ owner_type: "User" })
      this.profile.set({ default_icon_version: "circle" })
      return this.profile.isUserClass().should.equal("is-user")
    }))

  describe("#iconImageUrl", () =>
    it("returns the icon url for the model's default icon version", function () {
      return this.profile.iconImageUrl().should.containEql("square")
    }))

  describe("#hasIconImage", function () {
    it("returns true if profile has an icon", function () {
      return this.profile.hasIconImage().should.be.ok()
    })

    it("returns false if profile has no valid icon", function () {
      this.profile.set("icon", null)
      return this.profile.hasIconImage().should.not.be.ok()
    })

    return it("returns false if profile has no valid icon", function () {
      this.profile.set("icon", { id: "51eefb79275b2420810001fe" })
      return this.profile.hasIconImage().should.not.be.ok()
    })
  })

  describe("#bestAvailableImage", function () {
    it("returns the icon image url if there is no cover", function () {
      this.profile.unset("cover_image")
      return this.profile.bestAvailableImage().should.containEql("square")
    })

    return it("returns the cover image url for medium250x165 if it exists", function () {
      this.profile.set({
        cover_image: {
          image_url:
            "http://static2.artsy.net/profile_icons/51eefb79275b2420810001fe/:version.jpg",
          image_versions: ["medium250x165"],
        },
      })
      return this.profile
        .bestAvailableImage()
        .should.containEql("medium250x165")
    })
  })

  describe("#alphaSortKey", () =>
    it("returns the profile owner's display name", function () {
      return this.profile
        .alphaSortKey()
        .should.equal(this.profile.displayName())
    }))

  describe("#href", () =>
    it("returns the client link to this profile", function () {
      return this.profile.href().should.containEql(`/${this.profile.get("id")}`)
    }))

  describe("#displayName", () =>
    it("returns the profile owner's display name", function () {
      return this.profile
        .displayName()
        .should.equal(this.profile.related().owner.get("name"))
    }))

  describe("#isFairOrOrganizer", () =>
    it("returns true if the profile belongs to either a Fair or a Fair Organizer", function () {
      this.profile.set("owner_type", "Fair")
      this.profile.isFairOrOrganizer().should.be.true()
      this.profile.set("owner_type", "FairOrganizer")
      this.profile.isFairOrOrganizer().should.be.true()
      this.profile.set("owner_type", "User")
      return this.profile.isFairOrOrganizer().should.be.false()
    }))

  describe("#isPartner", () =>
    it("returns true if the profile does not belong to a User or Admin", function () {
      this.profile.set("owner_type", "PartnerGallery")
      this.profile.isPartner().should.be.true()
      this.profile.set("owner_type", "Admin")
      this.profile.isPartner().should.be.false()
      this.profile.set("owner_type", "User")
      return this.profile.isPartner().should.be.false()
    }))

  describe("#defaultIconInitials", function () {
    it("returns up to two initials for a partner name", function () {
      this.profile.defaultIconInitials().should.equal("JP")

      this.profile.related().owner.set("name", "Whitney")
      this.profile.defaultIconInitials().should.equal("W")

      this.profile
        .related()
        .owner.set("name", "John Jacob Jingle Heimer Schmidt")
      return this.profile.defaultIconInitials().should.equal("JJ")
    })

    return it("does not include non-word characters", function () {
      this.profile.related().owner.set("name", "Chime & Read")
      this.profile.defaultIconInitials().should.equal("CR")

      this.profile.related().owner.set("name", "2 % Johan _ Gregor 37")
      return this.profile.defaultIconInitials().should.equal("2J")
    })
  })

  describe("related owner", function () {
    it("creates PartnerGallery", function () {
      this.profile.set("owner_type", "PartnerGallery")
      return this.profile
        .related()
        .owner.constructor.name.should.equal("Partner")
    })
    it("creates PartnerInstitution", function () {
      this.profile.set("owner_type", "PartnerInstitution")
      return this.profile
        .related()
        .owner.constructor.name.should.equal("Partner")
    })
    it("creates User", function () {
      this.profile.set("owner_type", "User")
      return this.profile.related().owner.constructor.name.should.equal("User")
    })
    it("creates Fair", function () {
      this.profile.set("owner_type", "Fair")
      return this.profile.related().owner.constructor.name.should.equal("Fair")
    })
    return it("creates FairOrganizer", function () {
      this.profile.set("owner_type", "FairOrganizer")
      return this.profile
        .related()
        .owner.constructor.name.should.equal("FairOrganizer")
    })
  })

  describe("#formatFollowText", () =>
    it("returns formatted follows text", function () {
      this.profile.set({ follows_count: 1234567 })
      return this.profile.formatFollowText().should.equal("1,234,567 Followers")
    }))

  describe("#getFormattedWebsite", () =>
    it("formats website", function () {
      this.profile.set({ website: "https://artsy.net" })
      return this.profile.getFormattedWebsite().should.equal("artsy.net")
    }))

  describe("#metaTitle", function () {
    it("correctly formats title for users", function () {
      this.profile.set({ owner_type: "User" })
      return this.profile
        .metaTitle()
        .should.equal("J. Paul Getty Museum | Artsy")
    })

    it("correctly formats title for galleries", function () {
      this.profile.set({ owner_type: "PartnerGallery" })
      this.profile
        .metaTitle()
        .should.equal(
          "J. Paul Getty Museum | Artists, Art for Sale, and Contact Info | Artsy"
        )
      this.profile
        .metaTitle("overview")
        .should.equal(
          "J. Paul Getty Museum | Artists, Art for Sale, and Contact Info | Artsy"
        )
      this.profile
        .metaTitle("contact")
        .should.equal("J. Paul Getty Museum | Contact Information | Artsy")
      this.profile
        .metaTitle("about")
        .should.equal("J. Paul Getty Museum | Visitor Information | Artsy")
      this.profile
        .metaTitle("collection")
        .should.equal("J. Paul Getty Museum | Collection | Artsy")
      this.profile
        .metaTitle("shop")
        .should.equal("J. Paul Getty Museum | Shop | Artsy")
      this.profile
        .metaTitle("shows")
        .should.equal("J. Paul Getty Museum | Shows | Artsy")
      this.profile
        .metaTitle("artists")
        .should.equal("J. Paul Getty Museum | Artists | Artsy")
      this.profile
        .metaTitle("artist")
        .should.equal(
          "J. Paul Getty Museum | Artists, Art for Sale, and Contact Info | Artsy"
        )
      return this.profile
        .metaTitle("posts")
        .should.equal("J. Paul Getty Museum | Posts | Artsy")
    })

    it("correctly formats title for non-gallery partners", function () {
      this.profile.set({ owner_type: "PartnerInstitution" })
      return this.profile
        .metaTitle()
        .should.equal(
          "J. Paul Getty Museum | Artists, Artworks, and Contact Info | Artsy"
        )
    })

    return it("correctly formats title for fairs", function () {
      this.profile.set({ owner_type: "FairOrganizer" })
      this.profile
        .metaTitle()
        .should.equal(
          "J. Paul Getty Museum | Fair Info, Artists, and Art for Sale | Artsy"
        )
      this.profile
        .metaTitle("info")
        .should.equal("J. Paul Getty Museum | Visitor Information | Artsy")
      this.profile
        .metaTitle("posts")
        .should.equal("J. Paul Getty Museum | Highlighted Articles | Artsy")
      this.profile
        .metaTitle("forYou")
        .should.equal("J. Paul Getty Museum | Your Personal Fair Guide | Artsy")
      this.profile
        .metaTitle("search")
        .should.equal("J. Paul Getty Museum | Search | Artsy")
      this.profile
        .metaTitle("browse")
        .should.equal("J. Paul Getty Museum | Browse | Artsy")
      this.profile
        .metaTitle("favorites")
        .should.equal("J. Paul Getty Museum | Favorites | Artsy")
      return this.profile
        .metaTitle("follows")
        .should.equal("J. Paul Getty Museum | Following | Artsy")
    })
  })

  describe("#metaDescription", function () {
    it("correctly formats description", function () {
      this.profile.set("bio", "bio")
      this.profile.metaDescription().should.equal("bio")

      this.profile.set("bio", undefined)
      return this.profile
        .metaDescription()
        .should.equal("J. Paul Getty Museum on Artsy")
    })

    it("correctly formats title for galleries", function () {
      this.profile.set({ owner_type: "PartnerGallery" })
      this.profile
        .metaDescription()
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      this.profile
        .metaDescription("overview")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      this.profile
        .metaDescription("contact")
        .should.equal(
          "Contact information including a map of locations with phone numbers for J. Paul Getty Museum"
        )
      this.profile
        .metaDescription("about")
        .should.equal(
          "Visitor information including location and phone number for J. Paul Getty Museum"
        )
      this.profile
        .metaDescription("collection")
        .should.equal("Artworks in the collection of J. Paul Getty Museum")
      this.profile
        .metaDescription("shop")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      this.profile
        .metaDescription("shows")
        .should.equal(
          "List of current, upcoming and past shows at J. Paul Getty Museum"
        )
      this.profile
        .metaDescription("artists")
        .should.equal("List of artists represented by J. Paul Getty Museum")
      this.profile
        .metaDescription("artist")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      return this.profile
        .metaDescription("posts")
        .should.equal("Articles about and created by J. Paul Getty Museum")
    })

    return it("correctly formats title for fairs", function () {
      this.profile.set({ owner_type: "FairOrganizer" })
      this.profile
        .metaDescription()
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      this.profile
        .metaDescription("info")
        .should.equal(
          "Visitor information including location, tickets and phone number for the fair"
        )
      this.profile
        .metaDescription("posts")
        .should.equal("Featured articles about the fair")
      this.profile
        .metaDescription("forYou")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      this.profile
        .metaDescription("search")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      this.profile
        .metaDescription("browse")
        .should.equal(
          "Browse artworks at the fair by subject matter, style/technique, movement, price, and booth"
        )
      this.profile
        .metaDescription("favorites")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      return this.profile
        .metaDescription("follows")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
    })
  })

  return describe("#fetchFavorites", function () {
    it("fetches the saved-artwork collection based on the owner", function () {
      this.profile.related().owner.set("id", "foobar")
      this.profile.fetchFavorites({})
      return Backbone.sync.args[0][1].url.should.containEql(
        "saved-artwork/artworks"
      )
    })

    return it("returns feed items with a set url", function (done) {
      this.profile.related().owner.set("id", "foobar")
      this.profile.fetchFavorites({
        success(items) {
          items.url.should.containEql("saved-artwork/artworks")
          return done()
        },
      })
      return Backbone.sync.args[0][2].success([{ id: "bar" }])
    })
  })
})
