_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
Artworks = require '../../../../collections/artworks.coffee'
PartnerShows = require '../../../../collections/partner_shows.coffee'
Articles = require '../../../../collections/articles.coffee'
Profile = require '../../../../models/profile.coffee'
Partner = require '../../../../models/partner.coffee'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

factory = rewire '../../client/overview_layout_factory.coffee'
factory.__set__ 'HeroShowsCarousel', HeroShowsCarousel = sinon.stub()
factory.__set__ 'HeroArtworksCarousel', HeroArtworksCarousel = sinon.stub()
factory.__set__ 'ArtistsListView', ArtistsListView = sinon.stub()
factory.__set__ 'ArtistsGridView', ArtistsGridView = sinon.stub()
factory.__set__ 'aboutTemplate', aboutTemplate = sinon.stub().returns '<article></article>'
factory.__set__ 'NewsView', NewsView = sinon.stub()
factory.__set__ 'FixedCellsCountCarousel', FixedCellsCountCarousel = sinon.stub()
factory.__set__ 'showsTemplate', showsTemplate = sinon.stub().returns '<article></article>'
factory.__set__ 'fairBoothsTemplate', fairBoothsTemplate = sinon.stub().returns '<article></article>'
factory.__set__ 'articlesTemplate', articlesTemplate = sinon.stub().returns '<article></article>'
factory.__set__ 'ShowsGrid', ShowsGrid = sinon.stub()
factory.__set__ 'LocationsView', LocationsView = sinon.stub()

describe 'overview_layout_factory', ->

  describe 'gallery_seven', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full bio here'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_seven'

    it 'returns modules properly', ->
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 1 } }
        { name: 'about', template: '<article></article>', title: 'About' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsGridView, options: partner: @partner }
      ]

  describe 'gallery_six', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full bio here'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_six'

    it 'returns modules properly', ->
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 1 } }
        { name: 'about', template: '<article></article>', title: 'About' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsGridView, options: partner: @partner }
      ]

  describe 'gallery_five', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full_bil'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_five', display_artists_section: true

    it 'returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', ->
      @partner.set profile_banner_display: 'Shows'
      @partner.set profile_artists_layout: 'Grid'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 10 } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsGridView, options: { partner: @partner }, title: undefined, viewAll: undefined }
        {
          name: 'articles'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new Articles
            fetchOptions: partner_id: @partner.get('_id'), published: true, limit: 9, sort: '-published_at'
            template: articlesTemplate
          title: 'Articles'
          viewAll: "#{@partner.href()}/articles"
        }
      ]

    it 'returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', ->
      @partner.set profile_banner_display: 'Artworks'
      @partner.set profile_artists_layout: 'List'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroArtworksCarousel, options: { partner: @partner } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsListView, options: { partner: @partner }, title: 'Artists', viewAll: "#{@partner.href()}/artists" }
        {
          name: 'articles'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new Articles
            fetchOptions: partner_id: @partner.get('_id'), published: true, limit: 9, sort: '-published_at'
            template: articlesTemplate
          title: 'Articles'
          viewAll: "#{@partner.href()}/articles"
        }
      ]

  describe 'gallery_four', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full_bio here'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_four', display_artists_section: true

    it 'returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', ->
      @partner.set profile_banner_display: 'Shows'
      @partner.set profile_artists_layout: 'Grid'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 10 } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsGridView, options: { partner: @partner }, title: undefined, viewAll: undefined }
        {
          name: 'articles'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new Articles
            fetchOptions: partner_id: @partner.get('_id'), published: true, limit: 9, sort: '-published_at'
            template: articlesTemplate
          title: 'Articles'
          viewAll: "#{@partner.href()}/articles"
        }
      ]

    it 'returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', ->
      @partner.set profile_banner_display: 'Artworks'
      @partner.set profile_artists_layout: 'List'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroArtworksCarousel, options: { partner: @partner } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsListView, options: { partner: @partner }, title: 'Artists', viewAll: "#{@partner.href()}/artists" }
        {
          name: 'articles'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new Articles
            fetchOptions: partner_id: @partner.get('_id'), published: true, limit: 9, sort: '-published_at'
            template: articlesTemplate
          title: 'Articles'
          viewAll: "#{@partner.href()}/articles"
        }
      ]

    it 'does not return the "Artists" module when display_artists_section is false', ->
      @partner.set display_artists_section: false
      modules = factory(@partner, @profile)
      modules.should.containDeep [{ name: 'artists', component: undefined }]

  describe 'gallery_three', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full_bil'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_three', display_artists_section: true

    it 'returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', ->
      @partner.set profile_banner_display: 'Shows'
      @partner.set profile_artists_layout: 'Grid'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 10 } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsGridView, options: { partner: @partner }, title: undefined, viewAll: undefined }
        {
          name: 'articles'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new Articles
            fetchOptions: partner_id: @partner.get('_id'), published: true, limit: 9, sort: '-published_at'
            template: articlesTemplate
          title: 'Articles'
          viewAll: "#{@partner.href()}/articles"
        }
      ]

    it 'returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', ->
      @partner.set profile_banner_display: 'Artworks'
      @partner.set profile_artists_layout: 'List'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroArtworksCarousel, options: { partner: @partner } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsListView, options: { partner: @partner }, title: 'Artists', viewAll: "#{@partner.href()}/artists" }
        {
          name: 'articles'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new Articles
            fetchOptions: partner_id: @partner.get('_id'), published: true, limit: 9, sort: '-published_at'
            template: articlesTemplate
          title: 'Articles'
          viewAll: "#{@partner.href()}/articles"
        }
      ]

  describe 'gallery_two', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full bio here'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_two', display_artists_section: true

    it 'returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', ->
      @partner.set profile_banner_display: 'Shows'
      @partner.set profile_artists_layout: 'Grid'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 2 } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsGridView, options: { partner: @partner }, title: undefined, viewAll: undefined }
        {
          name: 'articles'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new Articles
            fetchOptions: partner_id: @partner.get('_id'), published: true, limit: 9, sort: '-published_at'
            template: articlesTemplate
          title: 'Articles'
          viewAll: "#{@partner.href()}/articles"
        }
      ]

    it 'returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', ->
      @partner.set profile_banner_display: 'Artworks'
      @partner.set profile_artists_layout: 'List'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroArtworksCarousel, options: { partner: @partner } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsListView, options: { partner: @partner }, title: 'Artists', viewAll: "#{@partner.href()}/artists" }
        {
          name: 'articles'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new Articles
            fetchOptions: partner_id: @partner.get('_id'), published: true, limit: 9, sort: '-published_at'
            template: articlesTemplate
          title: 'Articles'
          viewAll: "#{@partner.href()}/articles"
        }
      ]

    it 'does not return the "Artists" module when display_artists_section is false', ->
      @partner.set display_artists_section: false
      modules = factory(@partner, @profile)
      modules.should.containDeep [{ name: 'artists', component: undefined }]

  describe 'gallery_one', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full bio here'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_one'

    it 'returns modules properly', ->
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 1 } }
        { name: 'about', template: '<article></article>', title: 'About' }
        {
          name: 'shows',
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: false, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: false, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: showsTemplate
          title: 'Shows'
          viewAll: "#{@partner.href()}/shows"
        }
        {
          name: 'fair-booths'
          component: FixedCellsCountCarousel
          options:
            partner: @partner
            collection: new PartnerShows
            fetchOptions: [
              { partner_id: @partner.get('_id'), status: 'current', at_a_fair: true, displayable: true, size: 9, sort: 'start_at' }
              { partner_id: @partner.get('_id'), status: 'closed', at_a_fair: true, displayable: true, size: 9, sort: '-end_at' }
            ]
            template: fairBoothsTemplate
          title: 'Fair Booths'
          viewAll: "#{@partner.href()}/shows"
        }
        { name: 'artists', component: ArtistsGridView, options: partner: @partner }
      ]

  describe 'gallery_default', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full bio here'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_default', claimed: false

    it 'returns modules without artists for fair partners', ->
      factory(@partner, @profile).should.eql [
        {
          name: 'shows'
          component: ShowsGrid
          options:
            partner: @partner
            isCombined: true
            numberOfFeatured: 0
            numberOfShows: 6
            seeAll: false
            heading: 'Shows & Fair Booths'
        }
        { name: 'artists', component: undefined, options: { partner: @partner } }
        { name: 'locations', title: 'Locations', component: LocationsView, options: { partner: @partner } }
      ]

    it 'returns modules properly otherwise', ->
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_default', claimed: true
      factory(@partner, @profile).should.eql [
        {
          name: 'shows'
          component: ShowsGrid
          options:
            partner: @partner
            isCombined: true
            numberOfFeatured: 1
            numberOfShows: 6
            seeAll: true
            heading: undefined
        }
        { name: 'artists', component: ArtistsGridView, options: { partner: @partner } }
        { name: 'locations', title: 'Locations', component: undefined, options: { partner: @partner } }
      ]
