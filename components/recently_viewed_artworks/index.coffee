Cookies = require '../cookies/index.coffee'
_ = require 'underscore'

COOKIE_NAME = 'recently-viewed-artworks'
ARTWORK_COUNT = 6

module.exports =
  setCookie: (artworkId) ->
    recentlyViewedArtworks = JSON.parse(Cookies.get(COOKIE_NAME) or '[]')
    uniqueArtworkIds = _.without(recentlyViewedArtworks, artworkId)
    uniqueArtworkIds.unshift(artworkId)
    artworkIdsToStore = uniqueArtworkIds.slice(0, ARTWORK_COUNT)
    Cookies.set COOKIE_NAME, JSON.stringify(artworkIdsToStore), expires: (60 * 60 * 24 * 365)
