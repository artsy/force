_ = require 'underscore'
Backbone = require 'backbone'
ContactView = require './view.coffee'
analyticsHooks = require '../../lib/analytics_hooks.coffee'
FlashMessage = require '../flash/index.coffee'
openInquiryQuestionnaireFor = require '../inquiry_questionnaire/index.coffee'
User = require '../../models/user.coffee'
{ modelNameAndIdToLabel } = require '../../lib/analytics_helpers.coffee'
Partner = require '../../models/partner.coffee'
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

    analyticsHooks.trigger 'show_feed:contact', show: @show

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
            new FlashMessage message: 'Your inquiry has been sent'
        else
          @close()
          @modal = openInquiryQuestionnaireFor
            inquiry: @model
            user: user
            bypass: ['account', 'done']
            artwork: fakeArtwork
            state_attrs: inquiry: @model

        @listenToOnce @model, 'sync', =>
          analyticsHooks.trigger 'show_feed:inquiry:sent',
            inquiry: @model
            show: @show
            fair_id: @show.get('fair')?.id
