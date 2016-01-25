_ = require 'underscore'
Backbone = require 'backbone'
User = require '../../../models/user.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
FillwidthView = require '../../fillwidth_row/view.coffee'
initCarousel = require '../../merry_go_round/index.coffee'
openInquiryQuestionnaireFor = require '../../inquiry_questionnaire/index.coffee'
template = -> require('../templates/artwork_rail.jade') arguments...

module.exports = class ArtworkRailView extends Backbone.View
  className: 'arv-container'
  delayBy: 600 # 10 minutes

  events:
    'click .js-mgr-next': 'next'
    'click .js-mgr-prev': 'prev'
    'click .artwork-item-contact-seller': 'contactSeller'

  initialize: ({ @title, @viewAllUrl, @railId })->
    @collection.on 'sync', @render, @
    @user ?= User.instantiate()

  next: ->
    @carousel.cells.flickity.next(true)

  prev: ->
    @carousel.cells.flickity.previous(true)

  contactSeller: (e) =>
    e.preventDefault()
    inquiry = new ArtworkInquiry
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
      imageHeight: 220
      railId: @railId
      includeContact: true

    @postRender()

    return this

  postRender: ->
    @carouselPromise = initCarousel @$('.js-my-carousel'),
      imagesLoaded: true
    , (carousel) =>
      @carousel = carousel

      # hide arrows if the cells don't fill the carousel width
      @cellWidth = @$('.js-mgr-cell')
        .map((i, e) -> $(e).outerWidth(true))
        .get()
        .reduce( (prev, curr) -> prev + curr )
      unless @cellWidth > @$('.js-my-carousel').width()
        @$('.arv-carousel-nav').addClass 'is-hidden'
