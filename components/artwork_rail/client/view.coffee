Backbone = require 'backbone'
User = require '../../../models/user.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
initCarousel = require '../../merry_go_round/horizontal_nav_mgr.coffee'
openInquiryQuestionnaireFor = require '../../inquiry_questionnaire/index.coffee'
analyticsHooks = require '../../../lib/analytics_hooks.coffee'
template = -> require('../templates/index.jade') arguments...

module.exports = class ArtworkRailView extends Backbone.View
  className: 'arv-container'
  events:
    'click .artwork-item-contact-seller': 'contactSeller'

  initialize: (options) ->
    {
      @$el,
      @title,
      @viewAllUrl,
      @imageHeight = 220,
      @railId,
      @collection,
      @includeContact = true
      @hasContext
    } = options
    @user ?= User.instantiate()
    @collection.on 'sync', @render, this

  contactSeller: (e) ->
    e.preventDefault()

    analyticsHooks.trigger 'rail:clicked-contact', e

    inquiry = new ArtworkInquiry notification_delay: @delayBy
    artwork = @collection.get $(e.currentTarget).data 'id'

    if artwork
      openInquiryQuestionnaireFor
        user: @user
        artwork: artwork
        inquiry: inquiry

  render: ->
    @$el.html template
      artworks: @collection.models
      title: @title
      viewAllUrl: @viewAllUrl
      imageHeight: @imageHeight
      railId: @railId
      includeContact: @includeContact
      hasContext: @hasContext

    @postRender()
    this

  postRender: ->
    initCarousel @$('.js-my-carousel'),
      imagesLoaded: true
      wrapAround: false
    , (carousel) =>
      @trigger 'post-render'
      @carousel = carousel

      # Hide arrows if the cells don't fill the carousel width
      @cellWidth = @$('.js-mgr-cell')
        .map (i, e) -> $(e).outerWidth true
        .get()
        .reduce (prev, curr) -> prev + curr

      unless @cellWidth > @$('.js-my-carousel').width()
        @$('.mgr-navigation').addClass 'is-hidden'

  remove: ->
     @collection.off 'sync'
     super
