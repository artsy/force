Backbone = require 'backbone'
sd = require('sharify').data

module.exports = class PostLink extends Backbone.Model

  url: ->
    "#{sd.API_URL}/api/v1/post/#{@get('post').id}/link/#{@get('id') || ''}"

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
    @get('aspect_ratio') || (@imageHeight() / @imageWidth())

  maxHeightForWidth: (maxDimension=600) ->
    @maxWidthForWidth(maxDimension) * @aspectRatio()

  maxWidthForWidth: (maxDimension=600) ->
    aspectRatio = @aspectRatio()
    width = @imageWidth()
    if aspectRatio?
      if width > maxDimension then maxDimension else Math.floor(width)
