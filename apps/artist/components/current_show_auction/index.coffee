_ = require 'underscore'

current = (type, artist) ->
  currentItems = artist[type]
  count = currentItems.length
  item = currentItems[0]
  _.extend(_.pick(item, 'start_at', 'end_at', 'name', 'href'), {
    type: type
    hasMany: count > 1
    imageUrl: item.cover_image?.cropped.url
    secondaryName: item.partner?.name
    city: item.location?.city
  })

 module.exports = (artist) ->
   type = _.find ['auction', 'show'], (type) ->
     artist[type]?.length > 0
   result = current(type, artist) if type
   result