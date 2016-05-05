Promise = require 'bluebird-q'
User = require '../../../models/user.coffee'
Artwork = require '../../../models/artwork.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
openInquiryQuestionnaireFor = require '../../../components/inquiry_questionnaire/index.coffee'

module.exports = (id) ->
  user = User.instantiate()
  inquiry = new ArtworkInquiry notification_delay: 600
  artwork = new Artwork id: id

  Promise artwork.fetch()
    .then ->
      openInquiryQuestionnaireFor
        user: user
        artwork: artwork
        inquiry: inquiry
