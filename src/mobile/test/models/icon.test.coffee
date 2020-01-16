_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
Icon = require '../../models/icon'
Profile = require '../../models/profile'
{ fabricate } = require '@artsy/antigravity'

describe 'Icon', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @profile = new Profile fabricate 'profile'
    @icon = @profile.icon()

  afterEach ->
    Backbone.sync.restore()

  describe '#url', ->

    it 'returns a url with a profile id in it', ->
      @icon.url().should.containEql "api/v1/profile/#{@profile.get('id')}/icon"

  describe '#imageUrl', ->

    it 'does the usual version swap if the image is processed and happy', ->
      @icon.imageUrl().should.containEql 'profile_icons/504e3beab19ddf0002000534/square.png'

    it 'returns the original if the image has not had versions processed', ->
      @icon.set 'versions', null
      @icon.imageUrl().should.containEql 'profile_icons/504e3beab19ddf0002000534/original.jpg'

    it 'returns the default as a fall through', ->
      @icon.set
        versions: null
        image_filename: null
      @icon.imageUrl().should.equal Icon.DefaultUserIconUrl
