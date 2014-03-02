_         = require 'underscore'
Backbone  = require 'backbone'
{ SESSION_ID, ARTSY_URL } = require('sharify').data

ContactView   = require './view.coffee'
analytics     = require('../../lib/analytics.coffee')

headerTemplate  = -> require('./templates/contact_partner_header.jade') arguments...
formTemplate    = -> require('./templates/form.jade') arguments...

module.exports = class ContactPartnerView extends ContactView
  headerTemplate: -> headerTemplate.apply this, arguments
  formTemplate: -> formTemplate.apply this, arguments

  defaults: -> _.extend super,
    url: "#{ARTSY_URL}/api/v1/me/artwork_inquiry_request"

  initialize: (options) ->
    { @artwork, @partner } = options
    @templateData = name: @partner.name
    super

  submit: ->
    analytics.track.funnel 'Sent artwork inquiry', label: analytics.modelNameAndIdToLabel('artwork', @artwork.get('id'))

    @model.set
      artwork: @artwork.id
      contact_gallery: true
      session_id: SESSION_ID
    super
