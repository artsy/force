/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let aboutTemplate,
  articlesTemplate,
  ArtistsGridView,
  ArtistsListView,
  fairBoothsTemplate,
  FixedCellsCountCarousel,
  HeroArtworksCarousel,
  HeroShowsCarousel,
  LocationsView,
  NewsView,
  ShowsGrid,
  showsTemplate
const _ = require("underscore")
const sinon = require("sinon")
const rewire = require("rewire")
const Backbone = require("backbone")
const Artworks = require("../../../../collections/artworks.coffee")
const PartnerShows = require("../../../../collections/partner_shows.coffee")
const Articles = require("../../../../collections/articles.coffee")
const Profile = require("../../../../models/profile.coffee")
const Partner = require("../../../../models/partner.coffee")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

const factory = rewire("../../client/overview_layout_factory.coffee")
factory.__set__("HeroShowsCarousel", (HeroShowsCarousel = sinon.stub()))
factory.__set__("HeroArtworksCarousel", (HeroArtworksCarousel = sinon.stub()))
factory.__set__("ArtistsListView", (ArtistsListView = sinon.stub()))
factory.__set__("ArtistsGridView", (ArtistsGridView = sinon.stub()))
factory.__set__(
  "aboutTemplate",
  (aboutTemplate = sinon.stub().returns("<article></article>"))
)
factory.__set__("NewsView", (NewsView = sinon.stub()))
factory.__set__(
  "FixedCellsCountCarousel",
  (FixedCellsCountCarousel = sinon.stub())
)
factory.__set__(
  "showsTemplate",
  (showsTemplate = sinon.stub().returns("<article></article>"))
)
factory.__set__(
  "fairBoothsTemplate",
  (fairBoothsTemplate = sinon.stub().returns("<article></article>"))
)
factory.__set__(
  "articlesTemplate",
  (articlesTemplate = sinon.stub().returns("<article></article>"))
)
factory.__set__("ShowsGrid", (ShowsGrid = sinon.stub()))
factory.__set__("LocationsView", (LocationsView = sinon.stub()))

describe("overview_layout_factory", function () {
  xdescribe("gallery_six", function () {
    beforeEach(function () {
      this.profile = new Profile(
        fabricate("partner_profile", { full_bio: "full bio here" })
      )
      return (this.partner = new Partner(
        fabricate("partner", { profile_layout: "gallery_six" })
      ))
    })

    return it("returns modules properly", function () {
      return factory(this.partner, this.profile).should.eql([
        {
          name: "hero",
          component: HeroShowsCarousel,
          options: { partner: this.partner, maxNumberOfShows: 1 },
        },
        { name: "about", template: "<article></article>", title: "About" },
        {
          name: "shows",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: showsTemplate,
          },
          title: "Shows",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "fair-booths",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: fairBoothsTemplate,
          },
          title: "Fair Booths",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "artists",
          component: ArtistsGridView,
          options: { partner: this.partner },
        },
      ])
    })
  })

  xdescribe("gallery_five", function () {
    beforeEach(function () {
      this.profile = new Profile(
        fabricate("partner_profile", { full_bio: "full_bil" })
      )
      return (this.partner = new Partner(
        fabricate("partner", {
          profile_layout: "gallery_five",
          display_artists_section: true,
        })
      ))
    })

    it('returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', function () {
      this.partner.set({ profile_banner_display: "Shows" })
      this.partner.set({ profile_artists_layout: "Grid" })
      return factory(this.partner, this.profile).should.eql([
        {
          name: "hero",
          component: HeroShowsCarousel,
          options: { partner: this.partner, maxNumberOfShows: 10 },
        },
        { name: "about", template: "<article></article>", title: "About" },
        {
          name: "news",
          component: NewsView,
          options: { partner: this.partner },
          title: "News",
        },
        {
          name: "shows",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: showsTemplate,
          },
          title: "Shows",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "fair-booths",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: fairBoothsTemplate,
          },
          title: "Fair Booths",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "artists",
          component: ArtistsGridView,
          options: { partner: this.partner },
          title: undefined,
          viewAll: undefined,
        },
        {
          name: "articles",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new Articles(),
            fetchOptions: {
              partner_id: this.partner.get("_id"),
              published: true,
              limit: 9,
              sort: "-published_at",
            },
            template: articlesTemplate,
          },
          title: "Articles",
          viewAll: `${this.partner.href()}/articles`,
        },
      ])
    })

    return it('returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', function () {
      this.partner.set({ profile_banner_display: "Artworks" })
      this.partner.set({ profile_artists_layout: "List" })
      return factory(this.partner, this.profile).should.eql([
        {
          name: "hero",
          component: HeroArtworksCarousel,
          options: { partner: this.partner },
        },
        { name: "about", template: "<article></article>", title: "About" },
        {
          name: "news",
          component: NewsView,
          options: { partner: this.partner },
          title: "News",
        },
        {
          name: "shows",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: showsTemplate,
          },
          title: "Shows",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "fair-booths",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: fairBoothsTemplate,
          },
          title: "Fair Booths",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "artists",
          component: ArtistsListView,
          options: { partner: this.partner },
          title: "Artists",
          viewAll: `${this.partner.href()}/artists`,
        },
        {
          name: "articles",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new Articles(),
            fetchOptions: {
              partner_id: this.partner.get("_id"),
              published: true,
              limit: 9,
              sort: "-published_at",
            },
            template: articlesTemplate,
          },
          title: "Articles",
          viewAll: `${this.partner.href()}/articles`,
        },
      ])
    })
  })

  xdescribe("gallery_four", function () {
    beforeEach(function () {
      this.profile = new Profile(
        fabricate("partner_profile", { full_bio: "full_bio here" })
      )
      return (this.partner = new Partner(
        fabricate("partner", {
          profile_layout: "gallery_four",
          display_artists_section: true,
        })
      ))
    })

    it('returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', function () {
      this.partner.set({ profile_banner_display: "Shows" })
      this.partner.set({ profile_artists_layout: "Grid" })
      return factory(this.partner, this.profile).should.eql([
        {
          name: "hero",
          component: HeroShowsCarousel,
          options: { partner: this.partner, maxNumberOfShows: 10 },
        },
        { name: "about", template: "<article></article>", title: "About" },
        {
          name: "news",
          component: NewsView,
          options: { partner: this.partner },
          title: "News",
        },
        {
          name: "shows",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: showsTemplate,
          },
          title: "Shows",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "fair-booths",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: fairBoothsTemplate,
          },
          title: "Fair Booths",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "artists",
          component: ArtistsGridView,
          options: { partner: this.partner },
          title: undefined,
          viewAll: undefined,
        },
        {
          name: "articles",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new Articles(),
            fetchOptions: {
              partner_id: this.partner.get("_id"),
              published: true,
              limit: 9,
              sort: "-published_at",
            },
            template: articlesTemplate,
          },
          title: "Articles",
          viewAll: `${this.partner.href()}/articles`,
        },
      ])
    })

    it('returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', function () {
      this.partner.set({ profile_banner_display: "Artworks" })
      this.partner.set({ profile_artists_layout: "List" })
      return factory(this.partner, this.profile).should.eql([
        {
          name: "hero",
          component: HeroArtworksCarousel,
          options: { partner: this.partner },
        },
        { name: "about", template: "<article></article>", title: "About" },
        {
          name: "news",
          component: NewsView,
          options: { partner: this.partner },
          title: "News",
        },
        {
          name: "shows",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: showsTemplate,
          },
          title: "Shows",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "fair-booths",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: fairBoothsTemplate,
          },
          title: "Fair Booths",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "artists",
          component: ArtistsListView,
          options: { partner: this.partner },
          title: "Artists",
          viewAll: `${this.partner.href()}/artists`,
        },
        {
          name: "articles",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new Articles(),
            fetchOptions: {
              partner_id: this.partner.get("_id"),
              published: true,
              limit: 9,
              sort: "-published_at",
            },
            template: articlesTemplate,
          },
          title: "Articles",
          viewAll: `${this.partner.href()}/articles`,
        },
      ])
    })

    return it('does not return the "Artists" module when display_artists_section is false', function () {
      this.partner.set({ display_artists_section: false })
      const modules = factory(this.partner, this.profile)
      return modules.should.containDeep([
        { name: "artists", component: undefined },
      ])
    })
  })

  _.each(
    [
      "gallery_three",
      "gallery_four",
      "gallery_five",
      "gallery_six",
      "gallery_eight",
    ],
    layout =>
      describe(`Gallery with ${layout} layout`, function () {
        beforeEach(function () {
          this.profile = new Profile(
            fabricate("partner_profile", { full_bio: "full_bil" })
          )
          return (this.partner = new Partner(
            fabricate("partner", {
              profile_layout: layout,
              display_artists_section: true,
            })
          ))
        })

        it('returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', function () {
          this.partner.set({ profile_banner_display: "Shows" })
          this.partner.set({ profile_artists_layout: "Grid" })
          return factory(this.partner, this.profile).should.eql([
            {
              name: "hero",
              component: HeroShowsCarousel,
              options: { partner: this.partner, maxNumberOfShows: 10 },
            },
            { name: "about", template: "<article></article>", title: "About" },
            {
              name: "news",
              component: NewsView,
              options: { partner: this.partner },
              title: "News",
            },
            {
              name: "shows",
              component: FixedCellsCountCarousel,
              options: {
                partner: this.partner,
                collection: new PartnerShows(),
                fetchOptions: [
                  {
                    partner_id: this.partner.get("_id"),
                    status: "current",
                    at_a_fair: false,
                    displayable: true,
                    size: 9,
                    sort: "start_at",
                  },
                  {
                    partner_id: this.partner.get("_id"),
                    status: "closed",
                    at_a_fair: false,
                    displayable: true,
                    size: 9,
                    sort: "-end_at",
                  },
                ],
                template: showsTemplate,
              },
              title: "Shows",
              viewAll: `${this.partner.href()}/shows`,
            },
            {
              name: "fair-booths",
              component: FixedCellsCountCarousel,
              options: {
                partner: this.partner,
                collection: new PartnerShows(),
                fetchOptions: [
                  {
                    partner_id: this.partner.get("_id"),
                    status: "current",
                    at_a_fair: true,
                    displayable: true,
                    size: 9,
                    sort: "start_at",
                  },
                  {
                    partner_id: this.partner.get("_id"),
                    status: "closed",
                    at_a_fair: true,
                    displayable: true,
                    size: 9,
                    sort: "-end_at",
                  },
                ],
                template: fairBoothsTemplate,
              },
              title: "Fair Booths",
              viewAll: `${this.partner.href()}/shows`,
            },
            {
              name: "artists",
              component: ArtistsGridView,
              options: { partner: this.partner },
              title: undefined,
              viewAll: undefined,
            },
            {
              name: "articles",
              component: FixedCellsCountCarousel,
              options: {
                partner: this.partner,
                collection: new Articles(),
                fetchOptions: {
                  partner_id: this.partner.get("_id"),
                  published: true,
                  limit: 9,
                  sort: "-published_at",
                },
                template: articlesTemplate,
              },
              title: "Articles",
              viewAll: `${this.partner.href()}/articles`,
            },
          ])
        })

        it('returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', function () {
          this.partner.set({ profile_banner_display: "Artworks" })
          this.partner.set({ profile_artists_layout: "List" })
          return factory(this.partner, this.profile).should.eql([
            {
              name: "hero",
              component: HeroArtworksCarousel,
              options: { partner: this.partner },
            },
            { name: "about", template: "<article></article>", title: "About" },
            {
              name: "news",
              component: NewsView,
              options: { partner: this.partner },
              title: "News",
            },
            {
              name: "shows",
              component: FixedCellsCountCarousel,
              options: {
                partner: this.partner,
                collection: new PartnerShows(),
                fetchOptions: [
                  {
                    partner_id: this.partner.get("_id"),
                    status: "current",
                    at_a_fair: false,
                    displayable: true,
                    size: 9,
                    sort: "start_at",
                  },
                  {
                    partner_id: this.partner.get("_id"),
                    status: "closed",
                    at_a_fair: false,
                    displayable: true,
                    size: 9,
                    sort: "-end_at",
                  },
                ],
                template: showsTemplate,
              },
              title: "Shows",
              viewAll: `${this.partner.href()}/shows`,
            },
            {
              name: "fair-booths",
              component: FixedCellsCountCarousel,
              options: {
                partner: this.partner,
                collection: new PartnerShows(),
                fetchOptions: [
                  {
                    partner_id: this.partner.get("_id"),
                    status: "current",
                    at_a_fair: true,
                    displayable: true,
                    size: 9,
                    sort: "start_at",
                  },
                  {
                    partner_id: this.partner.get("_id"),
                    status: "closed",
                    at_a_fair: true,
                    displayable: true,
                    size: 9,
                    sort: "-end_at",
                  },
                ],
                template: fairBoothsTemplate,
              },
              title: "Fair Booths",
              viewAll: `${this.partner.href()}/shows`,
            },
            {
              name: "artists",
              component: ArtistsListView,
              options: { partner: this.partner },
              title: "Artists",
              viewAll: `${this.partner.href()}/artists`,
            },
            {
              name: "articles",
              component: FixedCellsCountCarousel,
              options: {
                partner: this.partner,
                collection: new Articles(),
                fetchOptions: {
                  partner_id: this.partner.get("_id"),
                  published: true,
                  limit: 9,
                  sort: "-published_at",
                },
                template: articlesTemplate,
              },
              title: "Articles",
              viewAll: `${this.partner.href()}/articles`,
            },
          ])
        })

        return it('does not return the "Artists" module when display_artists_section is false', function () {
          this.partner.set({ display_artists_section: false })
          const modules = factory(this.partner, this.profile)
          return modules.should.containDeep([
            { name: "artists", component: undefined },
          ])
        })
      })
  )

  describe("gallery_two", function () {
    beforeEach(function () {
      this.profile = new Profile(
        fabricate("partner_profile", { full_bio: "full bio here" })
      )
      return (this.partner = new Partner(
        fabricate("partner", {
          profile_layout: "gallery_two",
          display_artists_section: true,
        })
      ))
    })

    it('returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', function () {
      this.partner.set({ profile_banner_display: "Shows" })
      this.partner.set({ profile_artists_layout: "Grid" })
      return factory(this.partner, this.profile).should.eql([
        {
          name: "hero",
          component: HeroShowsCarousel,
          options: { partner: this.partner, maxNumberOfShows: 2 },
        },
        { name: "about", template: "<article></article>", title: "About" },
        {
          name: "news",
          component: NewsView,
          options: { partner: this.partner },
          title: "News",
        },
        {
          name: "shows",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: showsTemplate,
          },
          title: "Shows",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "fair-booths",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: fairBoothsTemplate,
          },
          title: "Fair Booths",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "artists",
          component: ArtistsGridView,
          options: { partner: this.partner },
          title: undefined,
          viewAll: undefined,
        },
        {
          name: "articles",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new Articles(),
            fetchOptions: {
              partner_id: this.partner.get("_id"),
              published: true,
              limit: 9,
              sort: "-published_at",
            },
            template: articlesTemplate,
          },
          title: "Articles",
          viewAll: `${this.partner.href()}/articles`,
        },
      ])
    })

    it('returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', function () {
      this.partner.set({ profile_banner_display: "Artworks" })
      this.partner.set({ profile_artists_layout: "List" })
      return factory(this.partner, this.profile).should.eql([
        {
          name: "hero",
          component: HeroArtworksCarousel,
          options: { partner: this.partner },
        },
        { name: "about", template: "<article></article>", title: "About" },
        {
          name: "news",
          component: NewsView,
          options: { partner: this.partner },
          title: "News",
        },
        {
          name: "shows",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: false,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: showsTemplate,
          },
          title: "Shows",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "fair-booths",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new PartnerShows(),
            fetchOptions: [
              {
                partner_id: this.partner.get("_id"),
                status: "current",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "start_at",
              },
              {
                partner_id: this.partner.get("_id"),
                status: "closed",
                at_a_fair: true,
                displayable: true,
                size: 9,
                sort: "-end_at",
              },
            ],
            template: fairBoothsTemplate,
          },
          title: "Fair Booths",
          viewAll: `${this.partner.href()}/shows`,
        },
        {
          name: "artists",
          component: ArtistsListView,
          options: { partner: this.partner },
          title: "Artists",
          viewAll: `${this.partner.href()}/artists`,
        },
        {
          name: "articles",
          component: FixedCellsCountCarousel,
          options: {
            partner: this.partner,
            collection: new Articles(),
            fetchOptions: {
              partner_id: this.partner.get("_id"),
              published: true,
              limit: 9,
              sort: "-published_at",
            },
            template: articlesTemplate,
          },
          title: "Articles",
          viewAll: `${this.partner.href()}/articles`,
        },
      ])
    })

    return it('does not return the "Artists" module when display_artists_section is false', function () {
      this.partner.set({ display_artists_section: false })
      const modules = factory(this.partner, this.profile)
      return modules.should.containDeep([
        { name: "artists", component: undefined },
      ])
    })
  })

  _.each(["gallery_one", "gallery_seven"], layout =>
    describe(`Gallery with ${layout} layout`, function () {
      beforeEach(function () {
        this.profile = new Profile(
          fabricate("partner_profile", { full_bio: "full bio here" })
        )
        return (this.partner = new Partner(
          fabricate("partner", { profile_layout: layout })
        ))
      })

      return it("returns modules properly", function () {
        return factory(this.partner, this.profile).should.eql([
          {
            name: "hero",
            component: HeroShowsCarousel,
            options: { partner: this.partner, maxNumberOfShows: 1 },
          },
          { name: "about", template: "<article></article>", title: "About" },
          {
            name: "shows",
            component: FixedCellsCountCarousel,
            options: {
              partner: this.partner,
              collection: new PartnerShows(),
              fetchOptions: [
                {
                  partner_id: this.partner.get("_id"),
                  status: "current",
                  at_a_fair: false,
                  displayable: true,
                  size: 9,
                  sort: "start_at",
                },
                {
                  partner_id: this.partner.get("_id"),
                  status: "closed",
                  at_a_fair: false,
                  displayable: true,
                  size: 9,
                  sort: "-end_at",
                },
              ],
              template: showsTemplate,
            },
            title: "Shows",
            viewAll: `${this.partner.href()}/shows`,
          },
          {
            name: "fair-booths",
            component: FixedCellsCountCarousel,
            options: {
              partner: this.partner,
              collection: new PartnerShows(),
              fetchOptions: [
                {
                  partner_id: this.partner.get("_id"),
                  status: "current",
                  at_a_fair: true,
                  displayable: true,
                  size: 9,
                  sort: "start_at",
                },
                {
                  partner_id: this.partner.get("_id"),
                  status: "closed",
                  at_a_fair: true,
                  displayable: true,
                  size: 9,
                  sort: "-end_at",
                },
              ],
              template: fairBoothsTemplate,
            },
            title: "Fair Booths",
            viewAll: `${this.partner.href()}/shows`,
          },
          {
            name: "artists",
            component: ArtistsGridView,
            options: { partner: this.partner },
          },
        ])
      })
    })
  )

  return describe("gallery_default", function () {
    beforeEach(function () {
      this.profile = new Profile(
        fabricate("partner_profile", { full_bio: "full bio here" })
      )
      return (this.partner = new Partner(
        fabricate("partner", {
          profile_layout: "gallery_default",
          claimed: false,
        })
      ))
    })

    it("returns modules without artists for fair partners", function () {
      return factory(this.partner, this.profile).should.eql([
        {
          name: "shows",
          component: ShowsGrid,
          options: {
            partner: this.partner,
            isCombined: true,
            numberOfFeatured: 0,
            numberOfShows: 6,
            seeAll: false,
            heading: "Shows & Fair Booths",
          },
        },
        {
          name: "artists",
          component: undefined,
          options: { partner: this.partner },
        },
        {
          name: "locations",
          title: "Locations",
          component: LocationsView,
          options: { partner: this.partner },
        },
      ])
    })

    return it("returns modules properly otherwise", function () {
      this.partner = new Partner(
        fabricate("partner", {
          profile_layout: "gallery_default",
          claimed: true,
        })
      )
      return factory(this.partner, this.profile).should.eql([
        {
          name: "shows",
          component: ShowsGrid,
          options: {
            partner: this.partner,
            isCombined: true,
            numberOfFeatured: 1,
            numberOfShows: 6,
            seeAll: true,
            heading: undefined,
          },
        },
        {
          name: "artists",
          component: ArtistsGridView,
          options: { partner: this.partner },
        },
        {
          name: "locations",
          title: "Locations",
          component: undefined,
          options: { partner: this.partner },
        },
      ])
    })
  })
})
