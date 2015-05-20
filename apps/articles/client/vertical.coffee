_ = require 'underscore'
sd = require('sharify').data
CTABarView = require '../../../components/cta_bar/view.coffee'

module.exports.init = ->
  if sd.VERTICAL.id is '55550be07b8a750300db8430'
    ctaBarView = new CTABarView
      headline: 'Artsy Insights for Galleries'
      mode: 'smaller-with-email'
      name: 'gallery-insights-signup'
      persist: true
      subHeadline: "Recieve periodical insights from Artsy's Gallery Team"
      email: sd.CURRENT_USER?.email or ''
    unless ctaBarView.previouslyDismissed()
      $('body').append ctaBarView.render().$el
      $('.js-articles-feed-articles').waypoint (direction) ->
        ctaBarView.transitionIn() if direction is 'down'
      , { offset: '50%' }