sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
AvailableRepresentatives = require '../../collections/available_representatives'

describe 'AvailableRepresentatives', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @reps = new AvailableRepresentatives [fabricate 'user']

  afterEach ->
    Backbone.sync.restore()

  describe '@fetchFirstProfile', ->

    it "fetches the first available rep's profile", (done) ->
      AvailableRepresentatives.fetchFirstProfile success: (profile) ->
        profile.get('id').should.equal 'your-kitten-rep'
        done()
      Backbone.sync.args[0][2].success [fabricate 'user']
      Backbone.sync.args[1][2].success fabricate 'profile', id: 'your-kitten-rep'
