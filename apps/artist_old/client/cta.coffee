{ MEDIUM, CURRENT_USER } = require('sharify').data
AuthModalView = require '../../../components/auth_modal/view.coffee'
CTABarView = require '../../../components/cta_bar/view.coffee'
{ track, snowplowStruct } = require '../../../lib/analytics.coffee'

module.exports = (artist) ->
  return unless MEDIUM is 'search' and not CURRENT_USER?

  name = 'artist_cta'
  ctaHeadline = "Get updates on new shows and works by #{artist.get('name')}."
  modalCopy = "Get the latest new shows and works by #{artist.get('name')}."

  ctaBarView = new CTABarView
    headline: ctaHeadline
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
