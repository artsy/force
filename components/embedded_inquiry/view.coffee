_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
Form = require '../form/index.coffee'
User = require '../../models/user.coffee'
ArtworkInquiry = require '../../models/artwork_inquiry.coffee'
openInquiryQuestionnaireFor = require '../inquiry_questionnaire/index.coffee'
template = -> require('./templates/index.jade') arguments...
confirmation = -> require('./templates/confirmation.jade') arguments...

module.exports = class EmbeddedInquiryView extends Backbone.View
  events:
    'click button': 'submit'

  initialize: ({ @artwork, @user } = {}) ->
    @inquiry = new ArtworkInquiry
    @user ?= User.instantiate()

  submit: (e) ->
    form = new Form model: @inquiry, $form: @$('form')
    return unless form.start()
    e.preventDefault()
    form.state 'loading'

    data = form.serializer.data()

    @user.set _.pick data, 'name', 'email'
    @inquiry.set _.pick data, 'message'

    @modal = openInquiryQuestionnaireFor
      user: @user
      inquiry: @inquiry
      artwork: @artwork

    # Abort or error
    @listenToOnce @modal.view, 'closed', ->
      form.reenable true

    # Success
    @listenToOnce @inquiry, 'sync', =>
      @$el.html confirmation
        artwork: @artwork

  render: ->
    @$el.html template
      user: @user
      inquiry: @inquiry
      artwork: @artwork
    this
