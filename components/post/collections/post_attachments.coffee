_           = require 'underscore'
Backbone    = require 'backbone'
PostArtwork = require '../models/post_artwork.coffee'
PostLink    = require '../models/post_link.coffee'
PostImage   = require '../models/post_image.coffee'
PostEmbed   = require '../models/post_embed.coffee'

module.exports = class PostAttachments extends Backbone.Collection

  model: (attrs, options) ->
    switch attrs?.type
      when "PostArtwork" then new PostArtwork(attrs, options)
      when "PostLink" then new PostLink(attrs, options)
      when "PostImage" then new PostImage(attrs, options)
      when "PostEmbed" then new PostEmbed(attrs, options)
      else super

  comparator: (attachment) -> attachment.get('position')

  featuredPostsThumbnail: ->
    # Filter for post attachments that are either an Artwork or an Image
    _.filter(@models, (attachment) -> attachment.get('type') == "PostArtwork" or attachment.get('type') == "PostImage")[0]
