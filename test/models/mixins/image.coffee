_               = require 'underscore'
sinon           = require 'sinon'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
imageMixin      = require '../../../models/mixins/image'

class Model extends Backbone.Model
  _.extend @prototype, imageMixin

describe 'Image Mixin', ->
  beforeEach ->
    @model = new Model fabricate 'featured_link'

  describe '#fullyQualifiedImageUrl', ->
    it 'replaces the image URL with an https:// URL'

  describe '#imageUrl', ->
    it 'returns an image URL when passed a valid version', ->
      @model.imageUrl('small_square').should.equal '/bitty/small_square'

    it 'returns the missingImageUrl when the version is not valid', ->
      @model.imageUrl('garbage').should.equal imageMixin.missingImageUrl
