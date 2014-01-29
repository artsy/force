_               = require 'underscore'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
HeroUnits       = require '../../../collections/hero_units'
FeaturedLinks   = require '../../../collections/featured_links'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

describe 'HeroUnitView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      benv.render resolve(__dirname, '../templates/index.jade'), {
        heroUnits: new HeroUnits([
          fabricate 'site_hero_unit'
          fabricate 'site_hero_unit'
          fabricate 'site_hero_unit'
        ]).models
        featuredLinks: new FeaturedLinks([
          fabricate 'featured_link'
        ]).models
        sd: {}
      }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    HeroUnitView = require '../client/hero_unit_view.coffee'
    @view = new HeroUnitView el: $('body')

  describe '#setBodyClass', ->

    it 'sets the body class based on the active hero unit', ->
      @view.setBodyClass()
      $('body').attr('class').should.include 'body-transparent-header-white'

    it 'toggles the body class if you scroll past the hero unit'

  describe '#nextHeroUnit', ->

    it 'activates the next hero unit', ->
      @view.$('.home-hero-unit').first().addClass('home-hero-unit-active')
      @view.nextHeroUnit()
      @view.$('.home-hero-unit.home-hero-unit-active').index().should.equal 1

  describe '#showHeroUnit', ->

    it 'activates the hero unit by index', ->
      @view.showHeroUnit 2
      @view.$('.home-hero-unit.home-hero-unit-active').index().should.equal 2


describe 'Homepage init code', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      benv.render '../templates/index.jade', {
        heroUnits: new HeroUnits([
          fabricate 'site_hero_unit'
          fabricate 'site_hero_unit'
          fabricate 'site_hero_unit'
        ]).models
        featuredLinks: new FeaturedLinks([
          fabricate 'featured_link'
        ]).models
        sd: {}
      }
      sinon.stub Backbone, 'sync'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    { @init } = mod = benv.requireWithJadeify resolve(__dirname, '../client/index.coffee'), [
      'featuredLinksTemplate'
      'featuredArtworksTemplate'
      'featuredShowsTemplate'
      'featuredPostsTemplate'
      'featuredArtistsTemplate'
      'artworkItemTemplate'
    ]
    mod.__set__ 'HeroUnitView', ->
    @init()

  it 'renders featured artworks', ->
    Backbone.sync.args[0][2].success [fabricate 'set']
    _.last(Backbone.sync.args)[2].success [fabricate 'artwork', title: "Foo At Bar"]
    $('body').html().should.include "Foo At Bar"

  it 'renders featured show', ->
    Backbone.sync.args[1][2].success [fabricate 'set']
    _.last(Backbone.sync.args)[2].success [fabricate 'show', name: "Fooshow At Bar"]
    $('body').html().should.include "Fooshow At Bar"

  it 'renders featured posts', ->
    Backbone.sync.args[2][2].success [fabricate 'set']
    _.last(Backbone.sync.args)[2].success [fabricate 'post', title: "Retrospect on Andy Foobar"]
    $('body').html().should.include "Retrospect on Andy Foobar"

  it 'renders featured artists'