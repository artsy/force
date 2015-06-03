_ = require 'underscore'
sd = require('sharify').data
CTABarView = require '../../../components/cta_bar/view.coffee'

module.exports.init = ->
  if (sd.ARTICLE?.vertical_id is '55550be07b8a750300db8430' or sd.VERTICAL?.id is '55550be07b8a750300db8430') and sd.MAILCHIMP_SUBSCRIBED is false

    #Show input forms
    $('.articles-insights-show').show()
    $('.articles-insights-vertical').show()

    # CTA Bar
    ctaBarView = new CTABarView
      headline: 'Artsy Insights for Galleries'
      mode: 'smaller-with-email'
      name: 'gallery-insights-signup'
      persist: true
      subHeadline: "Recieve periodical insights from Artsy's Gallery Team"
      email: sd.CURRENT_USER?.email or ''
    unless ctaBarView.previouslyDismissed()
      $('body').append ctaBarView.render().$el
      $('.article-container').waypoint (direction) ->
        ctaBarView.transitionIn() if direction is 'down'
      , { offset: -200 }
      $('.article-container').waypoint (direction) ->
        ctaBarView.transitionOut() if direction is 'down'
        ctaBarView.transitionIn() if direction is 'up'
      , { offset: 'bottom-in-view' }
      $('.js-articles-feed-articles').waypoint (direction) ->
        ctaBarView.transitionIn() if direction is 'down'
      ,{ offset: '50%' }
      $('.js-articles-feed-articles').waypoint (direction) ->
        ctaBarView.transitionOut() if direction is 'down'
        ctaBarView.transitionIn() if direction is 'up'
      , { offset: 'bottom-in-view' }

    # Subscribe click
    $('.js-articles-insights-subscribe').click (e)->
      $(e.currentTarget).addClass 'is-loading'
      $.ajax
        type: 'POST'
        url: '/articles/form'
        data:
          email: $(e.currentTarget).prev('input').val()
          fname: sd.CURRENT_USER?.name?.split(' ')[0] or= ''
          lname: sd.CURRENT_USER?.name?.split(' ')[1] or= ''
        error: (xhr) ->
          $(e.currentTarget).removeClass 'is-loading'
          $('.articles-insights-subheader').text(xhr.responseText)
          $('.cta-bar-header h3').text(xhr.responseText)
        success: (res) =>
          $(e.currentTarget).removeClass 'is-loading'
          $('.articles-insights').fadeOut()
          $('.articles-insights-thanks').fadeIn()
          $('.cta-bar-small').fadeOut( ->
            $('.cta-bar-thanks').fadeIn()
          )
          setTimeout( ->
            ctaBarView.close()
          ,2000)