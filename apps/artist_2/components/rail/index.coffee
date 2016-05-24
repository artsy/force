Backbone = require 'backbone'
_ = require 'underscore'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
{ formatShowDetail } = require '../../view_helpers.coffee'
artistsTemplate = -> require('./artists.jade') arguments...
showsTemplate = -> require('./shows.jade') arguments...
articlesTemplate = -> require('./articles.jade') arguments...
showHelpers = require '../../../../components/show_cell/helpers.coffee'

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
  articles:
    render: (items) ->
     articlesTemplate { items }

  artists:
    render: (items) ->
      artistsTemplate { items }

    postRenderSection: ( { $el, section, items } )->
      setupFollowButtons $el: $el, items: items, kind: 'artist'

  shows:
    render: (items) ->
      showsTemplate { items, formatShowDetail, showHelpers }

module.exports = ({ $el, section, items }) ->
  $el.find('.js-mgr-cells').html sections[section].render items
  _.defer ->
    initCarousel $el,
      advanceBy: 4
    sections[section].postRenderSection? { $el, section, items }

  $el
