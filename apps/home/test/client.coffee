_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
HeroUnits = require '../../../collections/hero_units'
FeaturedLinks = require '../../../collections/featured_links'
CurrentUser = require '../../../models/current_user'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

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
    sinon.stub Backbone, 'sync'
    @view = new HeroUnitView el: $('body')

  afterEach ->
    Backbone.sync.restore()

  describe '#setBodyClass', ->

    it 'sets the body class based on the active hero unit', ->
      @view.setBodyClass()
      $('body').attr('class').should.containEql 'body-transparent-header-white'

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
      }, ->
        Backbone.$ = $
        done()

  after ->
    benv.teardown()

  beforeEach ->
    { @init } = @mod = benv.requireWithJadeify resolve(__dirname, '../client/index.coffee'), [
      'featuredLinksTemplate'
      'featuredArtworksTemplate'
      'featuredShowsTemplate'
      'featuredPostsTemplate'
      'featuredArtistsTemplate'
    ]
    @mod.__set__ 'HeroUnitView', ->
    sinon.stub Backbone.history, 'start'
    sinon.stub Backbone, 'sync'
    @init()

  afterEach ->
    Backbone.sync.restore()
    Backbone.history.start.restore()

  context 'with a user', ->

    beforeEach (done) ->
      user = new CurrentUser(fabricate 'user', lab_features: ["Suggested Artworks"])
      sinon.stub(user, 'hasSuggestions').returns true
      CurrentUser = @mod.__get__ 'CurrentUser'
      sinon.stub(CurrentUser, 'orNull').returns user
      benv.render resolve(__dirname, '../templates/index.jade'), {
          heroUnits: new HeroUnits([
            fabricate 'site_hero_unit'
            fabricate 'site_hero_unit'
            fabricate 'site_hero_unit'
          ]).models
          featuredLinks: new FeaturedLinks([
            fabricate 'featured_link'
          ]).models

          user: user
          sd: {}
        }, =>
          @init()
          done()

    afterEach ->
      CurrentUser.orNull.restore()

    it 'renders suggested artworks', ->
      Backbone.sync.args[4][2].success [fabricate('artwork', title: 'Foobaz')]
      $('body').html().should.containEql "Foobaz"

  it 'renders featured artworks', ->
    Backbone.sync.args[0][2].success [fabricate 'set']
    _.last(Backbone.sync.args)[2].success [fabricate 'artwork', title: "Foo At Bar"]
    $('body').html().should.containEql "Foo At Bar"

  it 'renders featured show', ->
    Backbone.sync.args[1][2].success [fabricate 'set']
    _.last(Backbone.sync.args)[2].success [fabricate 'show', name: "Fooshow At Bar"]
    $('body').html().should.containEql "Fooshow At Bar"

  it 'renders featured posts', ->
    Backbone.sync.args[2][2].success [fabricate 'set']
    _.last(Backbone.sync.args)[2].success [fabricate 'post', title: "Retrospect on Andy Foobar"]
    $('body').html().should.containEql "Retrospect on Andy Foobar"

  it 'renders links', ->
    Backbone.sync.args[2][2].success [fabricate 'set']
    _.last(Backbone.sync.args)[2].success [fabricate 'post', title: "Retrospect on Andy Foobar"]
    $('.home-featured-post-link').first().html().should.containEql '<a>'

  xit 'renders featured artists'

  it 'does not open the signup modal if passed a query param', ->
    mediator = @mod.__get__ 'mediator'
    mediator.on 'open:auth', spy = sinon.spy()
    location.search = '?no-auth-modal=true'
    @init()
    spy.called.should.not.be.ok

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

  it 'shows an error message if coming from a bad facebook/twitter', ->
    location.search = '?error=already-signed-up'
    @router.login()
    @mediator.trigger.args[1][0].should.equal 'auth:error'
