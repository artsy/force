_ = require 'underscore'
StepView = require './step.coffee'
Form = require '../../form/index.coffee'
defaultMessage = require '../../contact/default_message.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
alertable = require '../../alertable_input/index.coffee'
hasSeen = require '../../has_seen/index.coffee'
sd = require('sharify').data
template = -> require('../templates/inquiry.jade') arguments...
{ recaptcha } = require "../../../../v2/Utils/recaptcha"

module.exports = class Inquiry extends StepView

  initialize: ({ @user, @inquiry, @artwork, @state, @trail, @modal }) ->
    recaptcha('inquiry_impression')
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
    new Promise((resolve) =>
      attributes = _.extend { contact_gallery: true }, data

      if @user.isLoggedOut()
        @inquiry.set attributes
        resolve(true)
      else
        @inquiry.save attributes, success: -> resolve(true)
    )

  serialize: (e) ->
    e.preventDefault()

    form = new Form model: @inquiry, $form: @$('form')

    unless sd.COMMERCIAL?.enableNewInquiryFlow
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

    @__serialize__ = Promise.allSettled [
      @maybeSaveInquiry data
      @user.save @inquiry.pick('name', 'email')
      @user.related().account.fetch()
      new Promise (resolve) -> _.delay resolve, 1000
    ]
      .then =>
        @state.set 'inquiry', @inquiry
        Promise.allSettled(
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
