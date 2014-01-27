_               = require 'underscore'
sinon           = require 'sinon'
Backbone        = require 'backbone'
imageMixin      = require '../lib/image'

describe 'Image Mixin', ->

  describe "no ssl url", ->
    beforeEach ->
      class Model extends Backbone.Model
        _.extend @prototype, imageMixin(null, null)

      @model = new Model
        id: _.uniqueId()
        href: '/cats/bitty'
        title: 'This is a page all about Bitty'
        subtitle: "If you are interested in cats, and specifically the best cat in the world, you've come to the right place"
        image_url: '/bitty/:version'
        image_versions: ["large_square", "medium_square", "small_square", "medium_rectangle", "large_rectangle","small_rectangle"]
        item_type: 'FeaturedLink'

    describe 'imageUrl', ->

      it 'returns missing image', ->
        @model.imageUrl('foo').should.equal '/images/missing_image.png'

      it 'returns an image URL when passed a valid version', ->
        @model.imageUrl('small_square').should.equal '/bitty/small_square'

      it 'returns the first image version by default', ->
        @model.imageUrl().should.equal '/bitty/large_square'

      describe 'with a round image', ->
        beforeEach ->
          @model.set
            image_versions: [ 'round' ]
            image_url: 'http://stazic1.artsy.net/additional_images/42/:version.jpg'

        it 'returns an image url', ->
          @model.imageUrl('round').should.equal 'http://stazic1.artsy.net/additional_images/42/round.jpg'

        it "returns missing image for a version that doesn't exist", ->
          @model.imageUrl('square').should.equal '/images/missing_image.png'

  describe 'with an ssl url', ->

    beforeEach ->
      class Model extends Backbone.Model
        _.extend @prototype, imageMixin('https://ssl.artsy.net')

      @model = new Model
        id: _.uniqueId()
        href: '/cats/bitty'
        title: 'This is a page all about Bitty'
        subtitle: "If you are interested in cats, and specifically the best cat in the world, you've come to the right place"
        image_url: 'http://static0.artsy.net/bitty/:version'
        image_versions: ["large_square", "medium_square", "small_square", "medium_rectangle", "large_rectangle","small_rectangle"]
        item_type: 'FeaturedLink'

    describe 'with an image url', ->

      it 'returns missing image', ->
        @model.imageUrl('foo').should.equal '/images/missing_image.png'

      it 'returns an image URL when passed a valid version', ->
        @model.imageUrl('small_square').should.equal 'https://ssl.artsy.net/bitty/small_square'

      it 'returns the first image version by default', ->
        @model.imageUrl().should.equal 'https://ssl.artsy.net/bitty/large_square'
