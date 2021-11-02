{ PartnerShows } = require '../../../../collections/partner_shows'

module.exports =
  formatCity: (location) ->
    location?.city?.trim() || ''

  featuredShow: (shows) ->
    (new PartnerShows shows).featured()
