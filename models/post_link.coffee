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

  safeEmbedHtml: (maxWidth = 600) ->
    @safeEmbedElement(maxWidth).wrap('<div></div>').parent().html()

  canBeDisplayed: ->
    @isImage() || (@hasEmbed() && @safeEmbedElement())

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

  maxHeightForWidth: (width) ->
    aspectRatio = @aspectRatio()
    if aspectRatio?
      height = Math.round(width / aspectRatio)
      if height > @imageHeight() then @imageHeight() else height
    else
      width

  maxWidthForWidth: (width) ->
    if width > @imageWidth() then @imageWidth() else width
