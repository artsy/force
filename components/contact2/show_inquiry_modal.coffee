_ = require 'underscore'
Backbone = require 'backbone'
ContactView = require './view.coffee'
analytics = require '../../lib/analytics.coffee'
Partner = require '../../models/partner.coffee'
{ SESSION_ID, ARTSY_URL } = require('sharify').data
formTemplate = -> require('./templates/inquiry_show_form.jade') arguments...
headerTemplate = -> require('./templates/inquiry_partner_header.jade') arguments...

module.exports = class ShowInquiryModal extends ContactView

  headerTemplate: (locals) =>
    headerTemplate _.extend locals,
      partner: @partner
      user: @user

  formTemplate: (locals) =>
    formTemplate _.extend locals,
      show: @show
      user: @user

  defaults: -> _.extend super,
    url: "#{ARTSY_URL}/api/v1/me/inquiry_request"

  initialize: (options) ->
    { @show } = options
    @partner = new Partner @show.get('partner')
    @partner.locations().fetch complete: =>
      @renderTemplates()
      @renderLocation()
      @updatePosition()
      @isLoaded()
    super

  postRender: =>
    @isLoading()

  renderLocation: =>
    return if @partner.locations().length > 1
    return unless city = @partner.displayLocations @user?.get('location')?.city
    @$('.contact2-location').html ", " + city

  submit: (e) ->
    analytics.track.funnel 'Sent show inquiry',
      label: analytics.modelNameAndIdToLabel('show', @show.get('id'))
    @model.set
      inquireable_id: @show.get('id')
      inquireable_type: 'partner_show'
      contact_gallery: true
      session_id: SESSION_ID
    super
