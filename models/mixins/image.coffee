_ = require 'underscore'

module.exports =
  missingImageUrl: '/missing.png?todo'

  fullyQualifiedImageUrl: (url) ->
    # todo
    url

  imageUrl: (version) ->
    if _.contains(@get('image_versions'), version)
      @fullyQualifiedImageUrl(@get 'image_url').replace ':version', version
    else
      @missingImageUrl
