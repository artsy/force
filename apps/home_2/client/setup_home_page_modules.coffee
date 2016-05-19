_ = require 'underscore'
{ USER_HOME_PAGE } = require('sharify').data
CurrentUser = require '../../../models/current_user.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'
query = require '../queries/module.coffee'
Artworks = require '../../../collections/artworks.coffee'
ArtworkRailView = require '../../../components/artwork_rail/client/view.coffee'
{ viewAllUrl, timeSpan } = require '../view_helpers.coffee'
fairTemplate = -> require('../templates/contexts/_fair.jade') arguments...

contexts =
  iconic_artists: -> # noop
  followed_artists: -> # noop
  live_auctions: -> # noop
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
      artworks = new Artworks module.results
      view = new ArtworkRailView
        $el: $("#hpm-#{module.key}-#{index}")
        collection: artworks
        title: module.title
        viewAllUrl: viewAllUrl module
        hasContext: contexts[module.key]?

      artworks.trigger 'sync'

      if contexts[module.key]?
        view.on 'post-render', ->
          html = contexts[module.key](module)
          $("#hpm-#{module.key}-#{index} .arv-context").html html


