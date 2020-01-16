Backbone = require 'backbone'
sinon = require 'sinon'
Feature = require '../../models/feature'
{ fabricate } = require '@artsy/antigravity'
_ = require 'underscore'

describe 'Feature', ->

  beforeEach ->
    @feature = new Feature fabricate 'feature'
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#hasImage', ->

    it 'returns false if version not there', ->
      @feature.set image_versions: []
      @feature.hasImage('wide').should.not.be.ok()
