#
# Simply includes each app's javascripts into one big package and
# requires the appropriate one based on location.pathname.
# In the beginning this will be easier for simplicity's sake, but as this
# package gets large, and we micro-optimize initial page load, we'll want
# to get more complex in how we break up and load assets.
#

require 'jquery'
sd = require('sharify').data

# TODO: Refactor to use Backbone router
hash =

  '^/search': ->
    require('../apps/search/client').init()

  '^/contact': ->
    require('../apps/contact/client/index').init()

  '^/how-auctions-work[/]?.*': ->
    require('../apps/how_auctions_work/client/index').init()

  '^/artist/.*/auction-results': ->
    require('../apps/artist/client/auction_results').init()

  '^/artist/.*': ->
    require '../apps/artist/client/index'

  '^/gene/.*': ->
    require('../apps/gene/client').init()

  '^/tag/.*': ->
    require('../apps/tag/client').init()

  '^/unsubscribe*': ->
    require('../apps/unsubscribe/client').init()

  '^/auction/.*/bid/.*': ->
    require('../apps/feature/client/bid_page').init()

  '^/auction/.*/confirm-registration': ->
    return

  '^/feature/([^/]+)$': ->
    require('../apps/feature/client/index').init()

  '^/profile/.*': ->
    require '../apps/profile/client'

  '^/log_in': ->
    require('../apps/auth/client/login').init()

  '^/reset_password': ->
    require('../apps/auth/client/reset_password').init()

  '^/sign_up': ->
    require('../apps/auth/client/signup').init()

  '^/collect$': ->
    require('../apps/browse/client').init()

  '^/personalize': ->
    require('../apps/personalize/client/router').init()

  '^/gallery-partnerships': ->
    require('../apps/gallery_partnerships/client/index').init()

  '^/.*/articles.*': ->
    require '../apps/partner_profile/client/articles'

  '^/.*/(collection|shop)[/]?': ->
    require('../apps/partner_profile/client/artworks').init()

  '^/art-fairs': ->
    require('../apps/art_fairs/client/art_fairs').init()

  '^/auctions': ->
    require('../apps/auctions/client/auctions').init()

  '^/auction/.*': ->
    return if location.pathname.match 'subscribe'
    require('../apps/auction/client/index').init()

  '^/auction-registration/.*': ->
    require('../apps/auction_support/client/index').init()

  '^/shows': ->
    require('../apps/shows/client/shows').init()

  '^/all-cities': ->
    require('../apps/shows/client/shows').init()

  '^/(galleries|institutions)': ->
    require('../apps/galleries_institutions/client/galleries_institutions').init()

  # Use more specific regex to avoid intercepting '^/.*/browse/artist/.*'
  # Note that the order of iteration over a dictionary is not guaranteed.
  '^/[^/]*/artist/.*': ->
    require('../apps/partner_profile/client/artist').init()

  '^/.*/live': ->
    require('../apps/fair/client/trending').init()

  '^/.*/feed': ->
    require('../apps/fair/client/feed').init()

  '^/.*/for-you': ->
    require('../apps/fair/client/for_you').init()

  '^/.*/programming.*': ->
    require('../apps/fair/client/programming').init()

  '^/.*/events.*': ->
    require('../apps/fair_info/client/events').init()

  '^/.*/armory-arts-week': ->
    require('../apps/fair_info/client/events').init()

  '^/.*/browse/artist/.*': ->
    require('../apps/fair/client/artist').init()

  '^/.*/browse/booths': ->
    require('../apps/fair/client/exhibitors').init()

  '^/.*/browse/artworks': ->
    require('../apps/fair/client/artworks').init()

  '(^/.*/browse/exhibitors)|(^/.*/browse/artists)|(^/.*/browse/filter)': ->
    require('../apps/fair/client/main_page').init()

  '^/.*/overview.*': ->
    if sd.FAIR?
      if location.pathname.match('info2')
        require('../apps/fair_info/client/index').init()
      else
        require('../apps/fair/client/main_page').init()
    else if sd.PROFILE?
      require '../apps/profile/client'
    else if sd.PARTNER_PROFILE?
      require '../apps/partner_profile/client/index'


  '^/.*/info.*': ->
    if sd.FAIR?
      if location.pathname.match('info2')
        require('../apps/fair_info/client/index').init()

  '^/([^/]+)$': ->
    if sd.FAIR_ORGANIZER?
      require('../apps/fair_organizer/client/fair_organizer').init()
    else if sd.FAIR?
      require('../apps/fair/client/main_page').init()
    else if sd.PARTNER_PROFILE?
      require '../apps/partner_profile/client/index'
    else if sd.PROFILE?
      require '../apps/profile/client'
    else
      # Last resort
      require('../components/layout/bootstrap')()

  '^/artwork/.*': ->
    require('../apps/artwork/client/index').init()

  '^$': ->
    require '../apps/home/client/index'

# On DOM load iterate through the hash and load that app's JS
$ ->
  for regexStr, load of hash
    if location.pathname.replace(/\/$/,'').match(new RegExp regexStr)
      load()
      break
