#
# Used by ask_specialist and contact_gallery apps to load the submit inquiry
# view setting body as the el, and loading the artwork from sharify data.
#

bootstrap = require '../../../../../components/layout/bootstrap'
Artwork = require '../../../../../models/artwork'
SubmitInquiryView = require './ask_specialist'
sd = require('sharify').data
CurrentUser = require '../../../../../models/current_user'

module.exports = () ->
  bootstrap()
  new SubmitInquiryView
    model: new Artwork sd.ARTWORK
    sessionID: sd.SESSION_ID
    el: $('#ask-specialist-page')
    user: CurrentUser.orNull()
