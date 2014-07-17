_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'

Artworks = require '../../../../collections/artworks'
Artwork = require '../../../../models/artwork'

describe 'RelatedShowView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'

    RelatedShowView = benv.requireWithJadeify resolve(__dirname, '../../client/related-show'), ['template']
    RelatedShowView.__set__ 'ArtworkColumnsView', Backbone.View

    @artwork = new Artwork fabricate 'artwork'
    @view = new RelatedShowView artwork: @artwork, model: new Backbone.Model(fabricate 'show')

    @view.setup new Artworks([
      @artwork
      fabricate 'artwork'
      fabricate 'artwork'
    ])

    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#setup', ->
    it 'ensures the current artwork is not present in the rendered collection', ->
      @view.collection.length.should.equal 2
      _.contains(@view.collection.pluck 'id', @artwork.id).should.not.be.ok
    it 'fades in the el', ->
      @view.$el.hasClass('is-fade-in').should.be.ok

  describe '#render', ->
    it 'ensures the el is visible', ->
      @view.$el.is(':visible').should.be.ok

    it 'renders the partner metadata and artworks shell', ->
      html = @view.$el.html()
      html.should.include 'Other works in show'
      html.should.include @view.show.get('partner').name
      @view.$('#artwork-related-show-artworks').length.should.be.ok
