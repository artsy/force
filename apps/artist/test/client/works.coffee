_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Artist = require '../../../../models/artist'

describe 'WorksView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @WorksView = benv.requireWithJadeify resolve(__dirname, '../../client/views/works'), ['template']
      @model = new Artist fabricate 'artist', id: 'foo-bar', published_artworks_count: 1
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $.onInfiniteScroll = sinon.stub()
    sinon.stub _, 'defer', (cb) -> cb()
    sinon.stub Backbone, 'sync'
    @WorksView.__set__ 'ArtworkFilter', init: @artworkFilterInitStub = sinon.stub().returns(view: new Backbone.View)
    @view = new @WorksView model: @model

  afterEach ->
    _.defer.restore()
    Backbone.sync.restore()
    @view.remove()

  describe '#render', ->
    it 'renders the template', ->
      @view.render()
      @view.$('#artwork-section').length.should.equal 1

  describe '#postRender', ->
    it 'sets up artwork filter in infinite mode', ->
      @view.render()
      @artworkFilterInitStub.args[0][0].mode.should.equal 'infinite'
