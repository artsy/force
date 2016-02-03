_ = require 'underscore'
sd = require('sharify').data
CTABarView = require '../../../components/cta_bar/view.coffee'
Backbone = require 'backbone'

module.exports = class GalleryInsightsView extends Backbone.View

  initialize: ->
    return unless @eligibleToSignUp()
    @createAndShowCTAForm()
    @setupCTAWaypoints()

  inGIArticlePage: ->
    sd.GALLERY_INSIGHTS_SECTION_ID in (sd.ARTICLE?.section_ids or [])

  inGIVerticalPage: ->
    sd.SECTION?.id is sd.GALLERY_INSIGHTS_SECTION_ID

  eligibleToSignUp: ->
    (@inGIArticlePage() or @inGIVerticalPage()) and not sd.MAILCHIMP_SUBSCRIBED

  createAndShowCTAForm: ->
    @ctaBarView = new CTABarView
      headline: 'Artsy Insights for Galleries'
      mode: 'smaller-with-email'
      name: 'gallery-insights-signup'
      persist: true
      subHeadline: "Receive periodical insights from Artsy's Gallery Team"
      email: sd.CURRENT_USER?.email or ''
    @$('.articles-insights-show').show()
    @$('.articles-insights-section').show()

  setupCTAWaypoints: ->
    return if @ctaBarView.previouslyDismissed()
    @$el.append @ctaBarView.render().$el
    if @inGIArticlePage()
      @$(".article-container[data-id=#{sd.ARTICLE.id}]").waypoint (direction) =>
        @ctaBarView.transitionIn() if direction is 'down'
      , { offset: -200 }
      @$(".article-container[data-id=#{sd.ARTICLE.id}]").waypoint (direction) =>
        @ctaBarView.transitionOut() if direction is 'down'
        @ctaBarView.transitionIn() if direction is 'up'
      , { offset: 'bottom-in-view' }
    else if @inGIVerticalPage()
      @$('.js-articles-feed-articles').waypoint (direction) =>
        @ctaBarView.transitionIn() if direction is 'down'
      ,{ offset: '50%' }
      @$('.js-articles-feed-articles').waypoint (direction) =>
        @ctaBarView.transitionOut() if direction is 'down'
        @ctaBarView.transitionIn() if direction is 'up'
      , { offset: 'bottom-in-view' }

  events:
    'click .js-articles-insights-subscribe': 'onSubscribe'

  onSubscribe: (e) ->
    $(e.currentTarget).addClass 'is-loading'
    $.ajax
      type: 'POST'
      url: '/gallery-insights/form'
      data:
        email: @$(e.currentTarget).prev('input').val()
        fname: sd.CURRENT_USER?.name?.split(' ')[0] or= ''
        lname: sd.CURRENT_USER?.name?.split(' ')[1] or= ''
      error: (xhr) =>
        @$(e.currentTarget).removeClass 'is-loading'
        @$('.articles-insights-subheader').text(xhr.responseText)
        @$('.cta-bar-header h3').text(xhr.responseText)
      success: (res) =>
        @$(e.currentTarget).removeClass 'is-loading'
        @$('.articles-insights').fadeOut()
        @$('.articles-insights-thanks').fadeIn()
        @$('.cta-bar-small').fadeOut( ->
          @$('.cta-bar-thanks').fadeIn()
        )
        setTimeout((-> @ctaBarView.close()), 2000)
