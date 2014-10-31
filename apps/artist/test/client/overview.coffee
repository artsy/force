_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist'

describe 'OverviewView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @OverviewView = benv.requireWithJadeify resolve(__dirname, '../../client/views/overview'), ['template', 'jsonLdTemplate']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $.onInfiniteScroll = sinon.stub()
    sinon.stub _, 'defer', (cb) -> cb()
    sinon.stub Backbone, 'sync'
    sinon.stub(Artist::, 'related').returns({
      artists: length: 0
      contemporary: length: 0
      shows: length: 0
      posts: length: 0
    })
    @model = new Artist fabricate 'artist', id: 'foo-bar', published_artworks_count: 1
    filterView = new Backbone.View()
    filterView.artworks = new Backbone.Collection()
    @OverviewView.__set__ 'ArtworkFilter', init: @artworkFilterInitStub = sinon.stub().returns(view: filterView)
    @view = new @OverviewView model: @model

    @view.render()

  afterEach ->
    _.defer.restore()
    Backbone.sync.restore()
    @view.remove()
    @model.related.restore()

  describe '#render', ->
    it 'renders the template', ->
      @view.$('#artwork-section').length.should.equal 1

  describe 'setup', ->
    it 'checks on the correct relations', ->
      @view.model.related.callCount.should.equal 4
      # Way to spy on property access?

  describe 'setupLastModifiedDate', ->
    it 'removes last modified date if there are no posts, shows or artworks', ->
      @view.$('.last-modified-section').length.should.equal 1
      @view.filterView.artworks.trigger 'sync'
      @view.$('.last-modified-section').length.should.equal 0

    it 'displays last modified date if artist has artworks', ->
      @view.$('.last-modified-section').length.should.equal 1
      @view.filterView.artworks.add fabricate('artwork', published_at: '2014-06-17T20:49:00+00:00')
      @view.filterView.artworks.trigger 'sync', new Backbone.Collection(fabricate('artwork', published_at: '2014-06-17T20:49:00+00:00'))
      @view.$('.last-modified-section').length.should.equal 1
      @view.$('.last-modified-section').text().should.containEql 'June'
      $('#json-ld').html().should.containEql "datePublished"
      $('#json-ld').html().should.containEql "2014-06-17"
