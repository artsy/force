Backbone = require 'backbone'
_ = require 'underscore'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
artistsTemplate = -> require('./templates/artists.jade') arguments...
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
CurrentUser = require '../../../../models/current_user.coffee'

setupFollowButtons = ({ $el, items, kind }) =>
  ids = $el.find('.follow-button').map ->
    following = new Following(null, kind: kind) if CurrentUser.orNull()

    id = ($el = $(this)).data 'id'
    new FollowButton
      context_page: "Artists page"
      context_module: "Overview tab, related #{kind} rail"
      following: following
      model: new Backbone.Model id: id
      modelName: kind
      el: $el
      href: _.findWhere(items, id:id).href
    id

  following?.syncFollows ids

sections =
  artists:
    renderSection: ({ $el, section, items }) ->
      _.each items, (artist) ->
        artist.counts.artworks ?= 0
        artist.counts.for_sale_artworks ?= 0
      artistsTemplate items: items

    postRenderSection: ( { $el, section, items } )->
      setupFollowButtons $el: $el, items: items, kind: 'artist'

module.exports = ({ $el, section, items }) ->
  $el.find('.js-mgr-cells').html sections[section].renderSection { $el, section, items }
  _.defer ->
    initCarousel $el
    sections[section].postRenderSection { $el, section, items }

  $el
