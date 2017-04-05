Promise = require 'bluebird-q'
User = require '../../../models/user'
Artwork = require '../../../models/artwork'
ArtworkInquiry = require '../../../models/artwork_inquiry'
openInquiryQuestionnaireFor = require '../../../components/inquiry_questionnaire/index'

module.exports = (id) ->
  user = User.instantiate()
  inquiry = new ArtworkInquiry notification_delay: 600
  artwork = new Artwork id: id

  Promise artwork.fetch()
    .then ->
      artwork.set('is_in_auction', true) if sd.AUCTION?

      openInquiryQuestionnaireFor
        user: user
        artwork: artwork
        inquiry: inquiry
