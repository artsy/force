_ = require 'underscore'
Backbone = require 'backbone'
ContactView = require './view.coffee'
FlashMessage = require '../flash/index.coffee'
openInquiryQuestionnaireFor = require '../inquiry_questionnaire/index.coffee'
User = require '../../models/user'
Partner = require '../../models/partner'
{ SESSION_ID, API_URL } = require('sharify').data

formTemplate = -> require('./templates/inquiry_show_form.jade') arguments...
headerTemplate = -> require('./templates/inquiry_partner_header.jade') arguments...

class ProxyArtwork extends Backbone.Model
  initialize: ({ @partner }) -> # assign partner
  related: -> partner: @partner

module.exports = class ShowInquiryModal extends ContactView

  headerTemplate: (locals) =>
    headerTemplate _.extend locals,
      partner: @partner
      user: @user

  formTemplate: (locals) =>
    formTemplate _.extend locals,
      show: @show
      user: @user
      displayThumbnail: !@show.get('fair')

  defaults: -> _.extend super,
    url: "#{API_URL}/api/v1/me/inquiry_request"

  initialize: (options) ->
    { @show } = options

    window.analytics.track('Clicked "Contact Gallery"', {
      show_id: @show.get("_id"),
      context_type: "fair exhibitors browse",
    })

    @partner = new Partner @show.get('partner')
    @partner.related().locations.fetch complete: =>
      @renderTemplates()
      @renderLocation()
      @updatePosition()
      @isLoaded()
    super

  postRender: =>
    @isLoading()

  renderLocation: =>
    return if @partner.related().locations.length > 1
    return unless city = @partner.displayLocations @user?.get('location')?.city
    @$('.contact-location').html ", " + city

  onSubmit: (e) ->
    super

    @model.set
      inquireable_id: @show.get('id')
      inquireable_type: 'partner_show'
      contact_gallery: true
      session_id: SESSION_ID

    @openInquiryQuestionnaire()

  openInquiryQuestionnaire: ->
    user = User.instantiate _.pick @model.attributes, 'name', 'email'

    fakeArtwork = new ProxyArtwork partner: @partner

    user.prepareForInquiry()
      .then =>

        if user.isLoggedIn()
          @model.save null, success: =>
            @close()
            new FlashMessage message: 'Your Message Has Been Sent'
        else
          @close()
          @modal = openInquiryQuestionnaireFor
            inquiry: @model
            user: user
            bypass: ['account', 'done']
            artwork: fakeArtwork
            state_attrs: inquiry: @model

        @listenToOnce @model, 'sync', =>
          window.analytics.track("Sent show inquiry", {
            inquiry_id: @model.id,
            show_id: @show.get("_id"),
            show_slug: @show.id,
            fair_id: @show.get('fair')?.id
          })
