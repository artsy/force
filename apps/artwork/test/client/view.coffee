_               = require 'underscore'
rewire          = require 'rewire'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

Artist    = require '../../../../models/artist'
Artwork   = require '../../../../models/artwork'

describe 'ArtworkView', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.support.transition = { end: 'transitionend' }
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @artist = new Artist(fabricate 'artist')
    @artwork = new Artwork(fabricate 'artwork')

    sinon.stub Backbone, 'sync'
    benv.render resolve(__dirname, '../../templates/index.jade'), {
      sd: {}
      artist: @artist
      artwork: @artwork
    }, =>
      ArtworkView = rewire '../../client/view'
      ArtworkView.__set__ 'ShareView', (@shareViewStub = sinon.stub())

      @view = new ArtworkView el: $('#artwork-page'), artist: @artist, artwork: @artwork
      done()

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'has an artist and an artwork', ->
      @view.artwork.id.should.equal @artwork.id
      @view.artist.id.should.equal @artist.id

  describe '#openShare', ->
    it 'opens the share view when the share button is clicked', ->
      @view.$('.circle-icon-button-share').click()
      @shareViewStub.args[0][0].artwork.id.should.equal @artwork.id
      @shareViewStub.args[0][0].width.should.equal '350px'

  describe '#route', ->
    it 'transitions the state of the el with data attributes', ->
      @view.$el.attr('data-route').should.equal 'show'
      @view.route('more-info')
      @view.$el.attr('data-route-pending').should.equal 'more-info'
      @view.$el.attr('data-route').should.equal 'more-info'


