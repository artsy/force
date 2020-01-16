_ = require 'underscore'
_s = require 'underscore.string'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Fair = require '../../../../../models/fair'
Profile = require '../../../../../models/profile'
{ resolve } = require 'path'
{ fabricate, fabricate2 } = require '@artsy/antigravity'
FilterArtworks = require '../../../../../collections/filter_artworks'

describe 'FairBrowseView', ->

  beforeEach (done) ->
    @fair = new Fair fabricate 'fair'
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      collection = new FilterArtworks fabricate2('filter_artworks'), parse: true
      $.onInfiniteScroll = sinon.stub()
      benv.render resolve(__dirname, '../template.jade'), { fair: @fair, sd: {}, _: _, counts: collection.counts, params: new Backbone.Model, _s: _s, filterLabelMap: require '../../../../../components/filter2/dropdown/label_map.coffee' }, =>
        FairBrowseView = benv.require resolve(__dirname, '../view')
        for klass in ['BoothsView']
          @[klass] = (opts) -> _.extend @, opts
          @[klass]::params = new Backbone.Model
          @[klass]::counts = new Backbone.Model
          sinon.spy @, klass
          FairBrowseView.__set__ klass, @[klass]
        @fair.url = -> 'fair/foo'
        FairBrowseView::setupArtworkView = ->
        FairBrowseView::artworkParams = new Backbone.Model
        @view = new FairBrowseView
          el: $('body')
          fair: @fair
          profile: new Profile(fabricate 'fair_profile')
          router: @router = navigate: sinon.stub()
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe 'initialize', ->

    it 'sets up filter artwork and filter booths views', ->
      @BoothsView.calledWithNew.should.be.ok()

    it 'binds section changes to reset', ->
      @view.boothsSection = sinon.stub()
      @view.artworksSection = sinon.stub()
      @view.initialize()
      @view.boothParams.trigger 'change reset'
      @view.boothsSection.callCount.should.equal 2
      @view.artworkParams.trigger 'change reset'
      @view.artworksSection.callCount.should.equal 2

  describe '#boothsSection', ->

    it 'sets the section to booths', ->
      @view.boothsSection()
      @view.$el.attr('data-section').should.equal 'booths'

  describe '#artworksSection', ->

    it 'sets the section to artworks', ->
      @view.artworksSection()
      @view.$el.attr('data-section').should.equal 'artworks'

  describe '#highlightHome', ->

    it 'highlights the home link if in browse'

  describe '#artistsAZ', ->

    xit 'navigates to the az url', ->
      @view.artistsAZ()
      @router.args[0][0].should.containEql '/browse/artists'

  describe '#exhibitorsAZ', ->

    xit 'navigates to the az url', ->
      @view.exhibitorsAZ()
      @router.args[0][0].should.containEql '/browse/exhibitors'

  describe '#exhibitorsGrid', ->

    it 'triggers param reset to show all exhibitors', ->
      @view.boothParams.on 'reset', spy = sinon.spy()
      @view.exhibitorsGrid()
      spy.called.should.be.ok()

  describe '#renderArtworksHeader', ->

    it 'renders the gene name title and capitalized without trailing numbers', ->
      @view.artworkParams.set related_gene: 'contemporary-abstract-photography-1'
      @view.$el.html().should.containEql 'Contemporary abstract photography'
      @view.artworkParams.set related_gene: '20th-century-design'
      @view.$el.html().should.containEql '20th century design'
