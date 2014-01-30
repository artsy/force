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
      sinon.stub _, 'defer'
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()
    benv.teardown()

  beforeEach ->
    HeroUnitView = require '../client/hero_unit_view.coffee'
    sinon.stub Backbone, 'sync'
    @view = new HeroUnitView el: $('body')

  afterEach ->
    Backbone.sync.restore()

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
      sinon.stub _, 'defer'
      Backbone.$ = $
      done()

  after ->
    _.defer.restore()
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
    sinon.stub Backbone, 'sync'
    @init()

  afterEach ->
    Backbone.sync.restore()

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

describe 'HomeAuthRouter', ->

  before (done) ->
    benv.setup => done()

  after ->
    benv.teardown()

  beforeEach ->
    HomeAuthRouter = benv.require resolve __dirname, '../client/auth_router.coffee'
    HomeAuthRouter.__set__ 'mediator', @mediator = { trigger: sinon.stub() }
    @router = new HomeAuthRouter

  it 'on login opens the login modal', ->
    @router.login()
    @mediator.trigger.args[0][0].should.equal 'open:auth'
    @mediator.trigger.args[0][1].mode.should.equal 'login'

  it 'on signup opens the signup modal', ->
    @router.signup()
    @mediator.trigger.args[0][0].should.equal 'open:auth'
    @mediator.trigger.args[0][1].mode.should.equal 'register'

  it 'on forgot opens the forgot modal', ->
    @router.forgot()
    @mediator.trigger.args[0][0].should.equal 'open:auth'
    @mediator.trigger.args[0][1].mode.should.equal 'forgot'