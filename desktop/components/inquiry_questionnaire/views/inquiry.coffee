Q = require 'bluebird-q'
_ = require 'underscore'
StepView = require './step'
Form = require '../../form/index'
defaultMessage = require '../../contact/default_message'
ArtworkInquiry = require '../../../models/artwork_inquiry'
alertable = require '../../alertable_input/index'
hasSeen = require '../../has_seen/index'
template = -> require('../templates/inquiry.jade') arguments...

module.exports = class Inquiry extends StepView

  initialize: ({ @user, @inquiry, @artwork, @state, @trail, @modal }) ->
    super

  template: (data) ->
    template _.extend data,
      fair: @artwork.related().fairs.first()
      message: @inquiry.get('message') or @defaultMessage()

  __events__:
    'click button': 'serialize'

  defaultMessage: ->
    defaultMessage @artwork, @artwork.related().partner

  nudged: ->
    hasSeen 'inquiry-nudge'

  maybeSaveInquiry: (data) ->
    promise = Q.defer()

    attributes = _.extend { contact_gallery: true }, data

    if @user.isLoggedOut()
      @inquiry.set attributes
      promise.resolve(true)
    else
      @inquiry.save attributes, success: -> promise.resolve(true)

    promise

  serialize: (e) ->
    e.preventDefault()

    form = new Form model: @inquiry, $form: @$('form')

    nudge =
      $input: @$('textarea')
      message: 'We recommend personalizing your message to get a faster answer from the gallery.'
      $submit: @$('button')
      label: 'Send Anyway?'

    if not @nudged() and alertable(nudge, ((value) => value is @defaultMessage()))
      return

    return unless form.isReady()

    form.state 'loading'

    { attending } = data = form.serializer.data()

    if attending
      @user
        .related().collectorProfile
        .related().userFairActions.attendFair @artwork.related().fairs.first()

    @__serialize__ = Q.allSettled [
      @maybeSaveInquiry data
      @user.save @inquiry.pick('name', 'email')
      @user.related().account.fetch()
      Q.promise (resolve) -> _.delay resolve, 1000
    ]
      .then =>
        @state.set 'inquiry', @inquiry
        Q.allSettled(
          @user
            .related().collectorProfile
            .related().userFairActions.invoke 'save'
        )
      .then =>
        if @modal?
          @modal.dialog 'bounce-out', => @next()
        else
          @next()
      , (e) ->
        form.error null, e
