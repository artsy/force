/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const cheerio = require("cheerio")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const PartnerShow = require("../../../models/partner_show")
const Profile = require("../../../models/profile")
const AdditionalImage = require("../../../models/additional_image")
const Artwork = require("../../../models/artwork")
const Artworks = require("../../../collections/artworks")

const render = templateName =>
  jade.compileFile(require.resolve(`../templates/${templateName}.jade`))

xdescribe("metadata", () =>
  describe("events", function () {
    describe("with multiple events", () =>
      it("renders correctly", function () {
        const { events } = fabricate("show")
        events.should.have.lengthOf(2)
        const show = new PartnerShow({ events })
        const html = render("metadata/events")({ show })
        html.should.containEql("js-open-show-events")
        return html.should.containEql("Multiple events for this show")
      }))

    describe("a single events, with a description", () =>
      it("renders correctly", function () {
        const { events } = fabricate("show")
        const show = new PartnerShow({
          events: [_.extend({}, events[0], { description: "Existy" })],
        })
        const html = render("metadata/events")({ show })
        html.should.containEql("js-open-show-events")
        html.should.not.containEql("Multiple events for this show")
        return html.should.containEql("Opening Reception")
      }))

    return describe("a single events, without a description", () =>
      it("renders correctly", function () {
        const { events } = fabricate("show")
        const show = new PartnerShow({
          events: [_.extend({}, events[0], { description: null })],
        })
        const html = render("metadata/events")({ show })
        html.should.not.containEql("js-open-show-events")
        html.should.not.containEql("Multiple events for this show")
        return html.should.containEql("Opening Reception")
      }))
  }))

xdescribe("Partner Show", function () {
  describe("an average show", function () {
    before(function () {
      this.show = new PartnerShow(fabricate("show"))
      this.html = render("index")({
        sd: {},
        asset() {},
        show: this.show,
        location: this.show.location(),
        artworks: this.show.related().artworks,
        fair: this.show.related().fair,
        partner: this.show.related().partner,
        profile: this.show.related().profile,
        installShots: this.show.related().installShots,
      })
      return (this.$ = cheerio.load(this.html))
    })

    it("renders a show title", function () {
      return this.$(".show-title").text().should.equal(this.show.title())
    })

    it("renders show details", function () {
      this.$(".show-partner")
        .text()
        .should.containEql(this.show.related().partner.get("name"))
      this.$(".show-location")
        .text()
        .should.containEql(this.show.location().singleLine())
      return this.$(".show-dates")
        .text()
        .should.containEql(this.show.runningDates())
    })

    it("renders social sharing links", function () {
      this.$(".show-share").should.have.lengthOf(1)
      this.$(".show-share .share-to-facebook").should.have.lengthOf(1)
      return this.$(".show-share .share-to-twitter").should.have.lengthOf(1)
    })

    it("renders a container for artwork columns", function () {
      return this.$(".show-artworks-columns").should.have.lengthOf(1)
    })

    return it("does not render a press release", function () {
      return this.$(".show-press-release").should.have.lengthOf(0)
    })
  })

  describe("a show that is in an unfeatured fair", function () {
    before(function () {
      this.show = new PartnerShow(fabricate("show"))
      const fair = this.show.related().fair.set("has_full_feature", false)
      this.html = render("index")({
        sd: {},
        asset() {},
        show: this.show,
        location: this.show.location(),
        artworks: this.show.related().artworks,
        fair,
        partner: this.show.related().partner,
        profile: this.show.related().profile,
        installShots: this.show.related().installShots,
      })
      return (this.$ = cheerio.load(this.html))
    })

    return it("does not render a link for the fair", function () {
      return this.$(".show-fair-link").should.have.lengthOf(0)
    })
  })

  describe("with 1 installation shot", function () {
    before(function () {
      this.show = new PartnerShow(fabricate("show"))
      this.show.related().installShots.reset([fabricate("show_install_shot")])
      this.html = render("index")({
        sd: {},
        asset() {},
        show: this.show,
        location: this.show.location(),
        artworks: this.show.related().artworks,
        fair: this.show.related().fair,
        partner: this.show.related().partner,
        profile: this.show.related().profile,
        installShots: this.show.related().installShots,
      })
      return (this.$ = cheerio.load(this.html))
    })

    return it("does not render the carousel", function () {
      return this.$(".show-installation-shot-carousel").should.have.lengthOf(0)
    })
  })

  describe("with 3 or more installation shots", function () {
    before(function () {
      this.show = new PartnerShow(fabricate("show"))
      this.show
        .related()
        .installShots.reset(_.times(3, () => fabricate("show_install_shot")))
      this.html = render("index")({
        sd: {},
        asset() {},
        show: this.show,
        location: this.show.location(),
        artworks: this.show.related().artworks,
        fair: this.show.related().fair,
        partner: this.show.related().partner,
        profile: this.show.related().profile,
        installShots: this.show.related().installShots,
      })
      return (this.$ = cheerio.load(this.html))
    })

    return it("renders installation shots", function () {
      this.$(".show-installation-shot-carousel").should.have.lengthOf(1)
      return this.$(".mgr-cell").should.have.lengthOf(3)
    })
  })

  return describe("with a press release", function () {
    before(function () {
      this.show = new PartnerShow(
        fabricate("show", { press_release: "*Existy*" })
      )
      this.html = render("index")({
        sd: {},
        asset() {},
        show: this.show,
        location: this.show.location(),
        artworks: this.show.related().artworks,
        fair: this.show.related().fair,
        partner: this.show.related().partner,
        profile: this.show.related().profile,
        installShots: this.show.related().installShots,
      })
      return (this.$ = cheerio.load(this.html))
    })

    return it("renders the press release", function () {
      this.$(".show-press-release").should.have.lengthOf(1)
      return this.$(".show-press-release")
        .html()
        .should.containEql("<p><em>Existy</em></p>")
    })
  })
})
