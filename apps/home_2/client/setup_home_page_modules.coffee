{ each } = require 'underscore'
{ USER_HOME_PAGE } = require('sharify').data
User = require '../../../models/user.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'
query = require '../queries/module.coffee'
MyActiveBids = require '../../../components/my_active_bids/view.coffee'
ArtworkBrickRailView = require '../../../components/artwork_brick_rail/view.coffee'
{ viewAllUrl, timeSpan } = require '../view_helpers.coffee'
FollowedArtistsRailView = require '../components/followed_artists/view.coffee'
setupFollowButton = require '../components/follow_button/index.coffee'
iconicArtistsTemplate = -> require('../components/iconic_artists_context/templates/index.jade') arguments...
auctionTemplate = -> require('../components/auction_context/templates/index.jade') arguments...
fairTemplate = -> require('../components/fair_context/templates/index.jade') arguments...

contexts =
  iconic_artists: (module) ->
    iconicArtistsTemplate artists: module.context.artists
  live_auctions: (module) ->
    auctionTemplate auction: module.context
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

module.exports = ->
  user = User.instantiate()

  each USER_HOME_PAGE, (module, index) ->
    $el = $("#hpm-#{module.key}-#{index}")

    metaphysics(
      query: query
      variables: key: "#{module.key}", id: "#{module.params?.id}"
      req: { user: user }
    ).then ({ home_page: { artwork_module } }) ->
      module = artwork_module

      return $el.remove() unless module.results?.length or module.key is 'followed_artists'
      return setupActiveBidsView(module, $el.find('.abrv-content'), user) if module.key is 'active_bids'
      return setupFollowedArtistsView(module, $el, user) if module.key is 'followed_artists'

      view = new ArtworkBrickRailView
        $el: $el
        artworks: module.results
        title: module.title
        viewAllUrl: viewAllUrl module
        hasContext: contexts[module.key]?
        followAnnotation: module.context?.based_on?.name
        user: user
        category: module.key is 'genes' or module.key is 'generic_gene'

      view.on 'post-render', ->

        setupFollowButton
          $el: $el.find(".abrv-follow-button")
          module: module
          user: user

         if contexts[module.key]?
            html = contexts[module.key](module)
            $el.find(".abrv-context").html html

      view.render()
    .catch (err) ->
      $el.remove()
      console.warn('Error rendering homepage rails', err.stack)



