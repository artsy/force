_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Fair = require '../../../../../models/fair'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

describe 'BoothsView', ->

  beforeEach (done) ->
    @fair = new Fair fabricate 'fair'
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      $.fn.hidehover = sinon.stub()
      benv.render resolve(__dirname, '../section.jade'), { fair: @fair, sd: {} }, =>
        BoothsView = benv.requireWithJadeify resolve(__dirname, '../view'), ['navSectionsTemplate']
        for klass in ['FilterNav', 'BorderedPulldown', 'ShowsFeed']
          @[klass] = (opts) -> _.extend @, opts
          sinon.spy @, klass
          for method in ['appendArtworks', 'reset', 'remove']
            @[klass].prototype[method] = sinon.stub()
          BoothsView.__set__ klass, @[klass]
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
      @FilterNav.called.should.be.ok()

    it 'navigates when reseting params', ->
      @view.navigateSection = sinon.stub()
      @view.initialize()
      @view.params.trigger 'reset'
      @view.navigateSection.called.should.be.ok()

    it 'sets the default sort to -featured', ->
      @view.params.get('sort').should.equal '-featured'

    it 'renders valid html', ->
      @view.$el.html().should.not.containEql 'undefined'
      @view.$el.html().should.containEql '/the-armory-show/browse/exhibitors'

  describe '#renderSections', ->

    xit 'renders sections in the nav', ->
      @view.renderSections new Backbone.Collection [{
        "section": "FOCUS",
        "artists_count": 4,
        "artworks_count": 7,
        "partner_shows_count": 1
      }]
      @view.$el.html().should.containEql 'FOCUS'

  describe '#renderShows', ->

    it 'adds a feed view', ->
      @view.renderShows new Backbone.Collection [{}]
      @ShowsFeed.calledWithNew().should.be.ok()

    it 'destroys but not removes the last feed view', ->
      @feedView = new Backbone.View
      @feedView.remove = sinon.stub()
      @feedView.destroy = sinon.stub()
      @view.renderShows new Backbone.Collection [{}]
      @feedView.remove.called.should.not.be.ok()
      @feedView.destroy.called.should.not.be.ok()

  describe '#navigateSection', ->

    it 'naviates based on section', ->
      @view.params.set section: 'FOCUS'
      @view.router.navigate.args[0][0].should.containEql 'browse/booths/section/FOCUS'

    it 'naviates to /booths with no sections', ->
      @view.params.unset 'section'
      @view.navigateSection()
      @view.router.navigate.args[0][0].should.match /// browse/booths$ ///

  describe '#navigateSort', ->

    it 'naviates based on sort', ->
      @view.params.set sort: 'foo'
      @view.router.navigate.args[0][0].should.containEql '?sort=foo'

  describe '#sort', ->

    it 'sets sort params', ->
      @view.sort target: $ '<div data-sort="foo">'
      @view.params.get('sort').should.equal 'foo'

  describe '#fetchShows', ->

    it 'ensures there is always artworks: true regardless of params', ->
      @view.params.set artworks: false
      @view.fetchShows()
      _.last(Backbone.sync.args)[2].data.artworks.should.equal true
