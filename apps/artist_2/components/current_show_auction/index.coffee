_ = require 'underscore'

current = (type, artist) ->
   currentItems = artist[type]
   count = currentItems.length
   hasMany = count > 1
   imageUrl = currentItems[0].cover_image?.cropped.url
   item = _.pick currentItems[0], 'start_at', 'end_at', 'name', 'href'
   _.extend item, { hasMany, type, imageUrl }
   return item

 module.exports = (artist) ->
   type = _.find ['auction', 'show'], (type) ->
     artist[type]?.length > 0
   current(type, artist) if type
