ContactView = require './index.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
template = -> require('../templates/contact_partner.jade') arguments...

module.exports = class InquiryView extends ContactView
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

  submit: (e) ->
    e.preventDefault()
    console.log 'I dont do anything yet'
