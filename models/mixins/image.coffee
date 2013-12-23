_   = require 'underscore'
sd  = require('sharify').data

module.exports =
  missingImageUrl: -> "#{sd.ASSET_PATH}missing_image.png"

  fullyQualifiedImageUrl: (url) ->
    # Replace the image URL with an https:// URL
    if sd.SECURE_IMAGES_URL and sd.IMAGES_URL_PREFIX
      @imagesUrlPrefixRE ?= new RegExp(sd.IMAGES_URL_PREFIX.replace('%d', '\\d'))
      url.replace @imagesUrlPrefixRE, sd.SECURE_IMAGES_URL
    else
      url

  hasImage: (version='large') ->
    _.contains(@get('image_versions'), version) or _.contains(@get('versions'), version)

  imageUrl: (version) ->
    if @hasImage version
      @fullyQualifiedImageUrl(@get 'image_url').replace ':version', version
    else
      @missingImageUrl()
