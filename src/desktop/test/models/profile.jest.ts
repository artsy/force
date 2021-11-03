import { fabricate } from "@artsy/antigravity"
import Backbone from "backbone"
const { Profile } = require("../../models/profile")
import sinon from "sinon"

describe("Profile", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    sinon.stub(Backbone, "sync")
    testContext.profile = new Profile(
      fabricate("partner_profile", {
        icon: {
          id: "51eefb79275b2420810001fe",
          image_filename: "GGLogo1.jpg",
          image_url:
            "http://static2.artsy.net/profile_icons/51eefb79275b2420810001fe/:version.jpg",
          image_versions: ["square140"],
          width: 140,
          x: 0,
          y: 0,
        },
        owner: {
          default_profile_id: "getty",
          name: "J. Paul Getty Museum",
          sortable_id: "getty-museum",
          type: "Institution",
        },
        owner_type: "PartnerInstitution",
      })
    )
  })

  afterEach(() => Backbone.sync.restore())

  describe("#isUserClass", () => {
    it("returns is-user if the profile is a user and is set to use a circular default icon", () => {
      testContext.profile.isUserClass().should.equal("is-partner")
      testContext.profile.set({ owner_type: "User" })
      testContext.profile.set({ default_icon_version: "circle" })
      testContext.profile.isUserClass().should.equal("is-user")
    })
  })

  describe("#iconImageUrl", () => {
    it("returns the icon url for the model's default icon version", () => {
      testContext.profile.iconImageUrl().should.containEql("square")
    })
  })

  describe("#hasIconImage", () => {
    it("returns true if profile has an icon", () => {
      testContext.profile.hasIconImage().should.be.ok()
    })

    it("returns false if profile has no valid icon", () => {
      testContext.profile.set("icon", null)
      testContext.profile.hasIconImage().should.not.be.ok()
    })

    it("returns false if profile has no valid icon", () => {
      testContext.profile.set("icon", { id: "51eefb79275b2420810001fe" })
      testContext.profile.hasIconImage().should.not.be.ok()
    })
  })

  describe("#bestAvailableImage", () => {
    it("returns the icon image url if there is no cover", () => {
      testContext.profile.unset("cover_image")
      testContext.profile.bestAvailableImage().should.containEql("square")
    })

    it("returns the cover image url for medium250x165 if it exists", () => {
      testContext.profile.set({
        cover_image: {
          image_url:
            "http://static2.artsy.net/profile_icons/51eefb79275b2420810001fe/:version.jpg",
          image_versions: ["medium250x165"],
        },
      })
      testContext.profile
        .bestAvailableImage()
        .should.containEql("medium250x165")
    })
  })

  describe("#alphaSortKey", () => {
    it("returns the profile owner's display name", () => {
      testContext.profile
        .alphaSortKey()
        .should.equal(testContext.profile.displayName())
    })
  })

  describe("#href", () => {
    it("returns the client link to this profile", () => {
      testContext.profile
        .href()
        .should.containEql(`/${testContext.profile.get("id")}`)
    })
  })

  describe("#displayName", () => {
    it("returns the profile owner's display name", () => {
      testContext.profile
        .displayName()
        .should.equal(testContext.profile.related().owner.get("name"))
    })
  })

  describe("#isFairOrOrganizer", () => {
    it("returns true if the profile belongs to either a Fair or a Fair Organizer", () => {
      testContext.profile.set("owner_type", "Fair")
      testContext.profile.isFairOrOrganizer().should.be.true()
      testContext.profile.set("owner_type", "FairOrganizer")
      testContext.profile.isFairOrOrganizer().should.be.true()
      testContext.profile.set("owner_type", "User")
      testContext.profile.isFairOrOrganizer().should.be.false()
    })
  })

  describe("#isPartner", () => {
    it("returns true if the profile does not belong to a User or Admin", () => {
      testContext.profile.set("owner_type", "PartnerGallery")
      testContext.profile.isPartner().should.be.true()
      testContext.profile.set("owner_type", "Admin")
      testContext.profile.isPartner().should.be.false()
      testContext.profile.set("owner_type", "User")
      testContext.profile.isPartner().should.be.false()
    })
  })

  describe("#defaultIconInitials", () => {
    it("returns up to two initials for a partner name", () => {
      testContext.profile.defaultIconInitials().should.equal("JP")

      testContext.profile.related().owner.set("name", "Whitney")
      testContext.profile.defaultIconInitials().should.equal("W")

      testContext.profile
        .related()
        .owner.set("name", "John Jacob Jingle Heimer Schmidt")
      testContext.profile.defaultIconInitials().should.equal("JJ")
    })

    it("does not include non-word characters", () => {
      testContext.profile.related().owner.set("name", "Chime & Read")
      testContext.profile.defaultIconInitials().should.equal("CR")

      testContext.profile.related().owner.set("name", "2 % Johan _ Gregor 37")
      testContext.profile.defaultIconInitials().should.equal("2J")
    })
  })

  describe("related owner", () => {
    it("creates PartnerGallery", () => {
      testContext.profile.set("owner_type", "PartnerGallery")
      testContext.profile
        .related()
        .owner.constructor.name.should.equal("Partner")
    })
    it("creates PartnerInstitution", () => {
      testContext.profile.set("owner_type", "PartnerInstitution")
      testContext.profile
        .related()
        .owner.constructor.name.should.equal("Partner")
    })
    it("creates User", () => {
      testContext.profile.set("owner_type", "User")
      testContext.profile.related().owner.constructor.name.should.equal("User")
    })
    it("creates Fair", () => {
      testContext.profile.set("owner_type", "Fair")
      testContext.profile.related().owner.constructor.name.should.equal("Fair")
    })
    it("creates FairOrganizer", () => {
      testContext.profile.set("owner_type", "FairOrganizer")
      testContext.profile
        .related()
        .owner.constructor.name.should.equal("FairOrganizer")
    })
  })

  describe("#formatFollowText", () => {
    it("returns formatted follows text", () => {
      testContext.profile.set({ follows_count: 1234567 })
      testContext.profile.formatFollowText().should.equal("1,234,567 Followers")
    })
  })

  describe("#getFormattedWebsite", () => {
    it("formats website", () => {
      testContext.profile.set({ website: "https://artsy.net" })
      testContext.profile.getFormattedWebsite().should.equal("artsy.net")
    })
  })

  describe("#metaTitle", () => {
    it("correctly formats title for users", () => {
      testContext.profile.set({ owner_type: "User" })
      testContext.profile
        .metaTitle()
        .should.equal("J. Paul Getty Museum | Artsy")
    })

    it("correctly formats title for galleries", () => {
      testContext.profile.set({ owner_type: "PartnerGallery" })
      testContext.profile
        .metaTitle()
        .should.equal(
          "J. Paul Getty Museum | Artists, Art for Sale, and Contact Info | Artsy"
        )
      testContext.profile
        .metaTitle("overview")
        .should.equal(
          "J. Paul Getty Museum | Artists, Art for Sale, and Contact Info | Artsy"
        )
      testContext.profile
        .metaTitle("contact")
        .should.equal("J. Paul Getty Museum | Contact Information | Artsy")
      testContext.profile
        .metaTitle("about")
        .should.equal("J. Paul Getty Museum | Visitor Information | Artsy")
      testContext.profile
        .metaTitle("collection")
        .should.equal("J. Paul Getty Museum | Collection | Artsy")
      testContext.profile
        .metaTitle("shop")
        .should.equal("J. Paul Getty Museum | Shop | Artsy")
      testContext.profile
        .metaTitle("shows")
        .should.equal("J. Paul Getty Museum | Shows | Artsy")
      testContext.profile
        .metaTitle("artists")
        .should.equal("J. Paul Getty Museum | Artists | Artsy")
      testContext.profile
        .metaTitle("artist")
        .should.equal(
          "J. Paul Getty Museum | Artists, Art for Sale, and Contact Info | Artsy"
        )
      testContext.profile
        .metaTitle("posts")
        .should.equal("J. Paul Getty Museum | Posts | Artsy")
    })

    it("correctly formats title for non-gallery partners", () => {
      testContext.profile.set({ owner_type: "PartnerInstitution" })
      testContext.profile
        .metaTitle()
        .should.equal(
          "J. Paul Getty Museum | Artists, Artworks, and Contact Info | Artsy"
        )
    })

    it("correctly formats title for fairs", () => {
      testContext.profile.set({ owner_type: "FairOrganizer" })
      testContext.profile
        .metaTitle()
        .should.equal(
          "J. Paul Getty Museum | Fair Info, Artists, and Art for Sale | Artsy"
        )
      testContext.profile
        .metaTitle("info")
        .should.equal("J. Paul Getty Museum | Visitor Information | Artsy")
      testContext.profile
        .metaTitle("posts")
        .should.equal("J. Paul Getty Museum | Highlighted Articles | Artsy")
      testContext.profile
        .metaTitle("forYou")
        .should.equal("J. Paul Getty Museum | Your Personal Fair Guide | Artsy")
      testContext.profile
        .metaTitle("search")
        .should.equal("J. Paul Getty Museum | Search | Artsy")
      testContext.profile
        .metaTitle("browse")
        .should.equal("J. Paul Getty Museum | Browse | Artsy")
      testContext.profile
        .metaTitle("favorites")
        .should.equal("J. Paul Getty Museum | Favorites | Artsy")
      testContext.profile
        .metaTitle("follows")
        .should.equal("J. Paul Getty Museum | Following | Artsy")
    })
  })

  describe("#metaDescription", () => {
    it("correctly formats description", () => {
      testContext.profile.set("bio", "bio")
      testContext.profile.metaDescription().should.equal("bio")

      testContext.profile.set("bio", undefined)
      testContext.profile
        .metaDescription()
        .should.equal("J. Paul Getty Museum on Artsy")
    })

    it("correctly formats title for galleries", () => {
      testContext.profile.set({ owner_type: "PartnerGallery" })
      testContext.profile
        .metaDescription()
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      testContext.profile
        .metaDescription("overview")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      testContext.profile
        .metaDescription("contact")
        .should.equal(
          "Contact information including a map of locations with phone numbers for J. Paul Getty Museum"
        )
      testContext.profile
        .metaDescription("about")
        .should.equal(
          "Visitor information including location and phone number for J. Paul Getty Museum"
        )
      testContext.profile
        .metaDescription("collection")
        .should.equal("Artworks in the collection of J. Paul Getty Museum")
      testContext.profile
        .metaDescription("shop")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      testContext.profile
        .metaDescription("shows")
        .should.equal(
          "List of current, upcoming and past shows at J. Paul Getty Museum"
        )
      testContext.profile
        .metaDescription("artists")
        .should.equal("List of artists represented by J. Paul Getty Museum")
      testContext.profile
        .metaDescription("artist")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      testContext.profile
        .metaDescription("posts")
        .should.equal("Articles about and created by J. Paul Getty Museum")
    })

    it("correctly formats title for fairs", () => {
      testContext.profile.set({ owner_type: "FairOrganizer" })
      testContext.profile
        .metaDescription()
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      testContext.profile
        .metaDescription("info")
        .should.equal(
          "Visitor information including location, tickets and phone number for the fair"
        )
      testContext.profile
        .metaDescription("posts")
        .should.equal("Featured articles about the fair")
      testContext.profile
        .metaDescription("forYou")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      testContext.profile
        .metaDescription("search")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      testContext.profile
        .metaDescription("browse")
        .should.equal(
          "Browse artworks at the fair by subject matter, style/technique, movement, price, and booth"
        )
      testContext.profile
        .metaDescription("favorites")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
      testContext.profile
        .metaDescription("follows")
        .should.equal(
          "The J. Paul Getty Trust is a cultural and philanthropic institution dedicated to critical thinking in the presentation, conservation, and interpretation of the world's artistic legacy."
        )
    })
  })

  describe("#fetchFavorites", () => {
    it("fetches the saved-artwork collection based on the owner", () => {
      testContext.profile.related().owner.set("id", "foobar")
      testContext.profile.fetchFavorites({})
      Backbone.sync.args[0][1].url.should.containEql("saved-artwork/artworks")
    })

    it("returns feed items with a set url", done => {
      testContext.profile.related().owner.set("id", "foobar")
      testContext.profile.fetchFavorites({
        success(items) {
          items.url.should.containEql("saved-artwork/artworks")
          done()
        },
      })
      Backbone.sync.args[0][2].success([{ id: "bar" }])
    })
  })
})
