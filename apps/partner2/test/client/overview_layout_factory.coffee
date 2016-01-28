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

describe 'overview_layout_factory', ->
  describe 'gallery_three', ->
    beforeEach ->
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_three'

    it 'returns modules properly when profile_banner_display set to "Shows"', ->
      @partner.set profile_banner_display: 'Shows'
      factory(@partner).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 10 } }
      ]

    it 'returns modules properly when profile_banner_display set to "Artworks"', ->
      @partner.set profile_banner_display: 'Artworks'
      factory(@partner).should.eql [
        { name: 'hero', component: HeroArtworksCarousel, options: { partner: @partner } }
      ]

  describe 'gallery_two', ->
    beforeEach ->
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_two'

    it 'returns modules properly when profile_banner_display set to "Shows"', ->
      @partner.set profile_banner_display: 'Shows'
      factory(@partner).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 10 } }
      ]

    it 'returns modules properly when profile_banner_display set to "Artworks"', ->
      @partner.set profile_banner_display: 'Artworks'
      factory(@partner).should.eql [
        { name: 'hero', component: HeroArtworksCarousel, options: { partner: @partner } }
      ]

  describe 'gallery_one', ->
    beforeEach ->
      @partner = new Partner fabricate 'partner', profile_layout: 'gallery_one'

    it 'returns modules properly', ->
      factory(@partner).should.eql [
        { name: 'hero', component: HeroShowsCarousel, options: { partner: @partner, maxNumberOfShows: 1 } }
      ]

