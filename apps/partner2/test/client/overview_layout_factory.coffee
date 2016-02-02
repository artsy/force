_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
Artworks = require '../../../../collections/artworks.coffee'
Partner = require '../../../../models/partner.coffee'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

factory = rewire '../../client/overview_layout_factory.coffee'
factory.__set__ 'HeroShowsCarousel', HeroShowsCarousel = sinon.stub()
factory.__set__ 'HeroArtworksCarousel', HeroArtworksCarousel = sinon.stub()
factory.__set__ 'ArtistsListView', ArtistsListView = sinon.stub()
factory.__set__ 'ArtistsGridView', ArtistsGridView = sinon.stub()

describe 'overview_layout_factory', ->
  describe 'gallery_three', ->
    beforeEach ->
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_three'

    it 'returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', ->
      @partner.set profile_banner_display: 'Shows'
      @partner.set profile_artists_layout: 'Grid'
      factory(@partner).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 10 } }
        { name: 'artists', component: ArtistsGridView, options: { partner: @partner }, title: undefined, viewAll: undefined }
      ]

    it 'returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', ->
      @partner.set profile_banner_display: 'Artworks'
      @partner.set profile_artists_layout: 'List'
      factory(@partner).should.eql [
        { name: 'hero', component: HeroArtworksCarousel, options: { partner: @partner } }
        { name: 'artists', component: ArtistsListView, options: { partner: @partner }, title: 'Artists', viewAll: "#{@partner.href()}/artists" }
      ]

  describe 'gallery_two', ->
    beforeEach ->
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_two'

    it 'returns modules properly for profile_banner_display: "Shows", profile_artists_layout: "Grid"', ->
      @partner.set profile_banner_display: 'Shows'
      @partner.set profile_artists_layout: 'Grid'
      factory(@partner).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 10 } }
        { name: 'artists', component: ArtistsGridView, options: { partner: @partner }, title: undefined, viewAll: undefined }
      ]

    it 'returns modules properly for profile_banner_display: "Artworks", profile_artists_layout: "List"', ->
      @partner.set profile_banner_display: 'Artworks'
      @partner.set profile_artists_layout: 'List'
      factory(@partner).should.eql [
        { name: 'hero', component: HeroArtworksCarousel, options: { partner: @partner } }
        { name: 'artists', component: ArtistsListView, options: { partner: @partner }, title: 'Artists', viewAll: "#{@partner.href()}/artists" }
      ]

  describe 'gallery_one', ->
    beforeEach ->
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_one'

    it 'returns modules properly', ->
      factory(@partner).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 1 } }
        { name: 'artists', component: ArtistsGridView, options: partner: @partner }
      ]

