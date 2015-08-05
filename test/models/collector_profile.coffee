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
