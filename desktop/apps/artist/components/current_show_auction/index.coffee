_ = require 'underscore'
helpers = require '../../view_helpers.coffee'

current = (type, artist) ->
  currentItems = artist[type]
  count = currentItems.length
  item = currentItems[0]
  heading = (if (type is 'show' and count > 1) then 'Featured ' else 'Current ') + helpers.capitalize(type)
  detail = if type is 'show'
    _.compact([
      item.partner?.name,
      item.location?.city
    ]).join ', '
  else
    ''
  _.extend(_.pick(item, 'location', 'start_at', 'end_at', 'name', 'href', 'live_start_at', 'exhibition_period'), {
    heading: heading
    type: type
    imageUrl: item.cover_image?.cropped.url
    detail: detail
  })

module.exports = (artist) ->
  type = _.find ['auction', 'show'], (type) ->
    artist[type]?.length > 0
  result = current(type, artist) if type
  result
