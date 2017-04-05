filenameMap = require './image_filename_map'

module.exports =
  imageUrl: (image) ->
    filenameMap[image.url] || image.url

