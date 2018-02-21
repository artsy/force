#
# Used by ask_specialist and contact_gallery apps to load the submit inquiry
# view setting body as the el, and loading the artwork from sharify data.
#

bootstrap = require '../../../../../components/layout/bootstrap.coffee'
Artwork = require '../../../../../models/artwork.coffee'
SubmitInquiryView = require './ask_specialist.coffee'
sd = require('sharify').data
CurrentUser = require '../../../../../models/current_user.coffee'

module.exports = () ->
  bootstrap()
  new SubmitInquiryView
    model: new Artwork sd.ARTWORK
    sessionID: sd.SESSION_ID
    el: $('#ask-specialist-page')
    user: CurrentUser.orNull()
