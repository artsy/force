_               = require 'underscore'
benv            = require 'benv'
Backbone        = require 'backbone'
sinon           = require 'sinon'
{ resolve }     = require 'path'
{ fabricate }   = require 'antigravity'

{ Layer, Layers, LayeredSearchView } =
  benv.requireWithJadeify resolve(__dirname, '../../client/layered-search'), ['template']

Artwork = require '../../../../models/artwork'
Fair    = require '../../../../models/fair'

describe 'Layers, Layer', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artwork  = new Artwork fabricate 'artwork'
    @layers   = new Layers artwork: @artwork

  afterEach ->
    Backbone.sync.restore()

  describe 'Layers', ->
    it 'should have an artwork', ->
      @layers.artwork.should.equal @artwork

    it 'should fetch the correct URL', ->
      @layers.fetch()
      @layers.url.should.include 'api/v1/related/layers'
      Backbone.sync.args[0][1].artwork.id.should.equal @artwork.id

    it 'should be correctly ordered', ->
      @layers.reset [
        { type: 'synthetic', id: 'for-sale' }
        { type: 'gene', id: 'foobar' }
        { type: 'synthetic', id: 'main' }
        { type: 'gene', id: 'bazqux' }
      ]
      @layers.first().id.should.equal 'main'
      @layers.last().id.should.equal 'for-sale'

  describe 'with fair', ->
    beforeEach ->
      @fair      = new Fair fabricate 'fair'
      @artwork   = new Artwork fabricate 'artwork'
      @layers    = new Layers artwork: @artwork, fair: @fair
      @layers.reset [
        { type: 'synthetic', id: 'for-sale' }
        { type: 'gene', id: 'foobar' }
        { type: 'synthetic', id: 'main' }
        { type: 'fair', id: @fair.id }
        { type: 'gene', id: 'bazqux' }
      ]

    it 'should set up both relationships for the fair', ->
      @layers.fair.id.should.equal @fair.id
      @layers.artwork.id.should.equal @artwork.id

    it 'should be correctly ordered', ->
      @layers.first().id.should.equal @fair.id
      @layers.at(1).id.should.equal 'main'
      @layers.last().id.should.equal 'for-sale'

  describe 'Layer', ->
    beforeEach ->
      layers = _.times 2, ->
        id: _.uniqueId 'layer'
        name: _.uniqueId 'layer'
        type: 'synthetic'
      @layers.reset layers

    it 'should have a collection and subsequently an artwork_id', ->
      @layers.first().collection.length.should.be.ok
      @layers.first().get('artwork_id').should.equal @artwork.id

    it 'should have an artworks collection with the appropriate URL', ->
      layer = @layers.first()
      layer.artworks.url.
        should.include "/api/v1/related/layer/#{layer.get('type')}/#{layer.id}/artworks?artwork[]=#{layer.get('artwork_id')}"

    describe '#label', ->
      it 'should have the appropriate label', ->
        @layers.add(type: 'synthetic', id: 'main').label().should.equal 'synthetic'
        @layers.add(type: 'synthetic', id: 'for-sale').label().should.equal 'for-sale'
        @layers.add(type: 'gene', id: 'foobarable').label().should.equal 'gene'
        @layers.add(type: 'fair', id: 'the-armory-show').label().should.equal 'fair'
        @layers.add(type: 'tag', id: 'boring').label().should.equal 'tag'

    describe '#text', ->
      it 'has the appropriate link text', ->
        @layers.add(type: 'synthetic', id: 'for-sale').text().should.equal 'Go to all for sale works'
        @layers.add(type: 'gene', name: 'Foo Bar').text().should.equal 'Go to “Foo Bar”'

    describe '#href', ->
      it 'has the appropriate href', ->
        @layers.add(type: 'synthetic', id: 'for-sale').href().should.equal '/browse/artworks?price_range=-1%3A1000000000000'
        @layers.add(type: 'gene', id: 'cool').href().should.equal '/gene/cool'
        _.isUndefined(@layers.add(type: 'synthetic', id: 'main').href()).should.be.ok

describe 'LayeredSearchView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'with an artwork', ->
    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      @artwork  = new Artwork fabricate 'artwork'
      @view     = new LayeredSearchView $el: $('<div></div>'), artwork: @artwork
      done()

    afterEach ->
      Backbone.sync.restore()

    describe '#setupLayers', ->
      it 'has the artwork ID', ->
        @view.layers.artwork.id.should.equal @artwork.id
      it 'fetches the layer based on the artwork ID', ->
        Backbone.sync.args[0][1].artwork.id.should.equal @artwork.id

    describe 'rendered view', ->
      beforeEach ->
        @artworks  = _.times 2, -> new Artwork fabricate 'artwork'
        @layers    = _.times 2, -> id: _.uniqueId('layer'), name: _.uniqueId('name')
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

  describe 'with an artwork and a fair', ->
    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      @artwork  = new Artwork fabricate 'artwork'
      @fair     = new Fair fabricate 'fair'
      @view     = new LayeredSearchView $el: $('<div></div>'), artwork: @artwork

      @artworks  = _.times 2, -> new Artwork fabricate 'artwork'
      @layers    = _.times 2, -> id: _.uniqueId('layer'), name: _.uniqueId('name')
      @view.layers.fair = @fair
      @layers.push id: _.uniqueId('layer'), type: 'fair'
      @view.layers.reset @layers
      @view.render()

      done()

    afterEach ->
      Backbone.sync.restore()

    it 'should have the fair as the first tab', ->
      @$buttons = @view.$('.layered-search-layer-button')
      @$buttons.first().text().should.equal "Works from #{@fair.get('name')}"
