_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../form/index.coffee'
User = require '../../models/user.coffee'
ArtworkInquiry = require '../../models/artwork_inquiry.coffee'
openInquiryQuestionnaireFor = require '../inquiry_questionnaire/index.coffee'
template = -> require('./template.jade') arguments...

module.exports = class EmbeddedInquiryView extends Backbone.View
  events:
    'click button': 'serialize'

  initialize: ({ @artwork, @user } = {}) ->
    @inquiry = new ArtworkInquiry
    @user ?= User.instantiate()

  serialize: (e) ->
    form = new Form model: @inquiry, $form: @$('form')
    return unless form.start()
    e.preventDefault()
    form.state 'loading'

    data = form.serializer.data()

    @user.set _.pick data, 'name', 'email'
    @inquiry.set _.pick data, 'message'

    modal = openInquiryQuestionnaireFor
      user: @user
      inquiry: @inquiry
      artwork: @artwork

    modal.view.once 'closed', ->
      # Temporary for testing...
      form.reenable true

  render: ->
    @$el.html template
      user: @user
      inquiry: @inquiry
      artwork: @artwork
    this
