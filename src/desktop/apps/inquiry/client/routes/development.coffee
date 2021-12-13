_ = require 'underscore'
{ ARTWORK } = require('sharify').data
{ User } = require '../../../../models/user'
{ Artwork } = require '../../../../models/artwork'
{ ArtworkInquiry } = require '../../../../models/artwork_inquiry'
EmbeddedInquiryView = require '../../../../components/embedded_inquiry/view.coffee'
openInquiryQuestionnaireFor = require '../../../../components/inquiry_questionnaire/index.coffee'
Logger = require '../../../../components/logger/index.coffee'
{ openAuthModal } = require '../../../../lib/openAuthModal'
{ ModalType } = require "../../../../../v2/Components/Authentication/Types"
{ Intent } = require "@artsy/cohesion"

module.exports = ->
  logger = new Logger 'inquiry-questionnaire-log'

  $('.js-unlog').change (e) ->
    e.preventDefault()
    step = $(e.currentTarget).val()
    logger.unlog step
    location.reload()

  # Force a particular step
  $('.js-bypass').change (e) ->
    e.preventDefault()
    step = $(e.currentTarget).val()
    user = User.instantiate()
    user.set name: $('input[name="name"]').val(), email: $('input[name="email"]').val()
    openInquiryQuestionnaireFor
      user: user
      artwork: new Artwork ARTWORK
      inquiry: new ArtworkInquiry
      bypass: step

  # Setup pre-qualified:
  artwork = new Artwork _.extend {}, ARTWORK,
    partner: _.extend {}, ARTWORK.partner, pre_qualify: true
  view = new EmbeddedInquiryView artwork: artwork
  $('.js-embedded-inquiry-form-prequalified-container').html view.render().$el

  # Setup default
  artwork = new Artwork ARTWORK
  view = new EmbeddedInquiryView artwork: artwork
  $('.js-embedded-inquiry-form-container').html view.render().$el

  # Pre-fill for easy debugging:
  $('input[name="name"]').val 'Jane Doe'
  $('input[name="email"]').val 'jane@example.com'

  # Handle login/out
  $('.js-login').click (e) ->
    e.preventDefault()
    openAuthModal(ModalType.login, {
      intent: Intent.inquire
      redirectTo: location.href
    })

  $('.js-logout').click (e) ->
    e.preventDefault()
    $.ajax url: '/users/sign_out', type: 'DELETE', success: -> location.reload()

  # Reset has_seen_x without having to mess with cookies
  $('.js-reset-logged').click (e) ->
    e.preventDefault()
    logger.reset()
    location.reload()
