_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Items = require '../../../collections/items'
HeroUnits = require '../../../collections/hero_units'
CurrentUser = require '../../../models/current_user'

describe 'HeroUnitView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'

      featuredLinks = exploreSections = featuredArtists = featuredPosts =
        new Items [fabricate 'featured_link'], item_type: 'FeaturedLink'
      featuredShows = new Items [fabricate 'partner_show'], item_type: 'PartnerShow'

      benv.render resolve(__dirname, '../templates/index.jade'), {
        heroUnits: new HeroUnits _.times 3, -> fabricate 'site_hero_unit'
        featuredLinks: featuredLinks
        exploreSections: exploreSections
        featuredArtists: featuredArtists
        featuredPosts: featuredPosts
        featuredShows: featuredShows
        exploreSections: []
        sd: {}
        asset: (->)
      }
      Backbone.$ = $
      $.fn.imagesLoaded = ->
      done()

  after ->
    benv.teardown()

  beforeEach ->
    HeroUnitView = require '../client/hero_unit_view.coffee'
    sinon.stub Backbone, 'sync'
    @view = new HeroUnitView el: $('body')

  afterEach ->
    Backbone.sync.restore()

  describe '#setRetinaHeroTitles', ->

    it 'swaps in the retina images', ->
      @view.setRetinaHeroTitles()
      @view.$('.hhu-title').first().attr('src').should.containEql '2x'

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
      benv.expose $: benv.require 'jquery'

      featuredLinks = exploreSections = featuredArtists = featuredPosts =
        new Items [fabricate 'featured_link'], item_type: 'FeaturedLink'
      featuredShows = new Items [fabricate 'partner_show'], item_type: 'PartnerShow'

      benv.render resolve(__dirname, '../templates/index.jade'), {
        heroUnits: new HeroUnits _.times 3, -> fabricate 'site_hero_unit'
        featuredLinks: featuredLinks
        exploreSections: exploreSections
        featuredArtists: featuredArtists
        featuredPosts: featuredPosts
        featuredShows: featuredShows
        exploreSections: []
        sd: {}
        asset: (->)
      }, ->
        Backbone.$ = $
        done()

  after ->
    benv.teardown()

  beforeEach ->
    { @init, @HomeView } = @mod = benv.requireWithJadeify resolve(__dirname, '../client/index.coffee'), []
    global.sd = {}
    @mod.__set__ 'HeroUnitView', ->
    sinon.stub Backbone.history, 'start'
    sinon.stub Backbone, 'sync'
    sinon.stub @HomeView::, 'renderArtworks'
    @init()

  afterEach ->
    global.sd = undefined
    Backbone.sync.restore()
    Backbone.history.start.restore()
    @HomeView::renderArtworks.restore()

  it 'renders featured artists'

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
