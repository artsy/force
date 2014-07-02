_ = require 'underscore'
FeaturedLinks = require '../../../collections/featured_links.coffee'
Backbone = require 'backbone'
emptyTemplate = -> require('../templates/empty_state.jade') arguments...
analytics = require '../../../lib/analytics.coffee'
Cookies = require 'cookies-js'
{ API_URL, EMPTY_COLLECTION_SET_ID, CURRENT_PATH } = require('sharify').data

module.exports = class FavoritesEmptyStateView extends Backbone.View

  initialize: ->
    new FeaturedLinks().fetch
      url: "#{API_URL}/api/v1/set/#{EMPTY_COLLECTION_SET_ID}/items"
      success: (featuredLinks) =>
        @$el.html(
          emptyTemplate {
            featuredLinks: _.sample(featuredLinks.models, 4)
            inSetView: CURRENT_PATH.match('/collection/')
            inTwoButtonMode: ((Cookies.get('save-controls') or
              analytics.getProperty('ab:save:controls')) is 'two button')
          }
        )

  events:
    'click .favorites2-empty-state-header-cta .icon-heart': 'onClickHeart'

  onClickHeart: ->
    @$('.favorites2-empty-state-header-cta .icon-heart').addClass 'is-active'