_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Fair = require '../../../../../models/fair'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

describe 'FairBrowseView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../template.jade'), {}, =>
        FairBrowseView = benv.require resolve(__dirname, '../view')
        for klass in ['BoothsView', 'FilterArtworksView']
          @[klass] = (opts) -> _.extend @, opts
          @[klass]::params = new Backbone.Model
          sinon.spy @, klass
          FairBrowseView.__set__ klass, @[klass]
        @fair = new Fair fabricate 'fair'
        @fair.url = -> 'fair/foo'
        @view = new FairBrowseView
          el: $('body')
          fair: @fair
          profile: new Backbone.Model
          router: @router = navigate: sinon.stub()
        done()

  afterEach ->
    Backbone.sync.restore()
    benv.teardown()

  describe 'initialize', ->

    it 'sets up filter artwork and filter booths views', ->
      @FilterArtworksView.calledWithNew.should.be.ok
      @BoothsView.calledWithNew.should.be.ok

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
      @router.args[0][0].should.include '/browse/artists'

  describe '#exhibitorsAZ', ->

    xit 'navigates to the az url', ->
      @view.exhibitorsAZ()
      @router.args[0][0].should.include '/browse/exhibitors'