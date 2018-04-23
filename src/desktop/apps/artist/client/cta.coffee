{ ARTIST_PAGE_CTA_ENABLED } = require('sharify').data
ArtistPageCTAView = require '../../../components/artist_page_cta/view.coffee'

module.exports = (artist) ->
  console.log ARTIST_PAGE_CTA_ENABLED
  return unless ARTIST_PAGE_CTA_ENABLED

  artistPageCTAView = new ArtistPageCTAView
    artist: artist

  console.log('create artist page cta view')
  console.log('html:', artistPageCTAView.render().$el)
  $('body').append artistPageCTAView.render().$el

  console.log('html:', artistPageCTAView.render().$el)
  artistPageCTAView.initializeMailcheck()
  setTimeout (=> artistPageCTAView.$el.removeClass 'initial'), 500
  return
