{ REFERRER, APP_URL, CURRENT_USER, SHOW_ARTIST_CTA } = require('sharify').data
{ contains } = require 'underscore'
CTABarView = require '../../../components/cta_bar/view.coffee'
ArtistPageCTAView = require '../../../components/artist_page_cta/view.coffee'

module.exports = (artist) ->
  # Temporarily always show new CTA if the query param is present
  if SHOW_ARTIST_CTA
    artistPageCTAView = new ArtistPageCTAView
      artist: artist

    $('body').append artistPageCTAView.render().$el
    setTimeout (=> artistPageCTAView.$el.removeClass 'initial'), 500
    return

  # When user is logged-out and the referrer is an external source
  # show cta bar
  if !CURRENT_USER and !REFERRER?.includes(APP_URL)
    name = 'artist_cta'
    ctaHeadline = "Yes, tell me when Artsy adds new works by #{artist.get('name')}"
    modalCopy = "Join Artsy to discover new works by #{artist.get('name')} and more artists you love"

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
