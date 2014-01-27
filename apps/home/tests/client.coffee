_               = require 'underscore'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
HeroUnits       = require '../../../collections/hero_units'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

describe 'HeroUnitView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      benv.render '../templates/index.jade', {
        heroUnits: new HeroUnits([
          fabricate 'site_hero_unit'
          fabricate 'site_hero_unit'
          fabricate 'site_hero_unit'
        ]).models
        sd: {}
      }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    HeroUnitView = require '../client/hero_unit_view.coffee'
    @view = new HeroUnitView $body: $('body')

  describe '#setBodyClass', ->

    it 'sets the body class based on the active hero unit', ->
      @view.setBodyClass()
      $('body').attr('class').should.include 'body-transparent-header-white'

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
        sd: {}
      }
      sinon.stub Backbone, 'sync'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    { @init } = mod = benv.requireWithJadeify '../client/index.coffee', [
      'featuredLinksTemplate'
    ]
    mod.__set__ 'HeroUnitView', ->
    @init()

  it 'renders featured links', ->
    Backbone.sync.args[0][2].success [fabricate 'featured_link', title: "Foo At Bar"]
    _.last(Backbone.sync.args)[2].success [fabricate 'featured_link', title: "Foo At Bar"]
    $('body').html().should.include "Foo At Bar"