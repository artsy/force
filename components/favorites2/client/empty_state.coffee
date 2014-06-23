_ = require 'underscore'
FeaturedLinks = require '../../../collections/featured_links.coffee'
Backbone = require 'backbone'
emptyTemplate = -> require('../templates/empty_state.jade') arguments...
{ API_URL, EMPTY_COLLECTION_SET_ID } = require('sharify').data

module.exports = class FavoritesEmptyStateView extends Backbone.View

  initialize: ->
    new FeaturedLinks().fetch
      url: "#{API_URL}/api/v1/set/#{EMPTY_COLLECTION_SET_ID}/items"
      success: (featuredLinks) =>
        @$el.html(
          emptyTemplate featuredLinks: _.sample(featuredLinks.models, 4)
        )

  events:
    'click .favorites2-empty-state-header-cta .icon-heart': 'onClickHeart'

  onClickHeart: ->
    @$('.favorites2-empty-state-header-cta .icon-heart').addClass 'is-active'