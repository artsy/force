_ = require 'underscore'
Backbone = require 'backbone'
ContactView = require '../contact/view.coffee'
analytics = require '../../lib/analytics.coffee'
{ SESSION_ID, ARTSY_URL } = require('sharify').data

module.exports = class ShowInquiryModal extends ContactView

  headerTemplate: =>
    "<h1>New Message to #{@show.get('partner').name}</h1>"

  defaults: -> _.extend super,
    url: "#{ARTSY_URL}/api/v1/me/inquiry_request"

  initialize: (options) ->
    { @show } = options
    super

  submit: (e) ->
    analytics.track.funnel 'Sent show inquiry', label: analytics.modelToLabel(@show)
    @model.set
      inquireable_id: @show.get('id')
      inquireable_type: 'partner_show'
      contact_gallery: true
      session_id: SESSION_ID
    super