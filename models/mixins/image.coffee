_ = require 'underscore'
sd = require('sharify').data

module.exports =

  isSSL: -> window?.location?.protocol == "https:" or @get('underSSL')

  missingImageUrl: -> "#{sd.ASSET_PATH}missing_image.png"

  fullyQualifiedImageUrl: (url) ->
    # replace the image URL with an https:// URL
    if @isSSL() and sd.SECURE_IMAGES_URL and sd.IMAGES_URL_PREFIX
      @imagesUrlPrefixRE ?= new RegExp(sd.IMAGES_URL_PREFIX.replace('%d', '\\d'))
      url.replace @imagesUrlPrefixRE, sd.SECURE_IMAGES_URL
    else
      url

  imageUrl: (version) ->
    if _.contains(@get('image_versions'), version)
      @fullyQualifiedImageUrl(@get 'image_url').replace ':version', version
    else
      @missingImageUrl()
