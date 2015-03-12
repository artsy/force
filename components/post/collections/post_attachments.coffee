_ = require 'underscore'
Backbone = require 'backbone'
PostArtwork = require '../models/post_artwork.coffee'
PostLink = require '../models/post_link.coffee'
PostImage = require '../models/post_image.coffee'
PostEmbed = require '../models/post_embed.coffee'
AdditionalImage = require '../../../models/additional_image.coffee'

module.exports = class PostAttachments extends Backbone.Collection
  model: (attrs, options) ->
    switch attrs?.type
      when "PostArtwork" then new PostArtwork(attrs, options)
      when "PostLink" then new PostLink(attrs, options)
      when "PostImage" then new PostImage(attrs, options)
      when "PostEmbed" then new PostEmbed(attrs, options)
      else super

  comparator: 'position'

  featuredPostsThumbnail: ->
    @find((attachment) ->
      attachment.get('type') is 'PostArtwork' or
      attachment.get('type') is 'PostImage'
    ) or @imageFromPostLink()

  imageUrlFromEmbed: (embed) ->
    if embed.type is 'photo' then embed.url else embed.thumbnail_url

  imageFromPostLink: ->
    new AdditionalImage image_url: _.first _.compact _.map @where(type: 'PostLink'), (attachment) =>
      @imageUrlFromEmbed(attachment.get 'oembed_json')
