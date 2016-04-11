{ pick, extend } = require 'underscore'
Backbone = require 'backbone'
User = require '../../../../models/user.coffee'
Artwork = require '../../../../models/artwork.coffee'
ArtworkInquiry = require '../../../../models/artwork_inquiry.coffee'
Form = require '../../../../components/form/index.coffee'
openInquiryQuestionnaireFor = require '../../../../components/inquiry_questionnaire/index.coffee'

module.exports = class ArtworkInquiryView extends Backbone.View
  events:
    'click button': 'submit'

  initialize: ({ data }) ->
    { artwork, @fair } = data

    @user = User.instantiate()
    @artwork = new Artwork artwork
    @inquiry = new ArtworkInquiry notification_delay: 600

  submit: (e) ->
    e.preventDefault()

    form = new Form model: @inquiry, $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    { attending } = data = form.serializer.data()

    @user.set pick data, 'name', 'email'
    @inquiry.set data

    if attending
      @user.related()
        .collectorProfile.related()
        .userFairActions.related()
        .attendFair @fair

    @artwork.fetch().then =>
      @modal = openInquiryQuestionnaireFor
        user: @user
        artwork: @artwork
        inquiry: @inquiry

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
