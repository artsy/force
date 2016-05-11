_ = require 'underscore'
{ USER_HOME_PAGE } = require('sharify').data
CurrentUser = require '../../../models/current_user.coffee'
metaphysics = require '../../../lib/metaphysics.coffee'
query = require '../queries/module.coffee'
Artworks = require '../../../collections/artworks.coffee'
ArtworkRailView = require '../../../components/artwork_rail/client/view.coffee'
viewHelpers = require '../view_helpers.coffee'

module.exports = ->
  user = CurrentUser.orNull()

  _.each USER_HOME_PAGE, (module) ->
    metaphysics(
      query: query
      variables: include_keys: ["#{module.key}"]
      req: { user: user }
    ).then ({ home_page_modules }) ->
      module = home_page_modules[0]
      artworks = new Artworks module.results
      view = new ArtworkRailView
        el: $("#hpm-#{module.key}")
        collection: artworks
        title: module.title
        viewAllUrl: viewHelpers.viewAllUrl(module)

      artworks.trigger 'sync'


