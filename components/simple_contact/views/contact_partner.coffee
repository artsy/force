ContactView = require './index.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
template = -> require('../templates/contact_partner.jade') arguments...

module.exports = class ContactPartnerView extends ContactView
  successMessage: 'Thank you. Your inquiry has been sent.'

  template: ->
    template arguments...

  initialize: ({ @artwork }) ->
    @model = new ArtworkInquiry

  render: ->
    @$el.html @template
      user: @user
      artwork: @artwork
      partner: @artwork.related().partner
    this
