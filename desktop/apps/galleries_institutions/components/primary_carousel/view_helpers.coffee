_ = require 'underscore'
PartnerShows = require '../../../../collections/partner_shows.coffee'

module.exports =
  formatCity: (location) ->
    location?.city?.trim() || ''

  featuredShow: (shows) ->
    (new PartnerShows shows).featured()
