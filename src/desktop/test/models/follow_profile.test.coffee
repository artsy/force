_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
sd = require('sharify').data
should = require 'should'
Backbone = require 'backbone'
Profile = require '../../models/profile'
FollowProfile = require '../../models/follow_profile'

describe 'FollowProfile', ->

  before ->
    @sd =
      API_URL: 'http://localhost:5000'

  describe '#url', ->

    it 'returns a URL with an id if the model has one', ->
      @followProfile = new FollowProfile id: '111', profile: fabricate('profile')
      @followProfile.url().should.equal "#{sd.API_URL}/api/v1/me/follow/profile/#{@followProfile.get('id')}"

    it 'returns a URL with no id for new models', ->
      @followProfile = new FollowProfile()
      @followProfile.url().should.equal "#{sd.API_URL}/api/v1/me/follow/profile"
