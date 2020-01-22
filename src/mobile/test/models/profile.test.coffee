sinon = require 'sinon'
Backbone = require 'backbone'
Profile = require '../../models/profile'
{ fabricate } = require '@artsy/antigravity'

describe 'Profile', ->

  beforeEach ->
    @profile = new Profile fabricate 'profile'
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#iconUrl', ->

    it 'defaults to square140 icon image', ->
      @profile.set 'icon', { image_url: 'foo/bar/:version.jpg', image_versions: [ 'square140', 'square' ] }
      @profile.iconUrl().should.equal 'foo/bar/square140.png'

    it 'falls back to square', ->
      @profile.set 'icon', { image_url: 'foo/bar/:version.jpg', image_versions: [ 'square' ] }
      @profile.iconUrl().should.equal 'foo/bar/square.png'

    it 'default if non-existant image requested', ->
      @profile.unset 'icon'
      @profile.iconUrl('circle').should.equal '/images/user_profile.png'

  describe '#hasIcon', ->

    it 'indicates if a profile has an icon', ->
      @profile.hasIcon().should.be.true()
      @profile.unset 'icon'
      @profile.hasIcon().should.be.false()

  describe '#initials', ->

    it "returns up to two initials for a partner name", ->
      @profile.initials().should.equal "CS"

      @profile.get('owner').name = "Whitney"
      @profile.initials().should.equal "W"

      @profile.get('owner').name = "John Jacob Jingle Heimer Schmidt"
      @profile.initials().should.equal "JJ"

    it "does not include non-word characters", ->
      @profile.get('owner').name = "Chime & Read"
      @profile.initials().should.equal "CR"

      @profile.get('owner').name = "2 % Johan _ Gregor 37"
      @profile.initials().should.equal "2J"
