Backbone = require 'backbone'
User = require '../../../models/user'
ArtworkInquiry = require '../../../models/artwork_inquiry'
initCarousel = require '../../merry_go_round/horizontal_nav_mgr'
openInquiryQuestionnaireFor = require '../../inquiry_questionnaire/index'
analyticsHooks = require '../../../lib/analytics_hooks'
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
      @totalArtworksCount = 0
      @viewAllCell = false
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
      viewAllCell: @viewAllCell && @totalArtworksCount > @collection.length

    @postRender()
    this

  postRender: ->
    @$('.view-all-rail-cell__inner').css
      width: @imageHeight
      height: @imageHeight

    @$('.mgr-arrow-left, .mgr-arrow-right').css 'margin-top', "#{@imageHeight/2}px"

    initCarousel @$('.js-my-carousel'),
      imagesLoaded: true
      wrapAround: false
      groupCells: true
    , (carousel) =>
      @trigger 'post-render'
      @carousel = carousel

  remove: ->
     @collection.off 'sync'
     super
