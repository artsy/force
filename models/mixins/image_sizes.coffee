_ = require 'underscore'
sd = require('sharify').data
resizer = require '../../components/resizer/index.coffee'

# requires the image mixin
module.exports =
  sizes:
    small: width: 200, height: 200
    tall: width: 260, height: 800
    medium: width: Infinity, height: 260
    large: width: 640, height: 640
    larger: width: 1024, height: 1024

  croppedSizes: ['square', 'medium250x165', 'medium_rectangle', 'large_rectangle']

  isCropped: (version) ->
    _.contains @croppedSizes, version

  isWithImages: ->
    @defaultImageVersion?()?

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

  maxWidthForHeight: (height, maxDimension) ->
    aspectRatio = @aspectRatio()
    maxDimension = maxDimension or @get 'original_width'
    if aspectRatio?
      width = Math.round height / @aspectRatio()
      if width > maxDimension then maxDimension else Math.floor(width)

  maxHeightForHeight: (height, maxDimension) ->
    aspectRatio = @aspectRatio()
    if aspectRatio?
      if maxDimension
        width = height / @aspectRatio()
        width = maxDimension if width > maxDimension
        height = width * @aspectRatio()
      else
        maxDimension = @get('original_height')
      if height > maxDimension then maxDimension else Math.floor(height)
    else
      height

  maxHeightForWidth: (width, maxDimension) ->
    aspectRatio = @aspectRatio()
    maxDimension = maxDimension or @get 'original_height'
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
    for size in ['source', 'wide', 'larger', 'large', 'large_rectangle', 'tall', 'medium', 'square', 'small']
      return @imageUrl(size) if _.contains(sizes, size)
    null

  imageSizeDimensionsFor: (size) ->
    @resizeDimensionsFor(@sizes[size])

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

  hasDimensions: ->
    @has('original_width') and
    @has('original_height')

  factor: (favor = 'width', precision = 3) ->
    disfavor = if favor is 'width' then 'height' else 'width'
    if @hasDimensions()
      factor = @get("original_#{disfavor}") / @get("original_#{favor}")
      x = Math.pow 10, precision
      Math.floor(factor * x) / x
    else
      1

  aspectRatio: ->
    @get('aspect_ratio')
