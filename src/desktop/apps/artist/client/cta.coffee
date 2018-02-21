{ ARTIST_PAGE_CTA_ENABLED } = require('sharify').data
ArtistPageCTAView = require '../../../components/artist_page_cta/view.coffee'

module.exports = (artist) ->
  return unless ARTIST_PAGE_CTA_ENABLED

  artistPageCTAView = new ArtistPageCTAView
    artist: artist

  $('body').append artistPageCTAView.render().$el
  artistPageCTAView.initializeMailcheck()
  setTimeout (=> artistPageCTAView.$el.removeClass 'initial'), 500
  return
