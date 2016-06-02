_ = require 'underscore'
{ USER_HOME_PAGE } = require('sharify').data
CurrentUser = require '../../../models/current_user.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'
query = require '../queries/module.coffee'
ArtworkBrickRailView = require '../../../components/artwork_brick_rail/view.coffee'
{ viewAllUrl, timeSpan } = require '../view_helpers.coffee'
FollowedArtistsRailView = require '../components/followed_artists/view.coffee'
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

setupFollowedArtistsView = (module, $el) ->
  view = new FollowedArtistsRailView
    $el: $el
    module: module

  view.render()

module.exports = ->
  user = CurrentUser.orNull()

  _.each USER_HOME_PAGE, (module, index) ->
    metaphysics(
      query: query
      variables: key: "#{module.key}", id: "#{module.params?.id}"
      req: { user: user }
    ).then ({ home_page_module }) ->
      module = home_page_module
      $el = $("#hpm-#{module.key}-#{index}")
      return setupFollowedArtistsView(module, $el) if module.key is 'followed_artists'
      view = new ArtworkBrickRailView
        $el: $el
        artworks: module.results
        title: module.title
        viewAllUrl: viewAllUrl module
        hasContext: contexts[module.key]?
        followAnnotation: module.context?.based_on?.name

      view.render()

      if contexts[module.key]?
        view.on 'post-render', ->
          html = contexts[module.key](module)
          $el.find(".abrv-context").html html


