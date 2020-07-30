/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const cheerio = require("cheerio")
const Backbone = require("backbone")
const Profile = require("../../../models/profile")
const Partner = require("../../../models/partner")
const { fabricate } = require("@artsy/antigravity")
const Artists = require("../../../collections/artists")
const fixtures = require("../../../test/helpers/fixtures")
const {
  GALLERY_DEFAULT,
  GALLERY_ONE,
  ACTIVE_PARTNER_LAYOUTS,
} = require("../../../models/partner")

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Partner page templates", function () {
  it("doesnt show represented if they dont exist", () =>
    render("artists")({
      profile: new Profile(fabricate("profile")),
      represented: [],
      unrepresented: new Artists([fabricate("artist")]).models,
      sd: {},
      partner: new Partner(fabricate("partner")),
    }).should.not.containEql("Represented Artists"))

  it("changes copy for gagosian", function () {
    const html = render("artists")({
      profile: new Profile(fabricate("profile", { id: "gagosian-gallery" })),
      represented: new Artists([fabricate("artist")]).models,
      unrepresented: new Artists([fabricate("artist")]).models,
      sd: {},
      partner: new Partner(fabricate("partner")),
    })
    html.should.not.containEql("Works Available By")
    return html.should.containEql("Artists")
  })

  it("renders single list when distinguish_represented_artists is false", function () {
    const html = render("artists")({
      profile: new Profile(fabricate("profile")),
      represented: new Artists([fabricate("artist")]).models,
      unrepresented: new Artists([fabricate("artist")]).models,
      partner: new Partner({ distinguish_represented_artists: false }),
      sd: {},
    })
    html.should.not.containEql("Works Available By")
    return html.should.containEql("Artists")
  })

  it("renders a follow button", function () {
    const profile = new Profile(
      fabricate("profile", { id: "gagosian-gallery", icon: null })
    )
    const html = render("index")({
      partner: new Partner(profile.get("owner")),
      profile,
      articles: [],
      ACTIVE_PARTNER_LAYOUTS,
      sd: {
        PARTNER_PROFILE: profile,
      },
    })
    const $ = cheerio.load(html)
    return $(".follow-button").should.have.lengthOf(1)
  })

  it("works for partners without icons", function () {
    let html
    const profile = new Profile(
      fabricate("profile", { id: "gagosian-gallery", icon: null })
    )
    return (html = render("index")({
      profile,
      partner: new Partner(profile.get("owner")),
      articles: [],
      represented: new Artists([fabricate("artist")]).models,
      unrepresented: new Artists([fabricate("artist")]).models,
      ACTIVE_PARTNER_LAYOUTS,
      sd: {},
    }))
  })

  it("creates links to profile slugs, not partner slugs", function () {
    const partner = new Partner(
      fabricate("partner", {
        id: "the-gagosian-gallery",
        profile_layout: GALLERY_ONE,
      })
    )
    const profile = new Profile(
      fabricate("profile", { id: "gagosian-gallery", icon: null })
    )
    const html = render("index")({
      partner,
      profile,
      articles: [],
      represented: new Artists([fabricate("artist")]).models,
      unrepresented: new Artists([fabricate("artist")]).models,
      ACTIVE_PARTNER_LAYOUTS,
      sd: {},
    })
    const $ = cheerio.load(html)
    $(`a[href*='${partner.get("id")}']`).length.should.equal(0)
    return $(`a[href*='${profile.get("id")}']`).length.should.be.above(0)
  })

  it("does not create links to profiles for non-active partners", function () {
    const partner = new Partner(
      fabricate("partner", {
        id: "the-gagosian-gallery",
        profile_layout: GALLERY_DEFAULT,
      })
    )
    const profile = new Profile(
      fabricate("profile", { id: "gagosian-gallery", icon: null })
    )
    const html = render("index")({
      partner,
      profile,
      articles: [],
      represented: new Artists([fabricate("artist")]).models,
      unrepresented: new Artists([fabricate("artist")]).models,
      ACTIVE_PARTNER_LAYOUTS,
      sd: {},
    })
    const $ = cheerio.load(html)
    return $(`a[href*='${profile.get("id")}']`).length.should.equal(0)
  })

  it("hides missing telephone numbers", function () {
    const loc = new Backbone.Model(fabricate("location", { phone: null }))
    loc.gmapImageUrl = function () {}
    const locationGroups = { Foo: [loc] }
    const profile = new Profile(
      fabricate("profile", { id: "gagosian-gallery", icon: null })
    )
    const html = render("contact")({
      locationGroups,
      profile,
      partner: new Partner(profile.get("owner")),
      sd: {},
    })
    return html.should.not.containEql("Tel:")
  })

  it("renders a link to the partners website", function () {
    const profile = new Profile(
      fabricate("profile", {
        id: "gagosian-gallery",
        icon: null,
        owner_type: "PartnerGallery",
      })
    )
    const partner = new Partner(
      fabricate("partner", { website: "http://www.gagosian.com" })
    )
    const html = render("contact")({
      locationGroups: {},
      profile,
      partner,
      sd: {},
    })
    const $ = cheerio.load(html)
    $(`a[href='${partner.get("website")}']`).length.should.be.above(0)
    return (
      $(`a[href='${partner.get("website")}']`).text().should ===
      partner.getSimpleWebsite()
    )
  })

  it("hides articles link if no articles", function () {
    const profile = new Profile(
      fabricate("profile", { id: "gagosian-gallery", icon: null })
    )
    const html = render("index")({
      profile,
      partner: new Partner(profile.get("owner")),
      articles: [],
      represented: new Artists([fabricate("artist")]).models,
      unrepresented: new Artists([fabricate("artist")]).models,
      ACTIVE_PARTNER_LAYOUTS,
      sd: {},
    })
    const $ = cheerio.load(html)
    return $(".partner-profile-nav a[href*=articles]").length.should.equal(0)
  })

  it("shows articles link if has articles", function () {
    const profile = new Profile(
      fabricate("profile", { id: "gagosian-gallery", icon: null })
    )
    const html = render("index")({
      profile,
      partner: new Partner(profile.get("owner")),
      articles: [fixtures.article],
      represented: new Artists([fabricate("artist")]).models,
      unrepresented: new Artists([fabricate("artist")]).models,
      ACTIVE_PARTNER_LAYOUTS,
      sd: {},
    })
    const $ = cheerio.load(html)
    return $(".partner-profile-nav a[href*=articles]").length.should.be.above(0)
  })

  return it("renders the cover image", function () {
    const profile = new Profile(
      fabricate("profile", {
        id: "gagosian-gallery",
        cover_image: {
          image_versions: ["wide"],
          image_url: ":version-foobarbaz.jpg",
          image_urls: { wide: "foobarbaz.jpg" },
        },
      })
    )
    const html = render("index")({
      profile,
      partner: new Partner(profile.get("owner")),
      articles: [fixtures.article],
      represented: new Artists([fabricate("artist")]).models,
      unrepresented: new Artists([fabricate("artist")]).models,
      ACTIVE_PARTNER_LAYOUTS,
      sd: {},
    })
    return html.should.containEql("foobarbaz.jpg")
  })
})
