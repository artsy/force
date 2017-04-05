Backbone = require 'backbone'
metaphysics = require '../../../../../lib/metaphysics'
query = require './query'
ArtistsToFollowView = require './view'

class State extends Backbone.Model

module.exports = (user) ->
  initialType = if user then 'SUGGESTED' else 'TRENDING'

  state = new State type: initialType

  metaphysics
    query: query
    variables: type: initialType
    req: { user: user }
  .then ({ home_page: { artist_module: { results } } }) =>
    view = new ArtistsToFollowView
      state: state
      results: results
      user: user
      el: $('.artists-to-follow')

    state.trigger 'change'

