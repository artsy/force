{ REFERRER, APP_URL, CURRENT_USER, NEW_ARTIST_PAGE_CTA } = require('sharify').data
{ contains } = require 'underscore'
CTABarView = require '../../../components/cta_bar/view.coffee'
ArtistPageCTAView = require '../../../components/artist_page_cta/view.coffee'
splitTest = require '../../../components/split_test/index.coffee'

module.exports = (artist) ->
  # When user is logged-out and the referrer is an external source
  return if CURRENT_USER || REFERRER?.includes(APP_URL)

  # Track AB Test
  splitTest('new_artist_page_cta').view()

  # AB Test new CTA
  if NEW_ARTIST_PAGE_CTA is 'new_cta'
    artistPageCTAView = new ArtistPageCTAView
      artist: artist

    $('body').append artistPageCTAView.render().$el
    artistPageCTAView.initializeMailcheck()
    setTimeout (=> artistPageCTAView.$el.removeClass 'initial'), 500
    return

  # Old CTA
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
