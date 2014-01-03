_             = require 'underscore'
{ fabricate } = require 'antigravity'
sd            = require('sharify').data
should        = require 'should'
Backbone      = require 'backbone'
Partner       = require '../../models/partner'
Profile       = require '../../models/profile'

describe 'Profile', ->

  before ->
    @sd =
      ARTSY_URL : 'http://localhost:5000'
      ASSET_PATH: 'http://localhost:5000'
    @profile = new Profile(fabricate('featured_partners_profiles',
      owner:
        type: "Museum"
        sortable_id: "getty-museum"
        name: "J. Paul Getty Museum"
        default_profile_id: "getty"
    ))

  describe '#alphaSortKey', ->

    it "returns the profile owner's display name", ->
      @profile.alphaSortKey().should.equal @profile.displayName()

  describe '#href', ->

    it "returns the client link to this profile", ->
      @profile.href().should.equal "#{sd.ARTSY_URL}/#{@profile.get('id')}"

  describe '#displayName', ->

    it "returns the profile owner's display name", ->
      @profile.displayName().should.equal @profile.get('owner').name
