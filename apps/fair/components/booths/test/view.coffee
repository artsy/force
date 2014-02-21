_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Fair = require '../../../../../models/fair'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'BoothsView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      $.fn.hidehover = sinon.stub()
      benv.render resolve(__dirname, '../../../templates/browse.jade'), {}, =>
        BoothsView = benv.requireWithJadeify resolve(__dirname, '../view'), ['navSectionsTemplate']
        for klass in ['FilterNav', 'BorderedPulldown', 'FeedView']
          @[klass] = (opts) -> _.extend @, opts
          sinon.spy @, klass
          for method in ['appendArtworks', 'reset', 'remove']
            @[klass].prototype[method] = sinon.stub()
          BoothsView.__set__ klass, @[klass]
        @fair = new Fair fabricate 'fair'
        @fair.url = -> 'fair/foo'
        @view = new BoothsView
          el: $('body')
          params: new Backbone.Model
          fair: @fair
          profile: new Backbone.Model
          router: new Backbone.Router
        sinon.spy @view.router, 'navigate'
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe 'initialize', ->

    it 'creates a filter nav view', ->
      @view.initialize({})
      @FilterNav.called.should.be.ok

  describe '#renderSections', ->

    it 'renders sections in the nav', ->
      @view.renderSections new Backbone.Collection [{
        "section": "FOCUS",
        "artists_count": 4,
        "artworks_count": 7,
        "partner_shows_count": 1
      }]
      @view.$el.html().should.include 'FOCUS'

  describe '#renderHeader', ->

    it 'renders the header', ->
      @view.params.set section: 'FOCUS'
      @view.renderHeader()
      @view.$el.html().should.include 'Exhibitors at FOCUS'

  describe '#renderShows', ->

    it 'adds a feed view', ->
      @view.renderShows new Backbone.Collection [{}]
      @FeedView.calledWithNew().should.be.ok

  describe '#navigateSection', ->

    it 'naviates based on section', ->
      @view.params.set section: 'FOCUS'
      @view.router.navigate.args[0][0].should.include 'browse/booths/section/FOCUS'

  describe '#navigateSort', ->

    it 'naviates based on sort', ->
      @view.params.set sort: 'foo'
      @view.router.navigate.args[0][0].should.include '?sort=foo'

  describe '#sort', ->

    it 'sets sort params', ->
      @view.sort target: $ '<div data-sort="foo">'
      @view.params.get('sort').should.equal 'foo'
