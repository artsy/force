follow = require '../../lib/follow.coffee'
openArtworkClassificationModal = require './components/artwork_classification_modal/index.coffee'

module.exports = ->
  $el = $('.js-artwork-metadata')
  $attribution = $el.find '.js-artwork-metadata-attribution-class'

  $attribution.on 'click', (e) =>
    e.preventDefault()
    openArtworkClassificationModal()

  follow $el.find '.js-artist-follow-button'
