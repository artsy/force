{ MEDIUM, CURRENT_USER } = require('sharify').data
Cookies = require '../../../components/cookies/index.coffee'
ZigZagBanner = require '../../../components/zig_zag_banner/index.coffee'
AuthModalView = require '../../../components/auth_modal/view.coffee'
CTABarView = require '../../../components/cta_bar/view.coffee'
splitTest = require '../../../components/split_test/index.coffee'
{ track, snowplowStruct } = require '../../../lib/analytics.coffee'

module.exports = (artist, headerView) ->
  return unless MEDIUM is 'search' and not CURRENT_USER?

  name = 'artist_cta'
  outcome = splitTest('artist_cta').outcome()
  ctaHeadline = "Get updates on new shows and works by #{artist.get('name')}."
  modalCopy = "Get the latest new shows and works by #{artist.get('name')}."

  if outcome is 'zig_zag'
    return if Cookies.get(name)?

    ($followButton = $('#artist-follow-button'))
      # Remove the normal follow button events; attach our own
      .off().click (e) ->
        e.preventDefault()

        new AuthModalView
          width: '500px'
          mode: 'register'
          copy: modalCopy
          destination: "#{artist.href()}/follow"

        Cookies.set name, 1, expires: 31536000
        track.click "#{name} action"
        snowplowStruct name, 'action', outcome

    zigZagBannerView = new ZigZagBanner
      name: name
      $target: $followButton
      message: ctaHeadline
      persist: false # Cookie-ing handled above instead
      backwards: true

    zigZagBannerView.$('.zzb-close').click ->
      track.click "#{name} clicked close"
      snowplowStruct name, 'closed', outcome

  if outcome is 'footer_modal_link' or outcome is 'footer_modal_inline'
      ctaBarView = new CTABarView
        headline: ctaHeadline
        mode: outcome.replace 'footer_modal_', ''
        name: name
        persist: true
        modalOptions:
          copy: modalCopy
          destination: "#{artist.href()}/follow"

      unless ctaBarView.previouslyDismissed()
        $('body').append ctaBarView.render().$el

        $('#artwork-section').waypoint (direction) ->
          ctaBarView.transitionIn() if direction is 'down'
        , { offset: 'bottom-in-view' }

        ctaBarView.$('.cta-bar-button').click ->
          track.click "#{name} action"
          snowplowStruct name, 'action', outcome

        ctaBarView.$('.cta-bar-form').submit ->
          track.click "#{name} action"
          snowplowStruct name, 'action', outcome

        ctaBarView.$('.cta-bar-defer').click ->
          track.click "#{name} deferred"
          snowplowStruct name, 'deferred', outcome
