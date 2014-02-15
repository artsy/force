_               = require 'underscore'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

{ Layer, Layers, LayeredSearchView } =
  benv.requireWithJadeify resolve(__dirname, '../../client/layered-search'), ['template']

Artwork = require '../../../../models/artwork'

describe 'Layers, Layer', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artworkId  = 'foobar'
    @layers     = new Layers artworkId: @artworkId

  afterEach ->
    Backbone.sync.restore()

  describe 'Layers', ->
    it 'should have an artworkId', ->
      @layers.artworkId.should.equal @artworkId

    it 'should fetch the correct URL', ->
      @layers.fetch()
      @layers.url.should.include 'api/v1/related/layers'
      Backbone.sync.args[0][1].artworkId.should.equal @artworkId

  describe 'Layer', ->
    beforeEach ->
      layers = _.times 2, ->
        id: _.uniqueId 'layer'
        name: _.uniqueId 'layer'
        type: 'main'
      @layers.reset layers

    it 'should have a collection and subsequently an artworkId', ->
      @layers.first().collection.length.should.be.ok
      @layers.first().artworkId.should.equal @artworkId

    it 'should have an artworks collection with the appropriate URL', ->
      layer = @layers.first()
      layer.artworks.url.
        should.include "/api/v1/related/layer/#{layer.get('type')}/#{layer.id}/artworks?artwork[]=#{layer.artworkId}"

describe 'LayeredSearchView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub Backbone, 'sync'
    @artwork = new Artwork fabricate 'artwork'
    @view = new LayeredSearchView $el: $('<div></div>'), artwork: @artwork
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#setupLayers', ->
    it 'has the artwork ID', ->
      @view.layers.artworkId.should.equal @artwork.id
    it 'fetches the layer based on the artwork ID', ->
      Backbone.sync.args[0][1].artworkId.should.equal @artwork.id

  describe 'rendered view', ->
    beforeEach ->
      @artworks  = _.times 2, -> new Artwork fabricate 'artwork'
      @layers    = _.times 2, -> id: _.uniqueId('layer'), name: _.uniqueId('layer')
      @view.layers.reset @layers
      @view.render()

    describe '#render', ->
      it 'has buttons for each layer', ->
        @view.$('.layered-search-layer-button').length.should.equal @layers.length

    describe '#postRender', ->
      it 'activates the first tab', ->
        buttons = @view.$('.layered-search-layer-button')
        buttons.first().data('state').should.equal 'active'
        buttons.last().data('state').should.equal 'inactive'

    describe '#selectLayer', ->
      beforeEach ->
        @$buttons = @view.$('.layered-search-layer-button')
        @$target  = @$buttons.last()
        @$target.click()
      it 'should activate the correct layer', ->
        id = @$target.data 'id'
        @view.__activeLayer__.id.should.equal id
        @view.activeLayer().id.should.equal id
      it 'should activate the button and deactivate the others', ->
        @$target.data('state').should.equal 'active'
        @$buttons.not(@$target).data('state').should.equal 'inactive'
      it 'should have a spinner', ->
        @view.$layeredSearchResults.html().should.include 'loading-spinner'
