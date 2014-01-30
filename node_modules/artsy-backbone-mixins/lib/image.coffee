_   = require 'underscore'

module.exports = (secureImagesUrl, imagesUrlPrefix='http://static%d.artsy.net') ->

  defaultImageVersion: ->
    if @has 'image_versions' or @has 'versions'
      (@get('image_versions') or @get('versions'))[0]
    else
      null

  missingImageUrl: -> "/images/missing_image.png"

  hasImage: (version) ->
    _.contains(@get('image_versions'), version) or _.contains(@get('versions'), version)

  imageUrl: (version = @defaultImageVersion()) ->
    if @hasImage version
      @sslUrl @get('image_url').replace(':version', version)
    else
      @missingImageUrl()

  # Replace the image URL with an https:// URL
  sslUrl: (url) ->
    return url unless secureImagesUrl and imagesUrlPrefix

    @imagesUrlPrefixRE ?= new RegExp(imagesUrlPrefix.replace('%d', '\\d'))
    url.replace @imagesUrlPrefixRE, secureImagesUrl
