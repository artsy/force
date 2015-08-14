sinon = require 'sinon'
Backbone = require 'backbone'
CollectorProfile = require '../../models/collector_profile'

describe 'CollectorProfile', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @collectorProfile = new CollectorProfile

  afterEach ->
    Backbone.sync.restore()

  describe '#findOrCreate', ->
    it 'PUTs', ->
      @collectorProfile.findOrCreate()
      Backbone.sync.args[0][0].should.equal 'update'

  describe '#isCollector', ->
    it 'returns false if the collector level is blank', ->
      @collectorProfile.unset 'collector_level'
      @collectorProfile.isCollector().should.be.false()

    it 'returns false if the collector level below 3', ->
      @collectorProfile.set 'collector_level', 2
      @collectorProfile.isCollector().should.be.false()

    it 'returns true if the collector level is 3', ->
      @collectorProfile.set 'collector_level', 3
      @collectorProfile.isCollector().should.be.true()

    it 'returns true if the collector level above 3', ->
      @collectorProfile.set 'collector_level', 4
      @collectorProfile.isCollector().should.be.true()
