_               = require 'underscore'
sinon           = require 'sinon'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
imageMixin      = require '../../../models/mixins/image'
sd              = require('sharify').data

class Model extends Backbone.Model
  _.extend @prototype, imageMixin

describe 'Image Mixin', ->
  beforeEach ->
    @model = new Model fabricate 'featured_link'

  describe 'fullyQualifiedImageUrl', ->

    it 'returns url', ->
      @model.fullyQualifiedImageUrl('whatever').should.equal 'whatever'

    describe 'with an image url', ->
  
      beforeEach ->
        @image = "http://stazic1.artsy.net/additional_images/42/round.jpg"

      it 'returns an image url', ->
        @model.fullyQualifiedImageUrl(@image).should.equal 'http://stazic1.artsy.net/additional_images/42/round.jpg'

      describe 'ssl with an asset url', ->
        beforeEach ->
          sd.IMAGES_URL_PREFIX = "http://stazic%d.artsy.net"
          sd.SECURE_IMAGES_URL = "https://ssl.artsy.net"

        afterEach ->
          sd.IMAGES_URL_PREFIX = undefined
          sd.SECURE_IMAGES_URL = undefined

        it 'returns an image url', ->
          @model.fullyQualifiedImageUrl(@image).should.equal 'https://ssl.artsy.net/additional_images/42/round.jpg'

  describe 'imageUrl', ->

    it 'returns missing image', ->
      sd.ASSET_PATH = "/assets/shared/"
      @model.imageUrl().should.equal '/assets/shared/missing_image.png'

    it 'returns an image URL when passed a valid version', ->
      @model.imageUrl('small_square').should.equal '/bitty/small_square'

    describe 'with a round image', ->
      beforeEach ->
        @model.set
          image_versions: [ 'round' ]
          image_url: 'http://stazic1.artsy.net/additional_images/42/:version.jpg'

      it 'returns an image url', ->
        @model.imageUrl('round').should.equal 'http://stazic1.artsy.net/additional_images/42/round.jpg'

      it "returns missing image for a version that doesn't exist", ->
        sd.ASSET_PATH = "/assets/shared/"
        @model.imageUrl('square').should.equal '/assets/shared/missing_image.png'

      describe 'ssl with an asset url', ->

        beforeEach ->
          sd.IMAGES_URL_PREFIX = "http://stazic%d.artsy.net"
          sd.SECURE_IMAGES_URL = "https://ssl.artsy.net"

        afterEach ->
          sd.IMAGES_URL_PREFIX = undefined
          sd.SECURE_IMAGES_URL = undefined

        it 'returns an image url', ->
          @model.imageUrl('round').should.equal 'https://ssl.artsy.net/additional_images/42/round.jpg'
