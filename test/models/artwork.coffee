sinon = require 'sinon'
Backbone = require 'backbone'
Artwork = require '../../models/artwork'
{ fabricate } = require 'antigravity'

describe 'Artwork', ->
  
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artwork = new Artwork fabricate 'artwork'
  
  afterEach ->
    Backbone.sync.restore()
  
  describe '#defaultImageUrl', ->
  
    it 'returns the first medium image url by default', ->
      @artwork.defaultImageUrl().should.match(
        /// /local/additional_images/.*/medium.jpg ///
      )
    
    it 'works if there are no images', ->
      @artwork.set images: []
      @artwork.defaultImageUrl().should.equal ''