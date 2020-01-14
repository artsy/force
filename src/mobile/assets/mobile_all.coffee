#
# Simply includes each app's javascripts into one big package and
# requires the appropriate one based on location.pathname.
# In the beginning this will be easier for simplicity's sake, but as this
# package gets large, and we micro-optimize initial page load, we'll want
# to get more complex in how we break up and load assets.
#

$ = require 'jquery'
sd = require('sharify').data

# TODO: Refactor to use Backbone router
hash =

  '^/search': ->
    require('../apps/search/client.coffee').init()

  '^/contact': ->
    require('../apps/contact/client/index.coffee').init()

  '^/how-auctions-work[/]?.*': ->
    require('../apps/how_auctions_work/client/index.coffee').init()

  '^/gene/.*': ->
    require('../apps/gene/client.coffee').init()

  '^/tag/.*': ->
    require('../apps/tag/client.coffee').init()

  '^/unsubscribe*': ->
    require('../apps/unsubscribe/client.coffee').init()

  '^/auction/.*/bid/.*': ->
    require('../apps/feature/client/bid_page.coffee').init()

  '^/feature/([^/]+)$': ->
    require('../apps/feature/client/index.coffee').init()

  '^/profile/.*': ->
    require '../apps/profile/client.coffee'

  '^/collect$': ->
    require('../apps/browse/client.coffee').init()

  '^/.*/articles.*': ->
    require '../apps/partner_profile/client/articles.coffee'

  '^/.*/(collection|shop)[/]?': ->
    require('../apps/partner_profile/client/artworks.coffee').init()

  '^/art-fairs': ->
    require('../apps/art_fairs/client/art_fairs.coffee').init()

  '^/auctions': ->
    require('../apps/auctions/client/auctions.coffee').init()

  '^/auction-registration/.*': ->
    require('../apps/auction_support/client/index.coffee').init()

  '^/shows': ->
    require('../apps/shows/client/shows.coffee').init()

  '^/all-cities': ->
    require('../apps/shows/client/shows.coffee').init()

  '^/(galleries|institutions)': ->
    require('../apps/galleries_institutions/client/galleries_institutions.coffee').init()

  # Use more specific regex to avoid intercepting '^/.*/browse/artist/.*'
  # Note that the order of iteration over a dictionary is not guaranteed.
  '^/[^/]*/artist/.*': ->
    require('../apps/partner_profile/client/artist.coffee').init()

  '^/.*/live': ->
    require('../apps/fair/client/trending.coffee').init()

  '^/.*/feed': ->
    require('../apps/fair/client/feed.coffee').init()

  '^/.*/for-you': ->
    require('../apps/fair/client/for_you.coffee').init()

  '^/.*/programming.*': ->
    require('../apps/fair/client/programming.coffee').init()

  '^/.*/events.*': ->
    require('../apps/fair_info/client/events.coffee').init()

  '^/.*/armory-arts-week': ->
    require('../apps/fair_info/client/events.coffee').init()

  '^/.*/browse/artist/.*': ->
    require('../apps/fair/client/artist.coffee').init()

  '^/.*/browse/booths': ->
    require('../apps/fair/client/exhibitors.coffee').init()

  '^/.*/browse/artworks': ->
    require('../apps/fair/client/artworks.coffee').init()

  '(^/.*/browse/exhibitors)|(^/.*/browse/artists)|(^/.*/browse/filter)': ->
    require('../apps/fair/client/main_page.coffee').init()

  '^/.*/overview.*': ->
    if sd.FAIR?
      if location.pathname.match('info2')
        require('../apps/fair_info/client/index.coffee').init()
      else
        require('../apps/fair/client/main_page.coffee').init()
    else if sd.PROFILE?
      require '../apps/profile/client.coffee'
    else if sd.PARTNER_PROFILE?
      require '../apps/partner_profile/client/index.coffee'


  '^/.*/info.*': ->
    if sd.FAIR?
      if location.pathname.match('info2')
        require('../apps/fair_info/client/index.coffee').init()

  '^/([^/]+)$': ->
    if sd.FAIR_ORGANIZER?
      require('../apps/fair_organizer/client/fair_organizer.coffee').init()
    else if sd.FAIR?
      require('../apps/fair/client/main_page.coffee').init()
    else if sd.PARTNER_PROFILE?
      require '../apps/partner_profile/client/index.coffee'
    else if sd.PROFILE?
      require '../apps/profile/client.coffee'
    else
      # Last resort
      require('../components/layout/bootstrap.coffee')()

  '^$': ->
    require '../apps/home/client/index.coffee'

# On DOM load iterate through the hash and load that app's JS
$ ->
  for regexStr, load of hash
    if location.pathname.replace(/\/$/,'').match(new RegExp regexStr)
      load()
      break
