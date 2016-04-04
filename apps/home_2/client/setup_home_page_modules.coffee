_ = require 'underscore'
{ USER_HOME_PAGE } = require('sharify').data
CurrentUser = require '../../../models/current_user.coffee'
UserHomePage = require '../models/user_home_page.coffee'
query = require '../queries/module.coffee'
Artworks = require '../../../collections/artworks.coffee'
ArtworkRailView = require '../../../components/artwork_rail/client/view.coffee'

module.exports = ->
  # set up client-side rails
  user = CurrentUser.orNull()
  console.log 'here', user

  _.each USER_HOME_PAGE, (module) ->
    homepage = new UserHomePage
    homepage.fetch(
      query: query
      variables: include_keys: ["#{module.key}"]
      currentUser: user
    ).then ->
      module = homepage.modules.first()
      artworks = new Artworks module.get('results')
      view = new ArtworkRailView
        el: $("#hpm-#{module.get('key')}")
        collection: artworks
        title: module.get('title')

      artworks.trigger 'sync'


