_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
{ Image } = require 'artsy-backbone-mixins'
ImageSizes = require '../../../models/mixins/image_sizes'
sd = require('sharify').data

class Model extends Backbone.Model
  _.extend @prototype, Image()
  _.extend @prototype, ImageSizes

describe 'Image Sizes Mixin', ->
  beforeEach ->
    @model = new Model fabricate 'featured_link'

  describe '#publicVersions', ->
    it 'ignores the normalized (private) size', ->
      public_versions = @model.get 'image_versions'
      copy = public_versions[..]
      copy.push 'normalized'
      @model.set 'image_versions', copy
      (@model.publicVersions() + "").should.equal public_versions + ""

  describe "#imageUrlFor", ->
    it 'returns the next available size if the best size is not available', ->
      @model.set {
        id: 'tall-image-00193920390'
        image_versions: ["small", "large", "larger"]
        image_url: ":version.jpg"
        original_height: 2253
        original_width: 1200
      }
      @model.imageUrlFor(201, 201).should.equal 'large.jpg'

    it 'returns the largest available image if all sizes are smaller than desired dimensions', ->
      @model.set {
        id: 'tall-image-00193920390'
        image_versions: ["small", "large", "larger"]
        image_url: ":version.jpg"
        original_height: 2253
        original_width: 1200
      }
      @model.imageUrlFor(2080, 2080).should.equal 'larger.jpg'

  describe '#imageSizeForHeight', ->
    it 'returns a version size for a given height', ->
      @model.set {
        id: 'tall-@model-00193920390'
        image_versions: ["small", "tall", "medium", "large", "larger"]
        image_url: ":version.jpg"
        aspect_ratio: 0.53
        original_height: 2253
        original_width: 1200
      }
      @model.imageSizeForHeight(800).should.equal 'larger'
      @model.imageSizeForHeight(400).should.equal 'tall'
      @model.imageSizeForHeight(200).should.equal 'small'

  describe '#imageUrlForHeight', ->
    it 'returns versions for the largest image for the given height', ->
      @model.set {
        id: 'tall-@model-00193920390'
        image_versions: ["small", "tall", "medium", "large", "larger"]
        image_url: ":version.jpg"
        aspect_ratio: 0.53
        original_height: 2253
        original_width: 1200
      }
      @model.imageUrlForHeight(100).should.equal 'small.jpg'
      @model.imageUrlForHeight(600).should.equal 'large.jpg'
      @model.imageUrlForHeight(1000).should.equal 'larger.jpg'

  describe '#imageUrlForWidth', ->
    it 'returns versions for the largest image for the given width', ->
      @model.set {
        id: 'tall-image-00193920390'
        image_versions: ["small", "large", "larger"]
        image_url: ":version.jpg"
        aspect_ratio: 0.53
        original_height: 2253
        original_width: 1200
      }
      @model.imageUrlForWidth(100).should.equal 'small.jpg'
      @model.imageUrlForWidth(300).should.equal 'large.jpg'
      @model.imageUrlForWidth(1000).should.equal 'larger.jpg'

  describe '#imageUrlForMaxSize', ->
    it 'picks the last size in the list', ->
      @model.set { image_versions: ['small', 'large'] }
      @model.imageUrlForMaxSize().should.equal '/bitty/large'

    it 'ignores the normalized (private) size', ->
      @model.set { image_versions: ['small', 'large', 'normalized'] }
      @model.imageUrlForMaxSize().should.equal '/bitty/large'

    it 'favors the largest size', ->
      @model.set { image_versions: ['larger', 'large', 'tall'] }
      @model.imageUrlForMaxSize().should.equal '/bitty/larger'

  describe '#aspectRatio', ->
    it 'returns the image aspect ratio', ->
      @model.set { aspect_ratio: 1.0 }
      @model.aspectRatio().should.equal @model.get('aspect_ratio')

  describe '#resizeDimensionsFor', ->
    it 'returns new dimensions based on the passed in dimensions', ->
      @model.set original_height: 2253, original_width: 1200
      @model.resizeDimensionsFor(width: 400).should.eql width: 400, height: 751
      @model.resizeDimensionsFor(width: 400, height: 400).should.eql width: 213, height: 400
      @model.resizeDimensionsFor(height: 400).should.eql width: 213, height: 400
      @model.resizeDimensionsFor(width: 4000).should.eql width: 4000, height: 7510
      @model.resizeDimensionsFor(width: 4000, height: 4000).should.eql width: 2130, height: 4000
      @model.resizeDimensionsFor(height: 4000).should.eql width: 2130, height: 4000

  describe '#factor', ->
    it 'returns a value that can be multiplied into a percentage for the corresponding value at 1 (100%)', ->
      @model.set original_height: 2253, original_width: 1200
      @model.factor('width').should.equal 1.877
      @model.factor('height').should.equal 0.532

    # This is a very corner case, but apparently possible
    it 'returns 1 if there are no dimensions', ->
      @model.unset 'original_width'
      @model.unset 'original_height'
      @model.factor('width').should.equal 1
