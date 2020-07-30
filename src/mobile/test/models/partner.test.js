/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__, or convert again using --optional-chaining
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const urlParser = require("url")
const sinon = require("sinon")
const Backbone = require("backbone")
const Partner = require("../../models/partner")
const PartnerLocations = require("../../collections/partner_locations")
const Artist = require("../../models/artist")
const { fabricate } = require("@artsy/antigravity")

describe("Partner", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.partner = new Partner(fabricate("partner"))
    return this.partner.set("email", "info@gagosian.com")
  })

  afterEach(() => Backbone.sync.restore())

  describe("#fetchLocations", () =>
    it("fetches locations", function () {
      this.partner.set({ id: "moobar" }).fetchLocations()
      return Backbone.sync.args[0][1]
        .url()
        .should.containEql("partner/moobar/locations")
    }))

  describe("#fetchArtistGroups", function () {
    it("fetches the partners artists and groups them in represented/unreped, taking image info from the partner artist relation", function (done) {
      this.partner.fetchArtistGroups({
        success(represented, unrepresented) {
          represented.length.should.equal(2)
          unrepresented.length.should.equal(1)
          unrepresented.models[0].get("image_versions")[0].should.equal("tiny")
          unrepresented.models[0].get("image_url").should.equal("bitty.jpg")
          return done()
        },
      })
      Backbone.sync.args[0][2].success([
        { artist: fabricate("artist"), represented_by: true },
        { artist: fabricate("artist"), represented_by: true },
        {
          artist: fabricate("artist"),
          represented_by: false,
          image_versions: ["tiny"],
          image_url: "bitty.jpg",
          published_artworks_count: 0,
        },
        {
          artist: fabricate("artist"),
          represented_by: false,
          image_versions: ["tiny"],
          image_url: "bitty.jpg",
          published_artworks_count: 1,
        },
      ])
      return Backbone.sync.args[0][2].success([])
    })

    it("only returns unrepresented artists with published works", function (done) {
      this.partner.fetchArtistGroups({
        success(represented, unrepresented) {
          unrepresented.length.should.equal(1)
          unrepresented.models[0]
            .get("name")
            .should.equal("artist with published works")
          unrepresented
            .where({ name: "artist without published works" })
            .should.have.lengthOf(0)
          return done()
        },
      })
      Backbone.sync.args[0][2].success([
        { artist: fabricate("artist"), represented_by: true },
        {
          artist: fabricate("artist", { name: "artist with published works" }),
          published_artworks_count: 2,
          represented_by: false,
        },
        {
          artist: fabricate("artist", {
            name: "artist without published works",
          }),
          published_artworks_count: 0,
          represented_by: false,
        },
      ])
      return Backbone.sync.args[0][2].success([])
    })

    return it("requests partner artists that have not been explicity hidden from the profile", function () {
      this.partner.fetchArtistGroups({
        success(represented, unrepresented) {
          return done()
        },
      })
      return Backbone.sync.args[0][2].data.display_on_partner_profile.should.equal(
        1
      )
    })
  })

  describe("#fetchFeaturedShow", () =>
    it("fetches the partners shows and returns one that is featured", function (done) {
      this.partner.fetchFeaturedShow({
        success(show) {
          show.get("id").should.equal("bitty")
          return done()
        },
      })
      const featuredShow = fabricate("show", { id: "bitty", featured: true })
      const unfeaturedShow = fabricate("show", {
        id: "some-other-cat",
        featured: false,
      })
      Backbone.sync.args[0][2].success([featuredShow, unfeaturedShow])
      return Backbone.sync.args[0][2].success([])
    }))

  describe("#setEmailFromLocations", function () {
    beforeEach(function () {
      return (this.partnerLocations = new PartnerLocations([
        fabricate("partner_location"),
      ]))
    })

    it("does nothing if the partner has an email address set already", function () {
      const email = this.partner.get("email")
      this.partner.setEmailFromLocations(this.partnerLocations)
      return this.partner.get("email").should.equal(email)
    })

    return it("sets the first locations email address to a partner", function () {
      this.partner.set("email", "")
      this.partner.setEmailFromLocations(this.partnerLocations)
      return this.partner
        .get("email")
        .should.equal(this.partnerLocations.first().get("email"))
    })
  })

  describe("#getMailTo", function () {
    beforeEach(function () {
      return (this.mailto = urlParser.parse(this.partner.getMailTo()))
    })

    it("returns an email link", function () {
      return this.mailto.href.should.containEql("mailto:")
    })

    it("ignores a emails for non gallery partners", function () {
      this.partner.set("type", "Institution")
      return this.partner.getMailTo().should.equal("")
    })

    it("includes artsy in the CC field", function () {
      return this.mailto.query.should.containEql("cc=inquiries@artsy.net")
    })

    return it("populates the subject field", function () {
      this.mailto.query.should.containEql("subject=")
      return this.mailto.query.should.containEql(
        encodeURIComponent(
          `Connecting with ${this.partner.get("name")} via Artsy`
        )
      )
    })
  })

  describe("#getSimpleWebsite", () =>
    it('removes "http://" and trailing slashes', function () {
      this.partner.set("website", "http://www.lacma.org/")
      return this.partner.getSimpleWebsite().should === "www.lacma.org"
    }))

  return describe("#artistFromPartnerArtist", function () {
    it("creates an artist model from the partner artist relationship, copying over the image info", function () {
      const partnerArtist = new Backbone.Model({
        artist: fabricate("artist", { name: "Bitty" }),
        represented_by: false,
        image_versions: ["tiny"],
        image_url: "bitty.jpg",
      })
      const artist = this.partner.artistFromPartnerArtist(partnerArtist)
      artist.get("name").should.equal("Bitty")
      artist.get("image_versions").length.should.equal(1)
      artist.get("image_versions")[0].should.equal("tiny")
      return artist.get("image_url").should.equal("bitty.jpg")
    })

    return it("doesnt copy over image info when not included in the partner artist", function () {
      const partnerArtist = new Backbone.Model({
        artist: fabricate("artist", { name: "Bitty" }),
        represented_by: false,
        image_versions: null,
        image_url: "bitty.jpg",
      })
      const artist = this.partner.artistFromPartnerArtist(partnerArtist)
      artist.get("name").should.equal("Bitty")
      __guard__(artist.get("image_versions"), x => x.should.not.be.ok())
      return artist.get("image_url").should.not.equal("bitty.jpg")
    })
  })
})

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}
