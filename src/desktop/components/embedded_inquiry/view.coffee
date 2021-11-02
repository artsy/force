_ = require 'underscore'
Backbone = require 'backbone'
Form = require '../form/index.coffee'
User = require '../../models/user'
ArtworkInquiry = require '../../models/artwork_inquiry'
defaultMessage = require '../contact/default_message.coffee'
openInquiryQuestionnaireFor = require '../inquiry_questionnaire/index.coffee'
template = -> require('./templates/index.jade') arguments...
confirmation = -> require('./templates/confirmation.jade') arguments...

module.exports = class EmbeddedInquiryView extends Backbone.View
  events:
    'click button': 'submit'

  delayBy: 600 # 10 minutes

  initialize: ({ @artwork, @user } = {}) ->
    @inquiry = new ArtworkInquiry
    @user ?= User.instantiate()

    { @fairs } = @artwork.related()
    { @collectorProfile } = @user.related()
    { @userFairActions } = @collectorProfile.related()

    @listenTo @fairs, 'sync', @render

  submit: (e) ->
    e.preventDefault()

    form = new Form model: @inquiry, $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    { attending } = data = form.serializer.data()

    @user.related().account.clear()
    @user.set _.pick data, 'name', 'email'
    @inquiry.set _.extend { notification_delay: @delayBy }, data

    if attending
      @userFairActions.attendFair @fairs.first()

    @modal = openInquiryQuestionnaireFor
      user: @user
      inquiry: @inquiry
      artwork: @artwork

    # Stop the spinner once the modal opens
    @listenToOnce @modal.view, 'opened', ->
      form.state 'default'

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
      fair: @fairs.first()
      defaultMessage: defaultMessage(@artwork, @artwork.related().partner)
    this
