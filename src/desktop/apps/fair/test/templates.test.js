/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const _s = require("underscore.string")
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const { AToZ } = require("artsy-backbone-mixins")
const { fabricate, fabricate2 } = require("@artsy/antigravity")
const Fair = require("../../../models/fair")
const Profile = require("../../../models/profile")
const CoverImage = require("../../../models/cover_image")
const SearchResult = require("../../../models/search_result")
const Artists = require("../../../collections/artists")
const Partners = require("../../../collections/partners")
const Item = require("../../../models/item")
const Items = require("../../../collections/items")
const OrderedSet = require("../../../models/ordered_set")
const OrderedSets = require("../../../collections/ordered_sets")
const FilterArtworks = require("../../../collections/filter_artworks.coffee")
const FeedItem = require("../../../components/feed/models/feed_item")
const cheerio = require("cheerio")
const sinon = require("sinon")
const sdData = require("sharify").data

const render = function (templateName) {
  const filename = path.resolve(__dirname, `../templates/${templateName}.jade`)
  const sd = _.extend(sdData, {
    APP_URL: "http://localhost:5000",
    API_URL: "http://localhost:5000",
    WEBFONT_URL: "http://webfonts.artsy.net/",
    NODE_ENV: "test",
  })
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("Fair", function () {
  describe("index page", function () {
    before(function (done) {
      const sd = _.extend(sdData, {
        APP_URL: "http://localhost:5000",
        CSS_EXT: ".css.gz",
        JS_EXT: ".js.gz",
        CURRENT_PATH: "/cool-fair",
        PROFILE: fabricate("fair_profile"),
        FAIR: fabricate("fair", { filter_genes: [] }),
        FACEBOOK_APP_NAMESPACE: "namespace",
        WEBFONT_URL: "http://webfonts.artsy.net/",
      })
      const fair = new Fair(sd.FAIR)
      const profile = new Profile(sd.PROFILE)
      const template = render("index")({
        sd,
        fair,
        profile,
        _s,
        asset() {},
      })
      this.$template = cheerio.load(template)
      return done()
    })

    return it("renders without errors", function () {
      this.$template.html().should.not.containEql("undefined")
      return this.$template.html().should.containEql("Back to Artsy.net")
    })
  })

  describe("search page", function () {
    before(function (done) {
      const sd = {
        CSS_EXT: ".css.gz",
        JS_EXT: ".js.gz",
        PROFILE: fabricate("fair_profile"),
        FAIR: fabricate("fair", { filter_genes: [] }),
        SECTION: "search",
        CURRENT_PATH: "/cool-fair",
      }
      const results = [
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
        }),
      ]
      const fairResults = [
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
          display_model: "Show",
          venue: "Armory Show 2013",
          fair_id: "the-armory-2013",
          city: "New York",
          start_at: new Date("5-5-2015").toISOString(),
          end_at: new Date("10-5-2015").toISOString(),
        }),
      ]
      const fair = new Fair(fabricate("fair", { about: "about the fair" }))
      const profile = new Profile(fabricate("fair_profile"))
      fairResults[0].updateForFair(fair)
      const template = render("index")({
        sd,
        _s,
        fair,
        profile,
        results,
        fairResults,
        crop: sinon.stub(),
        asset() {},
      })
      this.$template = cheerio.load(template)
      return done()
    })

    return it("renders without errors", function () {
      this.$template.html().should.containEql("Back to Artsy.net")
      this.$template
        .root()
        .find(".artsy-search-results .search-result")
        .length.should.equal(1)
      this.$template
        .root()
        .find(".fair-search-results .search-result")
        .html()
        .should.containEql("booth")
      return this.$template
        .root()
        .find(".fair-search-results .search-result")
        .length.should.equal(1)
    })
  })

  describe("overview", function () {
    let {
      fair,
      coverImage,
      profile,
      primarySets,
      nestedFilteredSearchColumns,
    } = {}

    before(function () {
      fair = new Fair(
        fabricate("fair", {
          about: "about the fair",
          tagline: "This is a custom tagline",
          filter_genes: _.times(2, () =>
            fabricate("gene", { id: _.uniqueId() })
          ),
        })
      )
      coverImage = new CoverImage({
        image_versions: ["wide"],
        image_url: "foo/wide.jpg",
      })
      profile = new Profile(fabricate("fair_profile"))
      primarySets = new OrderedSets()

      // Explore ordered set
      const editorial = new OrderedSet(
        fabricate("set", {
          key: "editorial",
          item_type: "FeaturedLink",
        })
      )
      const editorialItems = new Items(null, "editorial-foo")
      editorialItems.add(
        new Item(fabricate("featured_link", { title: "Chinese Art" }))
      )
      editorialItems.add(
        new Item(fabricate("featured_link", { title: "Moar Chinese Art" }))
      )
      editorial.set({ items: editorialItems })
      primarySets.add(editorial)

      // Explore ordered set
      const explore = new OrderedSet(
        fabricate("set", {
          key: "explore",
          item_type: "FeaturedLink",
        })
      )
      const exploreItems = new Items(null, "explore-foo")
      exploreItems.add(
        new Item(fabricate("featured_link", { title: "Explore Art" }))
      )
      exploreItems.add(
        new Item(fabricate("featured_link", { title: "Moar Explore Art" }))
      )
      explore.set({ items: exploreItems })
      primarySets.add(explore)

      // Primary ordered set
      const primary = new OrderedSet(
        fabricate("set", {
          key: "primary",
          item_type: "FeaturedLink",
        })
      )
      const primaryItems = new Items(null, "primary-foo")
      primaryItems.add(
        new Item(fabricate("featured_link", { title: "Primary Art" }))
      )
      primaryItems.add(
        new Item(fabricate("featured_link", { title: "Moar Primary Art" }))
      )
      primary.set({ items: primaryItems })
      primarySets.add(primary)

      // Curator ordered set
      const curator = new OrderedSet(
        fabricate("set", {
          key: "curator",
          item_type: "FeaturedLink",
        })
      )
      const curatorItems = new Items(null, "curator-foo")
      curatorItems.add(
        new Item(fabricate("featured_link", { title: "Curator Art" }))
      )
      curatorItems.add(
        new Item(fabricate("featured_link", { title: "Moar Curator Art" }))
      )
      curator.set({ items: curatorItems })
      primarySets.add(curator)

      const filteredSearchOptions = new Backbone.Model({
        related_gene: {
          "abstract-painting": 388,
          "art-since-2000": 1717,
          "black-and-white-photography": 99,
          "contemporary-color-fields": 38,
          "contemporary-conceptualism": 439,
          "contemporary-photography": 310,
          "contemporary-pop": 78,
          "pop-art": 55,
          "the-fantastic": 183,
          "women-artists": 600,
        },
      })

      const filteredSearchColumns = fair.filteredSearchColumns(
        filteredSearchOptions
      )
      this.collection = new FilterArtworks(fabricate2("filter_artworks"), {
        parse: true,
      })

      this.template = render("overview")({
        sd: {
          CURRENT_PATH: "/cool-fair",
          PROFILE: fabricate("fair_profile"),
          FAIR: fabricate("fair", {
            filter_genes: _.times(2, () =>
              fabricate("gene", { id: _.uniqueId() })
            ),
          }),
        },
        fair,
        profile,
        filteredSearchColumns,
        coverImage,
        primarySets,
        asset() {},
        _,
        counts: this.collection.counts,
        params: new Backbone.Model(),
        filterLabelMap: require("../../../components/filter2/dropdown/label_map.coffee"),
        _s,
        infoMenu: { events: true, programming: true, artsyAtTheFair: true },
      })

      const nestedFilteredSearchOptions = new Backbone.Model({
        related_gene: {
          "abstract-painting": {
            name: "Abstract Painting",
            count: 388,
          },
          "art-since-2000": {
            name: "Art since 2000",
            count: 1717,
          },
          "black-and-white-photography": {
            name: "Black and White Photography",
            count: 99,
          },
          "contemporary-slash-modern": {
            name: "Contemporary/Modern",
            count: 38,
          },
        },
      })

      nestedFilteredSearchColumns = fair.filteredSearchColumns(
        nestedFilteredSearchOptions
      )
      return (this.nestedTemplate = render("overview")({
        sd: {
          CURRENT_PATH: "/cool-fair",
          PROFILE: fabricate("fair_profile"),
          FAIR: fabricate("fair", {
            filter_genes: _.times(2, () =>
              fabricate("gene", { id: _.uniqueId() })
            ),
          }),
        },
        fair,
        profile,
        filteredSearchColumns: nestedFilteredSearchColumns,
        coverImage,
        primarySets,
        asset() {},
        _,
        counts: this.collection.counts,
        params: new Backbone.Model(),
        filterLabelMap: require("../../../components/filter2/dropdown/label_map.coffee"),
        _s,
        infoMenu: { events: true, programming: true, artsyAtTheFair: true },
      }))
    })

    xit("renders without errors", function () {
      const $ = cheerio.load(this.template)
      $(".fair-search-options-column").length.should.equal(2)
      $(".fair-search-options-column a").length.should.equal(10)
      $(".fair-search-options-column")
        .text()
        .should.containEql("Contemporary Pop")
      $(".feature-image").length.should.equal(1)

      $(".container-right .small-section").length.should.equal(2)
      $(".container-left .small-section").length.should.equal(2)
      $(".fair-overview-curator .small-section").length.should.equal(2)
      return $("#fair-editorial-2-up article").length.should.equal(2)
    })

    xit("renders nested gene names without errors", function () {
      const $ = cheerio.load(this.nestedTemplate)
      $(".fair-search-options-column").length.should.equal(2)
      $(".fair-search-options-column a").length.should.equal(4)
      return $(".fair-search-options-column")
        .text()
        .should.containEql("Contemporary/Modern")
    })

    it("renders a 3 grid layout with less editorial", function () {
      const eSet = primarySets.findWhere({ key: "editorial" })
      const cSet = primarySets.findWhere({ key: "curator" })
      eSet.get("items").reset(eSet.get("items").first(2))
      cSet.get("items").reset(cSet.get("items").first(1))
      const $ = cheerio.load(
        render("overview")({
          sd: {
            CURRENT_PATH: "/cool-fair",
            PROFILE: fabricate("fair_profile"),
            FAIR: fabricate("fair", { filter_genes: [] }),
          },
          fair,
          profile,
          filteredSearchColumns: nestedFilteredSearchColumns,
          coverImage,
          primarySets,
          asset() {},
          _,
          counts: this.collection.counts,
          params: new Backbone.Model(),
          filterLabelMap: require("../../../components/filter2/dropdown/label_map.coffee"),
          _s,
          infoMenu: { events: true, programming: true, artsyAtTheFair: true },
        })
      )
      return $.html(".fair-overview-post-container").should.containEql(
        "fair-editorial-3-up"
      )
    })

    it("renders a editorial even when missing a set", function () {
      const eSet = primarySets.findWhere({ key: "editorial" })
      const cSet = primarySets.findWhere({ key: "curator" })
      primarySets.remove(eSet)
      cSet.get("items").reset([{}, {}])
      const $ = cheerio.load(
        render("overview")({
          sd: {
            CURRENT_PATH: "/cool-fair",
            PROFILE: fabricate("fair_profile"),
            FAIR: fabricate("fair", { filter_genes: [] }),
          },
          fair,
          profile,
          filteredSearchColumns: nestedFilteredSearchColumns,
          coverImage,
          primarySets,
          asset() {},
          _,
          counts: this.collection.counts,
          params: new Backbone.Model(),
          filterLabelMap: require("../../../components/filter2/dropdown/label_map.coffee"),
          _s,
          infoMenu: { events: true, programming: true, artsyAtTheFair: true },
        })
      )
      return $.html(".fair-overview-post-container").should.containEql(
        "fair-editorial-2-up"
      )
    })

    it("renders a editorial even when missing a set w/ >= 4 items", function () {
      const eSet = primarySets.findWhere({ key: "editorial" })
      const cSet = primarySets.findWhere({ key: "curator" })
      cSet.get("items").reset([{}, {}, {}, {}, {}])
      primarySets.remove(eSet)
      const $ = cheerio.load(
        render("overview")({
          sd: {
            CURRENT_PATH: "/cool-fair",
            PROFILE: fabricate("fair_profile"),
            FAIR: fabricate("fair", { filter_genes: [] }),
          },
          fair,
          profile,
          filteredSearchColumns: nestedFilteredSearchColumns,
          coverImage,
          primarySets,
          asset() {},
          _,
          counts: this.collection.counts,
          params: new Backbone.Model(),
          filterLabelMap: require("../../../components/filter2/dropdown/label_map.coffee"),
          _s,
          infoMenu: { events: true, programming: true, artsyAtTheFair: true },
        })
      )
      return $.html().should.containEql("fair-overview-curator")
    })

    return it("renders tagline if present", function () {
      const $ = cheerio.load(
        render("overview")({
          sd: {
            CURRENT_PATH: "/cool-fair",
            PROFILE: fabricate("fair_profile"),
            FAIR: fabricate("fair", { filter_genes: [] }),
          },
          fair,
          profile,
          filteredSearchColumns: nestedFilteredSearchColumns,
          coverImage,
          primarySets,
          asset() {},
          _,
          counts: this.collection.counts,
          params: new Backbone.Model(),
          filterLabelMap: require("../../../components/filter2/dropdown/label_map.coffee"),
          _s,
          infoMenu: { events: true, programming: true, artsyAtTheFair: true },
        })
      )

      return $.html(".fair-tagline").should.containEql(
        "This is a custom tagline"
      )
    })
  })

  describe("exhibitors columns", function () {
    before(function () {
      const partnerShow = new FeedItem(
        fabricate("show", {
          _type: "PartnerShow",
          artists: [fabricate("artist")],
          artworks: [fabricate("artwork")],
        })
      )
      return (this.template = render("exhibitors_columns")({
        columns: [
          [partnerShow, partnerShow],
          [partnerShow, partnerShow],
        ],
      }))
    })

    return it("renders without errors", function () {
      const $ = cheerio.load(this.template)
      $(".exhibitors-column").length.should.equal(2)
      $(".exhibitor-name").length.should.equal(4)
      return $(".exhibitor-item img").length.should.equal(4)
    })
  })

  return describe("metatags", function () {
    describe("articles page", function () {
      before(function (done) {
        const sd = {
          CURRENT_PATH: "/cool-fair/articles",
          SECTION: "posts",
          FAIR: fabricate("fair"),
        }
        const fair = new Fair(sd.FAIR)
        const profile = new Profile(sd.PROFILE)
        const template = render("index")({
          sd,
          fair,
          profile,
          asset() {},
        })
        this.$template = cheerio.load(template)
        return done()
      })

      return it("renders article metadata", function () {
        this.$template
          .html()
          .should.containEql(
            "<title>Exclusive Artsy Editorial from Armory Show 2013</title>"
          )
        return this.$template
          .html()
          .should.containEql(
            '<meta name="description" content="Read the latest articles from Armory Show 2013 on Artsy.">'
          )
      })
    })

    describe("visitor info page", function () {
      before(function (done) {
        const sd = {
          CURRENT_PATH: "/cool-fair/info",
          SECTION: "info",
          FAIR: fabricate("fair"),
        }
        const fair = new Fair(sd.FAIR)
        const profile = new Profile(sd.PROFILE)
        const template = render("index")({
          sd,
          fair,
          profile,
          asset() {},
        })
        this.$template = cheerio.load(template)
        return done()
      })

      return it("renders info metadata", function () {
        this.$template
          .html()
          .should.containEql(
            "<title>Visitor information: Armory Show 2013</title>"
          )
        return this.$template
          .html()
          .should.containEql(
            '<meta name="description" content="Plan your visit to Armory Show 2013: Hours, address, contact information, and more on Artsy.">'
          )
      })
    })

    describe("artworks page", function () {
      before(function (done) {
        const sd = {
          CURRENT_PATH: "/browse/artworks",
          SECTION: "browse",
          PROFILE: fabricate("fair_profile"),
          FAIR: fabricate("fair", { filter_genes: [] }),
        }
        const fair = new Fair(sd.FAIR)
        const params = new Backbone.Model({ fair: fair.id })
        const profile = new Profile(sd.PROFILE)
        const filterArtworks = new FilterArtworks(
          fabricate2("filter_artworks"),
          { parse: true }
        )
        const template = render("index")({
          sd,
          fair,
          params,
          profile,
          counts: filterArtworks.counts,
          filterLabelMap: require("../../../components/filter2/dropdown/label_map.coffee"),
          _,
          _s,
          asset() {},
        })
        this.$template = cheerio.load(template)
        return done()
      })

      return it("renders artwork page metadata", function () {
        this.$template
          .html()
          .should.containEql("<title>Artworks from Armory Show 2013</title>")
        return this.$template
          .html()
          .should.containEql(
            '<meta name="description" content="Browse artworks being shown at Armory Show 2013 on Artsy.">'
          )
      })
    })

    describe("exhibitors page", function () {
      before(function (done) {
        const sd = {
          CURRENT_PATH: "/browse/booths",
          SECTION: "browse",
          PROFILE: fabricate("fair_profile"),
          FAIR: fabricate("fair", { filter_genes: [] }),
        }
        const fair = new Fair(sd.FAIR)
        const params = new Backbone.Model({ fair: fair.id })
        const profile = new Profile(sd.PROFILE)
        const filterArtworks = new FilterArtworks(
          fabricate2("filter_artworks"),
          { parse: true }
        )
        const template = render("index")({
          sd,
          fair,
          params,
          profile,
          counts: filterArtworks.counts,
          filterLabelMap: require("../../../components/filter2/dropdown/label_map.coffee"),
          _,
          _s,
          asset() {},
        })
        this.$template = cheerio.load(template)
        return done()
      })

      return it("renders exhibitor page metadata", function () {
        this.$template
          .html()
          .should.containEql("<title>Exhibitors at Armory Show 2013</title>")
        return this.$template
          .html()
          .should.containEql(
            '<meta name="description" content="Browse galleries exhibiting at Armory Show 2013 on Artsy.">'
          )
      })
    })

    return describe("fair artist page", function () {
      before(function (done) {
        const sd = {
          CURRENT_PATH: "/browse/artist/andy-foobar",
          SECTION: "browse",
          PROFILE: fabricate("fair_profile"),
          FAIR: fabricate("fair", { filter_genes: [] }),
        }
        const fair = new Fair(sd.FAIR)
        const params = new Backbone.Model({ fair: fair.id })
        const profile = new Profile(sd.PROFILE)
        const filterArtworks = new FilterArtworks(
          fabricate2("filter_artworks"),
          { parse: true }
        )
        const template = render("index")({
          sd,
          fair,
          params,
          profile,
          counts: filterArtworks.counts,
          filterLabelMap: require("../../../components/filter2/dropdown/label_map.coffee"),
          _,
          _s,
          asset() {},
        })
        this.$template = cheerio.load(template)
        return done()
      })

      return it("renders fair artist page metadata", function () {
        this.$template
          .html()
          .should.containEql("<title>Andy Foobar at Armory Show 2013</title>")
        return this.$template
          .html()
          .should.containEql(
            '<meta name="description" content="Browse works by Andy Foobar being shown at Armory Show 2013 on Artsy.">'
          )
      })
    })
  })
})
