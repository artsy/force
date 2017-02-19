_ = require 'underscore'
Backbone = require 'backbone'
{ CLIENT } = require('sharify').data
initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
CurrentUser = require '../../../../models/current_user.coffee'
artistsTemplate = -> require('./artists.jade') arguments...

setupFollowButtons = ({ $el, relatedArtists, kind }) =>
  following = new Following(null, kind: kind) if CurrentUser.orNull()
  ids = $el.find('.follow-button').map ->

    id = ($el = $(this)).data 'id'
    new FollowButton
      context_page: "Artwork page"
      context_module: "Related artist rail"
      following: following
      model: new Backbone.Model id: id
      modelName: kind
      el: $el
      href: _.findWhere(relatedArtists, id:id).href
    id

  following?.syncFollows ids

render = ({ relatedArtists, showMore, baseHref}) ->
  viewAllUrl = sd.CLIENT.artists[0].href + '/related-artists'
  artistsTemplate { relatedArtists, showMore, viewAllUrl }

module.exports = ->
  relatedArtists = sd.CLIENT.artists[0].artists
  showMore = relatedArtists.length > 15
  $el = $('.js-artwork-artist-related-rail__content')
  relatedArtists = _.take(relatedArtists, 15)

  $el.find('.js-mgr-cells').html render({ relatedArtists, showMore })
  _.defer ->
    initCarousel $el, { advanceBy: 4 }, setupFollowButtons({$el: $el, relatedArtists: relatedArtists, kind: 'artist'})
