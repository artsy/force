{ each } = require 'underscore'
moment = require 'moment'
tz = require 'moment-timezone'
{ USER_HOME_PAGE } = require('sharify').data
User = require '../../../models/user.coffee'
metaphysics = require '../../../../lib/metaphysics.coffee'
query = require '../queries/module.coffee'
MyActiveBids = require '../../../components/my_active_bids/view.coffee'
ArtworkBrickRailView = require '../../../components/artwork_brick_rail/view.coffee'
{ viewAllUrl, timeSpan } = require '../view_helpers.coffee'
FollowedArtistsRailView = require '../components/followed_artists/view.coffee'
setupFollowButton = require '../components/follow_button/index.coffee'

relatedArtistsAnnotation = -> require('../components/related_artists_context/annotation.jade') arguments ...
popularArtistsTemplate = -> require('../components/popular_artists_context/templates/index.jade') arguments...
auctionTemplate = -> require('../components/auction_context/templates/index.jade') arguments...
fairTemplate = -> require('../components/fair_context/templates/index.jade') arguments...

contexts =
  popular_artists: (module) ->
    popularArtistsTemplate artists: module.context.artists
  live_auctions: (module) ->
    auctionTemplate
      auctionTimeLabel: auctionTimeLabel(module.context)
      auctionClosesLabel: auctionClosesLabel(module.context)
  current_fairs: (module) ->
    fairTemplate fair: module.context, timeSpan: timeSpan    

setupFollowedArtistsView = (module, $el, user) ->
  view = new FollowedArtistsRailView
    $el: $el
    module: module
    user: user

  view.render()

setupActiveBidsView = (module, $el, user) ->
  mabView = new MyActiveBids
    user: user
    el: $el

  mabView.fetch().then -> mabView.render().poll()

auctionTimeLabel = (auction) ->
  if auction.live_start_at
    "Live bidding starts #{moment(auction.live_start_at).format("MMM D")}"
  else
    "#{auction.start_at} - #{moment(auction.end_at).format("MMM D")}"

auctionClosesLabel = (auction) ->
  if auction.live_start_at
    ''
  else
    "Closes #{moment(auction.end_at).format("MMM D [at] ha", timezone: moment.tz.guess())}"

module.exports = ->
  user = User.instantiate()

  each USER_HOME_PAGE, (module, index) ->
    $el = $("#hpm-#{module.key}-#{index}")

    metaphysics(
      query: query
      variables:
        key: "#{module.key}",
        id: "#{module.params?.id}"
        related_artist_id: "#{module.params?.related_artist_id}"
        followed_artist_id: "#{module.params?.followed_artist_id}"
        timezone: moment.tz.guess()
      req: { user: user }
    ).then ({ home_page: { artwork_module } }) ->
      module = artwork_module

      return $el.remove() unless module.results?.length or module.key is 'followed_artists'
      return setupActiveBidsView(module, $el.find('.abrv-content'), user) if module.key is 'active_bids'
      return setupFollowedArtistsView(module, $el, user) if module.key is 'followed_artists'

      options = 
        $el: $el
        artworks: module.results
        title: module.title
        viewAllUrl: viewAllUrl module
        hasContext: contexts[module.key]?
        user: user
        category: module.key is 'genes' or module.key is 'generic_gene'

      if module.key is 'related_artists'
        options.annotation = relatedArtistsAnnotation 
          based_on: module.context?.based_on

      view = new ArtworkBrickRailView options
        
      view.on 'post-render', ->

        setupFollowButton
          $el: $el.find(".abrv-follow-button")
          module: module
          user: user
          modelName: options.category ? 'gene' : 'artist'

         if contexts[module.key]?
            html = contexts[module.key](module)
            $el.find(".abrv-context").html html

      view.render()
    .catch (err) ->
      $el.remove()
      console.warn('Error rendering homepage rails', err.stack)



