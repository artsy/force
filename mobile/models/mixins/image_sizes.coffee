_ = require 'underscore'
sd = require('sharify').data
resizer = require '../../components/resizer/index'

# requires the image mixin
module.exports =
  sizes:
    small: width: 200, height: 200
    tall: width: 260, height: 800
    medium: width: Infinity, height: 260
    large: width: 640, height: 640
    larger: width: 1024, height: 1024

  publicVersions: ->
    _.without(@get('image_versions'), 'normalized')

  # Given a desired width and height, return the image url that won't pixelate
  imageUrlFor: (width, height) ->
    if size = @imageSizeForDimensions width, height
      return @imageUrl size
    @imageUrlForMaxSize()

  imageSizeForDimensions: (width, height) ->
    for key, size of @sizes
      if width <= size.width and height <= size.height
        return key if _.contains @get('image_versions'), key

  imageUrlForHeight: (height) ->
    aspectRatio = @aspectRatio()
    if aspectRatio?
      @imageUrlFor height * @aspectRatio(), height
    else
      @imageUrlFor height, height

  imageUrlForWidth: (width) ->
    aspectRatio = @aspectRatio()
    if aspectRatio?
      @imageUrlFor width, (width / @aspectRatio())
    else
      @imageUrlFor width, width

  imageUrlForMaxSize: ->
    sizes = @publicVersions()
    # favor sizes in this order
    for size in ['source', 'larger', 'large', 'large_rectangle', 'tall', 'medium', 'square', 'small']
      return @imageUrl(size) if _.contains(sizes, size)
    null

  sourceUrl: (attr) ->
    @get(attr) or @imageUrlForMaxSize()

  resizeUrlFor: (options = {}, attr) ->
    resizer.resize @sourceUrl(attr), arguments...

  cropUrlFor: (options = {}, attr) ->
    resizer.crop @sourceUrl(attr), options

  aspectRatio: ->
    @get('aspect_ratio')

  # Returns a URL where the image is cropped if the crop space is less than 25%, otherwise returns the image.
  imageUrlForRatio: (ratio = 1.5, percentage = .25) ->
    ar = @aspectRatio()
    oh = @get('original_height')
    ow = @get('original_width')
    if ar is ratio
      url = @imageUrlForWidth(600)
    else if ar > 1 # wide image
      if ((oh * ratio) / ow) < 1 - percentage
        @imageUrlForWidth(600)
      else
        @resizeAndCropForAspectRatio()
    else # tall image
      if ((ow / ratio) / oh) > percentage
        @imageUrlForHeight(400)
      else
        @resizeAndCropForAspectRatio()

  resizeAndCropForAspectRatio: ->
    if @get('aspect_ratio') > 1
      @cropUrlFor({ width: 600, height: 400 }, @imageUrlForHeight(400) )
    else
      @cropUrlFor({ width: 400, height: 600 }, @imageUrlForWidth(600) )
