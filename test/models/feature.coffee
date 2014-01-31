_             = require 'underscore'
sinon         = require 'sinon'
Backbone      = require 'backbone'
Feature       = require '../../models/feature.coffee'
{ fabricate } = require 'antigravity'

describe 'Feature', ->

  beforeEach ->
    @feature = new Feature fabricate 'feature'
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#hasImage', ->

    it 'returns false if version not there', ->
      @feature.set image_versions: []
      @feature.hasImage('wide').should.not.be.ok

  describe '#fetchSets', ->

    it 'collects the sets and items', (done) ->
      @feature.fetchSets success: (sets) ->
        sets[0].get('type').should.equal 'featured links'
        sets[0].get('name').should.equal 'Explore this bidness'
        sets[0].get('data').first().get('title').should.equal 'Featured link for this awesome page'
        done()
      _.last(Backbone.sync.args)[2].success([fabricate 'set', name: 'Explore this bidness'])
      _.last(Backbone.sync.args)[2].success([
        fabricate 'featured_link', title: 'Featured link for this awesome page'
      ])
