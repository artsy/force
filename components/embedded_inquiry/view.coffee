_ = require 'underscore'
_s = require 'underscore.string'
Backbone = require 'backbone'
Form = require '../form/index.coffee'
User = require '../../models/user.coffee'
ArtworkInquiry = require '../../models/artwork_inquiry.coffee'
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

    @form = new Form model: @inquiry, $form: @$('form')
    return unless @form.isReady()

    @form.state 'loading'

    { attending } = data = @form.serializer.data()

    @user.set _.pick data, 'name', 'email'
    @inquiry.set data

    if attending
      @userFairActions.attendFair @fairs.first()

    @user.findOrCreate silent: true
      .then =>
        @collectorProfile.findOrCreate silent: true
      .then =>
        @userFairActions.invoke 'save'
      .then =>
        @inquiry.save notification_delay: @delayBy
      .then =>
        @openModal()
        @form.state 'default'

      .catch (e) =>
        @form.error null, e
        console.error e

      .done()

  openModal: ->
    @modal = openInquiryQuestionnaireFor
      user: @user
      inquiry: @inquiry
      artwork: @artwork

    # Abort or error
    @listenToOnce @modal.view, 'closed', =>
      @form.reenable true

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
