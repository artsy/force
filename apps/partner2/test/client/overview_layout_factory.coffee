_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
Artworks = require '../../../../collections/artworks.coffee'
Profile = require '../../../../models/profile.coffee'
Partner = require '../../../../models/partner.coffee'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

factory = rewire '../../client/overview_layout_factory.coffee'
factory.__set__ 'HeroShowsCarousel', HeroShowsCarousel = sinon.stub()
factory.__set__ 'HeroArtworksCarousel', HeroArtworksCarousel = sinon.stub()
factory.__set__ 'ArtistsListView', ArtistsListView = sinon.stub()
factory.__set__ 'ArtistsGridView', ArtistsGridView = sinon.stub()
factory.__set__ 'aboutTemplate', aboutTemplate = sinon.stub().returns '<article></article>'
factory.__set__ 'NewsView', NewsView = sinon.stub()

describe 'overview_layout_factory', ->
  describe 'gallery_three', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full_bil'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_three'

    it 'returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', ->
      @partner.set profile_banner_display: 'Shows'
      @partner.set profile_artists_layout: 'Grid'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 10 } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        { name: 'artists', component: ArtistsGridView, options: { partner: @partner }, title: undefined, viewAll: undefined }
      ]

    it 'returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', ->
      @partner.set profile_banner_display: 'Artworks'
      @partner.set profile_artists_layout: 'List'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroArtworksCarousel, options: { partner: @partner } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        { name: 'artists', component: ArtistsListView, options: { partner: @partner }, title: 'Artists', viewAll: "#{@partner.href()}/artists" }
      ]

  describe 'gallery_two', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full bio here'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_two'

    it 'returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', ->
      @partner.set profile_banner_display: 'Shows'
      @partner.set profile_artists_layout: 'Grid'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 10 } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        { name: 'artists', component: ArtistsGridView, options: { partner: @partner }, title: undefined, viewAll: undefined }
      ]

    it 'returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', ->
      @partner.set profile_banner_display: 'Artworks'
      @partner.set profile_artists_layout: 'List'
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroArtworksCarousel, options: { partner: @partner } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'news', component: NewsView, options: { partner: @partner }, title: 'News' }
        { name: 'artists', component: ArtistsListView, options: { partner: @partner }, title: 'Artists', viewAll: "#{@partner.href()}/artists" }
      ]

  describe 'gallery_one', ->
    beforeEach ->
      @profile = new Profile fabricate 'partner_profile', full_bio: 'full bio here'
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_one'

    it 'returns modules properly', ->
      factory(@partner, @profile).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 1 } }
        { name: 'about', template: '<article></article>', title: 'About' }
        { name: 'artists', component: ArtistsGridView, options: partner: @partner }
      ]
