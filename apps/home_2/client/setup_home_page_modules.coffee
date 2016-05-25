_ = require 'underscore'
{ USER_HOME_PAGE } = require('sharify').data
CurrentUser = require '../../../models/current_user.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'
query = require '../queries/module.coffee'
ArtworkBrickRailView = require '../../../components/artwork_brick_rail/view.coffee'
{ viewAllUrl, timeSpan } = require '../view_helpers.coffee'
iconicArtistsTemplate = -> require('../templates/contexts/_iconic_artists.jade') arguments...
auctionTemplate = -> require('../templates/contexts/_auction.jade') arguments...
fairTemplate = -> require('../templates/contexts/_fair.jade') arguments...

contexts =
  iconic_artists: (module) ->
    iconicArtistsTemplate artists: module.context.artists
  followed_artists: -> # noop
  live_auctions: (module) ->
    auctionTemplate auction: module.context
  current_fairs: (module) ->
    fairTemplate fair: module.context, timeSpan: timeSpan

module.exports = ->
  user = CurrentUser.orNull()

  _.each USER_HOME_PAGE, (module, index) ->
    metaphysics(
      query: query
      variables: key: "#{module.key}", id: "#{module.params?.id}"
      req: { user: user }
    ).then ({ home_page_module }) ->
      module = home_page_module
      view = new ArtworkBrickRailView
        $el: $("#hpm-#{module.key}-#{index}")
        artworks: module.results
        title: module.title
        viewAllUrl: viewAllUrl module
        hasContext: contexts[module.key]?

      view.render()

      if contexts[module.key]?
        view.on 'post-render', ->
          html = contexts[module.key](module)
          $("#hpm-#{module.key}-#{index} .arv-context").html html


