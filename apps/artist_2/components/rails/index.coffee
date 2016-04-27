initCarousel = require '../../../../components/merry_go_round/horizontal_nav_mgr.coffee'
artworksTemplate = require './artworks_rail.jade'

module.exports =
  postRender: ($el) ->
    initCarousel $el.find('.js-artist-rail'), imagesLoaded: true

  fetchArtworks: (artist) ->
    artist.related().artworks.fetch
      data:
        size: 20
        sort: '-partner_updated_at'

  renderArtworks: ({ $el, artist }) ->
    $el.html artworksTemplate
      title: artist.get('name')
      viewAllUrl: artist.href()
      artworks: artist.related().artworks.models
    _.defer @postRender


