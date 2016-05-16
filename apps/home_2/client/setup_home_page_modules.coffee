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
        viewAllUrl: viewHelpers.viewAllUrl(module)

      artworks.trigger 'sync'


