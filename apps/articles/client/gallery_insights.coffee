_ = require 'underscore'
sd = require('sharify').data
CTABarView = require '../../../components/cta_bar/view.coffee'
Backbone = require 'backbone'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
marketoForm = -> require('../templates/marketo_form.jade') arguments...

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
      mode: 'gallery-insights'
      name: 'gallery-insights-signup'
      persist: true
      subHeadline: "Receive periodical insights from Artsy's Gallery Team"
    @$('.articles-insights-show').show()
    @$('.articles-insights-section').show()

  setupCTAWaypoints: ->
    return if @ctaBarView.previouslyDismissed()
    @ctaBarView.render()
    MktoForms2?.whenReady (form) -> $('#mktoForm_1230').removeAttr 'id'
    @ctaBarView.$el?.find('.cta-bar-small-form').replaceWith marketoForm()
    @$el.append @ctaBarView.$el
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
