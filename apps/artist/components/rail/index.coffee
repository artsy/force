Backbone = require 'backbone'
_ = require 'underscore'
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
{ formatShowDetail, nShowsByDate } = require '../../view_helpers.coffee'
artistsTemplate = -> require('./artists.jade') arguments...
showsTemplate = -> require('./shows.jade') arguments...
articlesTemplate = -> require('./articles.jade') arguments...
showHelpers = require '../../../../components/show_cell/helpers.coffee'

setupFollowButtons = ({ $el, items, kind }) =>
  following = new Following(null, kind: kind) if CurrentUser.orNull()
  ids = $el.find('.follow-button').map ->

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
    render: ({ items, showMore, baseHref}) ->
      viewAllUrl = baseHref + '/articles'
      articlesTemplate { items, showMore, viewAllUrl }

  artists:
    render: ({ items, showMore, baseHref}) ->
      viewAllUrl = baseHref + '/related-artists'
      artistsTemplate { items, showMore, viewAllUrl }

    postRenderSection: ( { $el, section, items } )->
      setupFollowButtons $el: $el, items: items, kind: 'artist'

  shows:
    render: ({ items, showMore, baseHref}) ->
      items = nShowsByDate(items, 15)
      viewAllUrl = baseHref + '/shows'
      showsTemplate { items, formatShowDetail, showHelpers, showMore, viewAllUrl }

module.exports = ({ $el, section, count, items, baseHref}) ->
  showMore = count > 15
  $el.find('.js-mgr-cells').html sections[section].render { items, showMore, baseHref }
  _.defer ->
    initCarousel $el,
      advanceBy: 4
    sections[section].postRenderSection?({ $el, section, items })

  $el
