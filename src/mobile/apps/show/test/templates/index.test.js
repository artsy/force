/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Show = require("../../../../models/show.coffee")
const Location = require("../../../../models/location.coffee")
const FairLocation = require("../../../../models/fair_location.coffee")
const Artworks = require("../../../../collections/artworks.coffee")
const Fair = require("../../../../models/fair.coffee")
const InstallShots = require("../../../../collections/install_shots.coffee")
const cheerio = require("cheerio")

const render = function (templateName) {
  const filename = path.resolve(
    __dirname,
    `../../templates/${templateName}.jade`
  )
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("header", function () {
  describe("fair booth with install shots", function () {
    before(function () {
      this.show = new Show(fabricate("show", { fair: fabricate("fair") }))
      return (this.template = render("index")({
        show: this.show,
        fair: new Fair(
          fabricate("fair", {
            name: "Foo Bar Fair",
            published: true,
            has_full_feature: true,
          })
        ),
        location: new FairLocation(fabricate("location")),
        installShots: new InstallShots([fabricate("show_install_shot")]),
        artworks: new Artworks([
          fabricate("artwork", { partner: fabricate("partner") }),
        ]),
        sd: {},
      }))
    })

    it("displays information for fair booth", function () {
      const $ = cheerio.load(this.template)
      $(".show-page-title").html().should.containEql("Gagosian Gallery")
      $(".show-page-title").html().should.containEql("Foo Bar Fair")
      return $(".show-page-location-address")
        .html()
        .should.containEql("Foo Bar Fair")
    })

    it("does not display installshots on fair booth", function () {
      const $ = cheerio.load(this.template)
      return $.html().should.not.containEql("show-installation-shot-carousel")
    })

    return it("links to the fair if possible", function () {
      const $ = cheerio.load(this.template)
      return $(".show-page-location-map")
        .html()
        .should.containEql('a href="/the-armory-show"')
    })
  })

  return describe("gallery show with install shots", function () {
    before(function () {
      this.show = new Show(fabricate("show", { name: "Test Gallery Show" }))
      return (this.template = render("index")({
        show: this.show,
        fair: [],
        location: new FairLocation(fabricate("location")),
        installShots: new InstallShots([fabricate("show_install_shot")]),
        artworks: new Artworks([
          fabricate("artwork", { partner: fabricate("partner") }),
        ]),
        sd: {},
      }))
    })

    it("displays information for gallery show", function () {
      const $ = cheerio.load(this.template)
      $(".show-page-title").html().should.containEql("Test Gallery Show")
      return $(".show-page-location-address")
        .text()
        .should.containEql("529 W 20th St.")
    })

    it("formats the running dates correctly", function () {
      const $ = cheerio.load(this.template)
      return $(".show-page-running-dates")
        .text()
        .should.containEql("Jul 12th – Aug 23rd, 2013")
    })

    it("displays the install shots carousel", function () {
      const $ = cheerio.load(this.template)
      return $.html().should.containEql("show-installation-shot-carousel")
    })

    it("displays the correct number of install shots", function () {
      const $ = cheerio.load(this.template)
      return $("#carousel-track").children().length.should.equal(1)
    })

    return it("displays the correct google maps link", function () {
      const $ = cheerio.load(this.template)
      return $(".show-page-location-map")
        .html()
        .should.containEql("q=529%20W%2020th%20St.%2C%20New%20York")
    })
  })
})

describe("artworks", function () {
  describe("show with less than 8 artworks", function () {
    before(function () {
      this.show = new Show(fabricate("show", { fair: fabricate("fair") }))
      return (this.template = render("index")({
        show: this.show,
        fair: new Fair(fabricate("fair", { name: "Foo Bar Fair" })),
        location: new FairLocation(fabricate("location")),
        installShots: new InstallShots([fabricate("show_install_shot")]),
        artworks: new Artworks([
          fabricate("artwork", { partner: fabricate("partner") }),
        ]),
        sd: {},
      }))
    })

    return it("should not have an artwork slider", function () {
      const $ = cheerio.load(this.template)
      return $.html().should.not.containEql("show-page-artworks-slider")
    })
  })

  return describe("show with more than 8 artworks", function () {
    before(function () {
      this.show = new Show(fabricate("show", { fair: fabricate("fair") }))
      return (this.template = render("index")({
        show: this.show,
        fair: new Fair(fabricate("fair", { name: "Foo Bar Fair" })),
        location: new FairLocation(fabricate("location")),
        installShots: new InstallShots([fabricate("show_install_shot")]),
        artworks: new Artworks([
          fabricate("artwork", { id: 1 }),
          fabricate("artwork", { id: 2 }),
          fabricate("artwork", { id: 3 }),
          fabricate("artwork", { id: 4 }),
          fabricate("artwork", { id: 5 }),
          fabricate("artwork", { id: 6 }),
          fabricate("artwork", { id: 7 }),
          fabricate("artwork", { id: 8 }),
          fabricate("artwork", { id: 9 }),
        ]),
        sd: {},
      }))
    })

    xit("should have an artwork slider", function () {
      const $ = cheerio.load(this.template)
      return $.html().should.containEql("show-page-artworks-slider")
    })

    return it("displays the correct number of artworks", function () {
      const $ = cheerio.load(this.template)
      return $(".show-page-artworks-title").html().should.containEql("9 Works")
    })
  })
})

describe("index", () =>
  describe("show with events, press release and associated artist", function () {
    before(function () {
      this.show = new Show(
        fabricate("show", {
          press_release: "The gallery is proud to present Inez and Vinoodh.",
        })
      )
      this.show.related().artists.set([fabricate("artist")])
      return (this.template = render("index")({
        show: this.show,
        fair: new Fair(fabricate("fair", { name: "Foo Bar Fair" })),
        location: new FairLocation(fabricate("location")),
        installShots: new InstallShots([fabricate("show_install_shot")]),
        artworks: new Artworks([
          fabricate("artwork", { partner: fabricate("partner") }),
        ]),
        sd: {},
      }))
    })

    it("displays events if they are present", function () {
      const $ = cheerio.load(this.template)
      return $(".show-page-event")
        .first()
        .text()
        .should.containEql(
          "Opening Reception: Inez and Vinoodh Opening, Jan 7th, 8 – 9pm"
        )
    })

    it("renders the correct information from the press release", function () {
      const $ = cheerio.load(this.template)
      return $(".show-page-press-release-content")
        .text()
        .should.containEql("The gallery is proud to present Inez and Vinoodh.")
    })

    return it("renders the artists with follow buttons", function () {
      const $ = cheerio.load(this.template)
      return $("#show-follow-artists").html().should.containEql("Pablo Picasso")
    })
  }))

describe("index", () =>
  describe("show with no events, no press release and no associated artists", function () {
    before(function () {
      this.show = new Show(fabricate("show", { events: [] }))
      return (this.template = render("index")({
        show: this.show,
        fair: new Fair(fabricate("fair", { name: "Foo Bar Fair" })),
        location: new FairLocation(fabricate("location")),
        installShots: new InstallShots([fabricate("show_install_shot")]),
        artworks: new Artworks([
          fabricate("artwork", { partner: fabricate("partner") }),
        ]),
        sd: {},
      }))
    })

    it("should not render the events container", function () {
      const $ = cheerio.load(this.template)
      return $.html().should.not.containEql(".show-page-event")
    })

    it("should not load the press release container", function () {
      const $ = cheerio.load(this.template)
      return $.html().should.not.containEql(".show-page-press-release-content")
    })

    return it("should not load the artist follow buttons", function () {
      const $ = cheerio.load(this.template)
      return $.html().should.not.containEql("#show-follow-artists")
    })
  }))
