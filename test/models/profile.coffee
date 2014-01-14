_             = require 'underscore'
{ fabricate } = require 'antigravity'
sd            = require('sharify').data
should        = require 'should'
Backbone      = require 'backbone'
Partner       = require '../../models/partner'
Profile       = require '../../models/profile'

describe 'Profile', ->

  beforeEach ->
    @profile = new Profile(fabricate('featured_partners_profiles',
      owner:
        type: "Museum"
        sortable_id: "getty-museum"
        name: "J. Paul Getty Museum"
        default_profile_id: "getty"
      icon:
        id: "51eefb79275b2420810001fe",
        image_filename: "GGLogo1.jpg",
        image_url: "http://static2.artsy.net/profile_icons/51eefb79275b2420810001fe/:version.jpg",
        versions: [ "circle", "square" ]
        x: 0
        y: 0
        width: 140
    ))

  describe '#iconImageUrl', ->

    it "returns the icon url for the model's default icon version", ->
      @profile.iconImageUrl().should.include "circle"
      @profile.set 'default_icon_version', 'square'
      @profile.iconImageUrl().should.include "square"

  describe '#alphaSortKey', ->

    it "returns the profile owner's display name", ->
      @profile.alphaSortKey().should.equal @profile.displayName()

  describe '#href', ->

    it "returns the client link to this profile", ->
      @profile.href().should.include "/#{@profile.get('id')}"

  describe '#displayName', ->

    it "returns the profile owner's display name", ->
      @profile.displayName().should.equal @profile.get('owner').name

  describe '#isPartner', ->

    it "returns true if the profile does not belong to a User or Admin", ->
      @profile.set 'owner_type', 'PartnerGallery'
      @profile.isPartner().should.be.true
      @profile.set 'owner_type', 'Admin'
      @profile.isPartner().should.be.false
      @profile.set 'owner_type', 'User'
      @profile.isPartner().should.be.false

  describe '#defaultIconInitials', ->

    it "returns up to two initials for a partner name", ->
      @profile.defaultIconInitials().should.equal "JP"

      @profile.get('owner').name = "Whitney"
      @profile.defaultIconInitials().should.equal "W"

      @profile.get('owner').name = "John Jacob Jingle Heimer Schmidt"
      @profile.defaultIconInitials().should.equal "JJ"

    it "does not include non-word characters", ->
      @profile.get('owner').name = "Chime & Read"
      @profile.defaultIconInitials().should.equal "CR"

      @profile.get('owner').name = "2 % Johan _ Gregor 37"
      @profile.defaultIconInitials().should.equal "2J"
