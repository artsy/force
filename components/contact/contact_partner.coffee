_         = require 'underscore'
Backbone  = require 'backbone'
{ SESSION_ID, ARTSY_URL } = require('sharify').data

ContactView = require './view.coffee'

headerTemplate  = -> require('./templates/contact_partner_header.jade') arguments...

module.exports = class ContactPartnerView extends ContactView
  headerTemplate: headerTemplate

  defaults: -> _.extend super,
    url: "#{ARTSY_URL}/api/v1/me/artwork_inquiry_request"

  initialize: (options) ->
    { @artwork, @partner } = options
    @templateData = name: @partner.name
    super

  submit: ->
    @model.set
      artwork: @artwork.id
      contact_gallery: true
      session_id: SESSION_ID
    super
