_ = require 'underscore'
sd = require('sharify').data
resizer = require '../../components/resizer/index.coffee'

# requires the image mixin
module.exports =

  sizes: [
    ['small', { width: 200, height: 200}]
    ['tall', { width: 260, height: 800}]
    ['medium', { width: Infinity, height: 260}]
    ['large', { width: 640, height: 640}]
    ['larger', { width: 1024, height: 1024}]
  ]

  publicVersions: ->
    _.without(@get('image_versions'), 'normalized')

  # Given a desired width and height, return the image url that won't pixelate
  imageUrlFor: (width, height) ->
    size = @imageSizeForDimensions width, height
    if size
      return @imageUrl size
    @imageUrlForMaxSize()

  imageSizeForDimensions: (width, height) ->
    for size in @sizes
      if width <= size[1].width && height <= size[1].height
        return size[0] if _.indexOf(@get('image_versions'), size[0]) >= 0

  imageSizeForHeight: (height) ->
    @imageSizeForDimensions height * @aspectRatio(), height

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

  maxHeightForWidth: (width, maxDimension) ->
    aspectRatio = @aspectRatio()
    maxDimension = maxDimension || @get 'original_height'
    if aspectRatio?
      height = Math.round width / @aspectRatio()
      if height > maxDimension then maxDimension else Math.floor(height)

  maxWidthForWidth: (width, maxDimension) ->
    aspectRatio = @aspectRatio()
    if aspectRatio?
      if maxDimension
        height = width / @aspectRatio()
        height = maxDimension if height > maxDimension
        width = height * @aspectRatio()
      else
        maxDimension = @get('original_width')
      if width > maxDimension then maxDimension else Math.floor(width)

  imageUrlForMaxSize: ->
    sizes = @publicVersions()
    # favor sizes in this order
    for size in ['source', 'larger', 'large', 'large_rectangle', 'tall', 'medium', 'square', 'small']
      return @imageUrl(size) if _.contains(sizes, size)
    null

  resizeDimensionsFor: ({ width, height }) ->
    ratios = _.compact _.map { width: width, height: height }, (value, dimension) =>
      value / @get("original_#{dimension}") if value
    ratio = Math.min ratios...
    width: Math.floor(@get('original_width') * ratio)
    height: Math.floor(@get('original_height') * ratio)

  sourceUrl: (attr) ->
    @get(attr) or @imageUrlForMaxSize()

  resizeUrlFor: (options = {}, attr) ->
    resizer.resize @sourceUrl(attr), arguments...

  cropUrlFor: (options = {}, attr) ->
    resizer.crop @sourceUrl(attr), options

  fillUrlFor: (options = {}, attr) ->
    resizer.fill @sourceUrl(attr), options

  aspectRatio: ->
    @get('aspect_ratio')
