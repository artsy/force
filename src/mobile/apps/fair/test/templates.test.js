/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const cheerio = require("cheerio")
const Backbone = require("backbone")
const Shows = require("../../../collections/shows_feed")
const Fair = require("../../../models/fair")
const Profile = require("../../../models/profile")
const PartnerLocation = require("../../../models/partner_location")
const Artist = require("../../../models/artist")
const Article = require("../../../models/article")
const { fabricate } = require("@artsy/antigravity")
const SearchResult = require("../../../models/search_result")
const Artworks = require("../../../collections/artworks")

describe("Artworks template", function () {
  describe("with no params", function () {
    beforeEach(function () {
      const filename = path.resolve(__dirname, "../templates/artworks.jade")
      return (this.page = jade.compile(fs.readFileSync(filename), { filename })(
        {
          sd: {},
          fair: new Fair(fabricate("fair", { filter_genes: [] })),
          filters: new Backbone.Model({ medium: {}, related_genes: {} }),
        }
      ))
    })

    return it("renders correctly", function () {
      this.page.should.containEql(
        '<a href="/the-armory-show/browse/artworks?filter=true">All Works</a>'
      )
      this.page.should.containEql("fairs-artworks-categories")
      return this.page.should.not.containEql("fair-artworks-list")
    })
  })

  return describe("with params", function () {
    beforeEach(function () {
      const filename = path.resolve(__dirname, "../templates/artworks.jade")
      return (this.page = jade.compile(fs.readFileSync(filename), { filename })(
        {
          sd: { PARAMS: { filter: "true" } },
          fair: new Fair(fabricate("fair", { filter_genes: [] })),
          filters: new Backbone.Model({ medium: {}, related_genes: {} }),
        }
      ))
    })

    return it("renders correctly", function () {
      this.page.should.not.containEql(
        '<a href="/the-armory-show/browse/artworks?filter=true">All Works</a>'
      )
      return this.page.should.containEql("artwork-filter-content")
    })
  })
})

describe("Exhibitors template", function () {
  describe("A-Z link", function () {
    const render = function (options) {
      const defaults = {
        fair: new Fair(fabricate("fair")),
        shows: new Shows(fabricate("show", { fair_location: {} })),
        displayToggle: true,
        artworkColumnsTemplate() {},
        sd: {},
      }
      const params = _.extend(defaults, options)

      const filename = path.resolve(
        __dirname,
        "../templates/exhibitors_page.jade"
      )
      return jade.compile(fs.readFileSync(filename), { filename })(params)
    }

    return it("hides the A-Z link unless its all exhibitors", function () {
      render({ displayToggle: false }).should.not.containEql(
        "a-z-feed-toggle-container"
      )
      return render().should.containEql("a-z-feed-toggle-container")
    })
  })

  describe("less than 6 artworks", function () {
    before(function () {
      const render = function (templateName) {
        const filename = path.resolve(
          __dirname,
          "../templates/exhibitors_page.jade"
        )
        return jade.compile(fs.readFileSync(filename), { filename })
      }

      this.shows = new Shows([
        fabricate("show", {
          fair: fabricate("fair"),
          artwork: fabricate("artwork"),
        }),
      ])
      return (this.template = render("exhibitors")({
        shows: this.shows,
        fair: new Fair(fabricate("fair", { name: "Armory Show 2013" })),
        sd: {},
      }))
    })

    return it("should not display artwork slider", function () {
      const $ = cheerio.load(this.template)
      return $.html().should.not.containEql("fair-exhibit-artworks-slider")
    })
  })

  return describe("more than 6 artworks", function () {
    before(function () {
      const render = function (templateName) {
        const filename = path.resolve(
          __dirname,
          "../templates/exhibitors_page.jade"
        )
        return jade.compile(fs.readFileSync(filename), { filename })
      }

      const artworks = [
        fabricate("artwork", { id: 1 }),
        fabricate("artwork", { id: 2 }),
        fabricate("artwork", { id: 3 }),
        fabricate("artwork", { id: 4 }),
        fabricate("artwork", { id: 5 }),
        fabricate("artwork", { id: 6 }),
        fabricate("artwork", { id: 7 }),
      ]
      this.shows = new Shows([
        fabricate("show", { fair: fabricate("fair"), artworks }),
      ])
      return (this.template = render("exhibitors")({
        shows: this.shows,
        fair: new Fair(fabricate("fair", { name: "Armory Show 2013" })),
        sd: {},
      }))
    })

    return xit("should display artwork slider", function () {
      const $ = cheerio.load(this.template)
      return $.html().should.containEql("fair-exhibit-artworks-slider")
    })
  })
})

describe("Sections template", function () {
  const render = function (options) {
    const defaults = {
      fair: new Fair(fabricate("fair")),
      shows: new Shows(fabricate("show", { fair_location: {} })),
      displayToggle: true,
      artworkColumnsTemplate() {},
      sd: {},
      sections: new Backbone.Collection([
        { section: "", partner_shows_count: 10 },
        { section: "Pier 1", partner_shows_count: 2 },
      ]).models,
    }
    const params = _.extend(defaults, options)

    const filename = path.resolve(__dirname, "../templates/sections.jade")
    return jade.compile(fs.readFileSync(filename), { filename })(params)
  }

  return it("working links", () => render().should.not.containEql("null"))
})

describe("Main page template ", function () {
  beforeEach(function () {})

  const render = function (profile, fair) {
    const filename = path.resolve(__dirname, "../templates/main_page.jade")
    return jade.compile(fs.readFileSync(filename), { filename })({
      fair,
      profile,
      sd: {},
      sections: new Backbone.Collection([
        { section: "", partner_shows_count: 10 },
        { section: "Pier 1", partner_shows_count: 2 },
      ]).models,
    })
  }

  it("renders a profile icon", function () {
    const profile = new Profile(fabricate("profile"))
    const fair = new Fair(fabricate("fair"))

    render(profile, fair).should.containEql(profile.iconUrl())
    render(profile, fair).should.containEql("fair-page-profile-icon")
    profile.unset("icon")
    return render(profile, fair).should.not.containEql("fair-page-profile-icon")
  })

  return it("renders a banner when one is present", function () {
    const profile = new Profile(fabricate("profile"))
    const fair = new Fair(fabricate("fair"))

    fair.set("banner_image_urls", {
      "mobile-fair-cover": "http://placehold.it/350x150",
    })

    render(profile, fair).should.containEql("mobile-fair-cover")
    render(profile, fair).should.not.containEql("fair-page-profile-icon")

    fair.unset("banner_image_urls")

    render(profile, fair).should.not.containEql("mobile-fair-cover")
    return render(profile, fair).should.containEql("fair-page-profile-icon")
  })
})

describe("Info page template ", function () {
  const render = function (fair, location) {
    const filename = path.resolve(__dirname, "../templates/info.jade")
    return jade.compile(fs.readFileSync(filename), { filename })({
      fair,
      location,
      sd: {},
    })
  }

  it("does not render a map without coordinates", function () {
    const fair = new Fair(fabricate("fair"))
    this.html = render(fair, new PartnerLocation(fair.get("location")))
    return this.html.should.not.containEql("fair-page-info-map")
  })

  it("render a map with coordinates", function () {
    const fair = new Fair(fabricate("fair"))
    this.html = render(
      fair,
      new PartnerLocation(fair.get("location"), {
        coordinates: { lat: 1, lng: 2 },
      })
    )
    return this.html.should.not.containEql("fair-page-info-map")
  })

  return it("renders markdown converted content", function () {
    const fair = new Fair(fabricate("fair"))
    this.html = render(fair, new PartnerLocation(fair.get("location")))
    this.html.should.containEql(fair.mdToHtml("about"))
    return this.html.should.containEql("fair-page-info-content")
  })
})

describe("Search", function () {
  beforeEach(function () {
    this.results = [
      new SearchResult({
        model: "artist",
        id: "andy-warhol",
        display: "Andy Warhol",
        label: "Artist",
        score: "excellent",
        search_detail: "American, 1928-1987",
        published: true,
        highlights: [],
        image_url: "http://artsy.net/api/v1/artist/andy-warh",
        display_model: "Artist",
        location: "/artist/andy-warhol",
        is_human: true,
      }),
    ]
    this.fairResults = [
      new SearchResult({
        model: "partnershow",
        id: "oriol-galeria-dart-oriol-galeria-dart-at-the-armory-show-2013",
        display: "Oriol Galeria d'Art at The Armory Show 2013",
        label: "Partnershow",
        score: "excellent",
        search_detail: null,
        published: false,
        highlights: [],
        image_url: "http://artsy.net/api/v1/",
        display_model: "Booth",
        location:
          "/show/oriol-galeria-dart-oriol-galeria-dart-at-the-armory-show-2013",
        is_human: false,
      }),
    ]
    this.term = "bitty"
    this.fair = new Fair(
      fabricate("fair", { about: "about the fair", id: "cat" })
    )
    this.fairResults[0].updateForFair(this.fair)
    return (this.profile = new Profile(fabricate("profile", { id: "dog" })))
  })

  let render = function (locals) {
    const filename = path.resolve(__dirname, "../templates/search_results.jade")
    return jade.compile(fs.readFileSync(filename), { filename })(locals)
  }

  it("renders without errors", function () {
    const html = render({
      fair: this.fair,
      term: this.term,
      fairResults: this.fairResults,
      results: this.results,
      sd: {},
      profile: this.profile,
    })
    const $ = cheerio.load(html)
    $(".artsy-search-results .search-result").length.should.equal(1)
    $(".fair-search-results .search-result").html().should.containEql("Booth")
    return $(".fair-search-results .search-result").length.should.equal(1)
  })

  it("submits the form to the correct route", function () {
    const html = render({
      fair: this.fair,
      term: this.term,
      fairResults: this.fairResults,
      results: this.results,
      sd: {},
      profile: this.profile,
    })
    const $ = cheerio.load(html)
    return $("form").attr("action").should.equal("dog/search")
  }) // note this is the profile id

  xdescribe("For You template ", function () {})

  return describe("Artist template ", () =>
    it("protects against those crazy fair booths that exist in the aether", function () {
      // TODO: Consolidate these various render helpers
      const { profile } = this
      const { fairResults } = this
      const { results } = this

      render = function (params) {
        const filename = path.resolve(__dirname, "../templates/artist.jade")
        return jade.compile(fs.readFileSync(filename), { filename })(
          _.extend(
            {
              profile,
              artist: new Artist(fabricate("artist")),
              fairResults,
              results,
              fair: new Backbone.Model(fabricate("fair")),
              sd: {},
            },
            params
          )
        )
      }
      return render(
        {
          shows: new Shows([fabricate("show", { fair_location: null })]),
        },
        "artist"
      )
    }))
})

describe("article page template ", function () {
  beforeEach(function () {})

  const render = function (profile, fair) {
    const filename = path.resolve(__dirname, "../templates/article.jade")
    return jade.compile(fs.readFileSync(filename), { filename })({
      fair,
      profile,
      sd: {},
      article: new Article(fabricate("article")),
      resize() {},
    })
  }

  return it("renders the article body", function () {
    const profile = new Profile(fabricate("profile"))
    const fair = new Fair(fabricate("fair"))

    const articlePage = render(profile, fair)
    articlePage.should.containEql("On The Heels of A Stellar Year")
    return articlePage.should.containEql("Taipei Biennial")
  })
})
