Backbone      = require 'backbone'
sd            = require('sharify').data

module.exports = class PostLink extends Backbone.Model

  url: ->
    "#{sd.ARTSY_URL}/api/v1/post/#{@get('post').id}/link/#{@get('id') || ''}"

  hasEmbed: ->
    return false unless @isVideo() || @isRich()
    @get('oembed_json').html?

  isVideo: -> @get('oembed_json')?.type == 'video'
  isImage: -> @get('oembed_json')?.type == 'photo'
  isRich: ->  @get('oembed_json')?.type == 'rich'

  canBeDisplayed: ->
    @isImage() || @hasEmbed()

  title: ->
    @get('oembed_json')?.title

  sourceName: ->
    @get('oembed_json').provider_name

  imageSrc: ->
    if @isImage() then @get('url') else @get('oembed_json')?.thumbnail_url

  imageWidth: ->
    if @isImage() then @get('oembed_json')?.width else @get('oembed_json')?.thumbnail_width

  imageHeight: ->
    if @isImage() then @get('oembed_json')?.height else @get('oembed_json')?.thumbnail_height

  aspectRatio: ->
    @get('aspect_ratio') || (@imageWidth() / @imageHeight())

  maxHeightForWidth: (maxDimension=600) ->
    aspectRatio = @aspectRatio()
    maxDimension = maxDimension || @get('original_height')
    height = @imageHeight()
    width = @imageWidth()
    if aspectRatio?
      height = Math.round(width / @aspectRatio())
      if height > maxDimension then maxDimension else Math.floor(height)

  maxWidthForWidth: (maxDimension=600) ->
    aspectRatio = @aspectRatio()
    width = @imageWidth()
    if aspectRatio?
      if width > maxDimension then maxDimension else Math.floor(width)
