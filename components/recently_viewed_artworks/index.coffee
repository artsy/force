Cookies = require '../cookies/index.coffee'
metaphysics = require '../../lib/metaphysics.coffee'
query = require './artwork_query.coffee'
_ = require 'underscore'
User = require '../../models/user.coffee'
{ excludeList } = require './exclude_list.coffee'
COOKIE_NAME = 'recently-viewed-artworks'
COOKIE_EXPIRY = 60 * 60 * 24 * 365
ARTWORK_COUNT = 6

template = -> require('./index.jade') arguments...

cookieValue = ->
  JSON.parse(Cookies.get(COOKIE_NAME) or '[]')

currentPathIsInExcludeList = ->
  _.each(excludeList, (urlPattern) ->
    if typeof urlPattern is 'object'
      return true if window.location.pathname.match(urlPattern)
    else if typeof urlPattern is 'string'
      return true if window.location.pathname is urlPattern
  )
  return false

module.exports =
  setCookie: (artworkId) ->
    uniqueArtworkIds = _.without(cookieValue(), artworkId)
    uniqueArtworkIds.unshift(artworkId)
    artworkIdsToStore = uniqueArtworkIds.slice(0, ARTWORK_COUNT)
    Cookies.set COOKIE_NAME, JSON.stringify(artworkIdsToStore), expires: COOKIE_EXPIRY

  setupRail: ($el) ->
    return if currentPathIsInExcludeList()
    artworkIds = cookieValue()
    return unless artworkIds.length > 0
    user = User.instantiate()
    return unless user.isLoggedIn() && user.hasLabFeature('Recently Viewed Artworks')
    send = method: 'post', query: query, variables: ids: artworkIds
    metaphysics send
      .then (data) ->
        $el.html template
          artworks: data.artworks
        $el.fillwidthLite
          gutterSize: 15
          targetHeight: 170
          dontResizeUp: true
