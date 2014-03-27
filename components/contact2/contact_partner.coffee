_ = require 'underscore'
Backbone = require 'backbone'
ContactView = require './view.coffee'
analytics = require('../../lib/analytics.coffee')
Partner = require '../../models/partner.coffee'
CurrentUser = require '../../models/current_user.coffee'
{ SESSION_ID, ARTSY_URL } = require('sharify').data

module.exports = class ContactPartnerView extends ContactView

  headerTemplate: (locals) =>
    require('./templates/inquiry_partner_header.jade') _.extend locals,
      artwork: @artwork
      partner: @partner
      user: @user

  formTemplate: (locals) =>
    require('./templates/inquiry_form.jade') _.extend locals,
      artwork: @artwork
      user: @user
      contactGallery: true

  defaults: -> _.extend super,
    url: "#{ARTSY_URL}/api/v1/me/artwork_inquiry_request"

  initialize: (options) ->
    @artwork = options.artwork
    @partner = new Partner options.partner
    @partner.locations().fetch().then =>
      @renderTemplates()
      @renderLocation()
      @updatePosition()
      @isLoaded()
      if @user then @focusTextarea() else @$('[name="name"]').focus()
    super

  renderLocation: =>
    return if @partner.locations().length > 1
    return unless city = @partner.displayLocations @user?.get('location')?.city
    @$('.contact2-location').html ", " + city

  submit: ->
    analytics.track.funnel 'Sent artwork inquiry',
      label: analytics.modelNameAndIdToLabel('artwork', @artwork.get('id'))
    @model.set
      artwork: @artwork.id
      contact_gallery: true
      session_id: SESSION_ID
    super

  postRender: =>
    @isLoading()
