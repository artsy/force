filenameMap = require './image_filename_map.coffee'

module.exports =
  imageUrl: (image) ->
    filenameMap[image.url] || image.url
    
