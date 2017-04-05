_ = require 'underscore'
tabs = require '../../../../components/side_tabs/index'
gradient = require '../../../../components/gradient_blurb/index'

module.exports = ->
  tabs $('.js-artwork-artist-tabs')

  artistsWithTabs = _.filter(sd.CLIENT.artists, (artist) ->
    return artist if artist.exhibition_highlights?.length > 0 or artist.blurb or artist.biography_blurb?.text or artist.articles?.length
  )

  _.each(artistsWithTabs, (artist, i) ->
    if artist.exhibition_highlights?.length > 0
      $artistBlock = $('.artwork-section.artwork-artist')[i]
      $el = $($artistBlock).find('.artwork-artist__content__biography')
      gradient($el, limit: 175) if $el.length
  )
