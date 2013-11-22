sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Artworks = require '../../collections/artworks'

describe 'Artworks', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @artworks = new Artworks [fabricate 'artwork']

  afterEach ->
    Backbone.sync.restore()

  describe '#fillwidthDimensions', ->

    it 'maps the artworks into a dimensions array for fillwidth', ->
      @artworks.reset [fabricate 'artwork', images: [{
        original_width: 100
        original_height: 200
        aspect_ratio: 0.7
      }]]
      @artworks.fillwidthDimensions(260)[0].width.should.equal 182
      @artworks.fillwidthDimensions(260)[0].height.should.equal 260