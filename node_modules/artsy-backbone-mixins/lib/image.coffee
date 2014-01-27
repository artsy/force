_   = require 'underscore'

module.exports =

  defaultImageVersion: -> (@get('image_versions') or @get('versions'))[0]

  missingImageUrl: -> "/images/missing_image.png"

  hasImage: (version) ->
    _.contains(@get('image_versions'), version) or _.contains(@get('versions'), version)

  imageUrl: (version = @defaultImageVersion()) ->
    if @hasImage version
      @get('image_url').replace(':version', version)
    else
      @missingImageUrl()
