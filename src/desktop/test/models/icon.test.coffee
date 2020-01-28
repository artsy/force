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

  describe '#validate', ->

    it 'is valid without a file object to validate against', ->
      @icon.isValid().should.be.true()

    it 'invalidates the icon if the size is greater than 3MB', ->
      @icon.set 'file', { type: '.png', size: @icon.maxFileSize }
      @icon.isValid().should.be.true()

      @icon.set 'file', { type: '.png', size: @icon.maxFileSize - 1 }
      @icon.isValid().should.be.true()

      @icon.set 'file', { type: '.png', size: @icon.maxFileSize + 1 }
      @icon.isValid().should.be.false()

    it 'invalidates the icon if the file is not an image', ->
      @icon.set 'file', { type: '.pdf', size: @icon.maxFileSize }
      @icon.isValid().should.be.false()

      @icon.set 'file', { type: '.png', size: @icon.maxFileSize }
      @icon.isValid().should.be.true()

  describe '#imageUrl', ->

    it 'does the usual version swap if the image is processed and happy', ->
      @icon.imageUrl().should.equal @icon.get('image_url').replace(':version','square').replace('jpg', 'png')

    it 'returns the original if the image has not had versions processed', ->
      @icon.set 'versions', null
      @icon.imageUrl().should.equal @icon.get('image_url').replace(':version','original')

    it 'returns the default as a fall through', ->
      @icon.set
        versions: null
        image_filename: null
      @icon.imageUrl().should.equal Icon.DefaultUserIconUrl
