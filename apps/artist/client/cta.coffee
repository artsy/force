{ MEDIUM, CURRENT_USER } = require('sharify').data
{ contains } = require 'underscore'
CTABarView = require '../../../components/cta_bar/view.coffee'
ArtistPageCTAView = require '../../../components/artist_page_cta/view.coffee'

module.exports = (artist) ->
  # Temporarily always show new CTA to lab feature users
  if CURRENT_USER? and contains(CURRENT_USER.lab_features, 'New Artist Page CTA')
    artistPageCTAView = new ArtistPageCTAView
      artist: artist

    $('body').append artistPageCTAView.render().$el
    return

  return unless MEDIUM is 'search' and not CURRENT_USER?

  name = 'artist_cta'
  ctaHeadline = "Get updates on new shows and works by #{artist.get('name')}."
  modalCopy = "Get the latest new shows and works by #{artist.get('name')}."

  ctaBarView = new CTABarView
    headline: ctaHeadline
    name: name
    mode: ''
    persist: true
    modalOptions:
      copy: modalCopy
      destination: "#{artist.href()}/follow"

  unless ctaBarView.previouslyDismissed()
    $('body').append ctaBarView.render().$el

    $('#artwork-section').waypoint (direction) ->
      ctaBarView.transitionIn() if direction is 'down'
    , { offset: 'bottom-in-view' }
