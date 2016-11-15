Promise = require 'bluebird-q'
User = require '../../../models/user.coffee'
Artwork = require '../../../models/artwork.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
openInquiryQuestionnaireFor = require '../../../components/inquiry_questionnaire/index.coffee'

module.exports = (id, contact_gallery = true) ->
  user = User.instantiate()
  inquiry = new ArtworkInquiry notification_delay: 600, contact_gallery: contact_gallery
  artwork = new Artwork id: id

  Promise artwork.fetch()
    .then ->
      openInquiryQuestionnaireFor
        user: user
        artwork: artwork
        inquiry: inquiry
