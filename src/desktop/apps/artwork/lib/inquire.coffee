Promise = require 'bluebird-q'
User = require '../../../models/user.coffee'
Artwork = require '../../../models/artwork.coffee'
ArtworkInquiry = require '../../../models/artwork_inquiry.coffee'
openInquiryQuestionnaireFor = require '../../../components/inquiry_questionnaire/index.coffee'

module.exports = (id, options = {}) ->
  user = User.instantiate()
  inquiry = new ArtworkInquiry notification_delay: 600
  artwork = new Artwork id: id
  ask_specialist = options.ask_specialist || false

  Promise artwork.fetch()
    .then ->
      artwork.set('is_in_auction', true) if sd.AUCTION?

      openInquiryQuestionnaireFor
        user: user
        artwork: artwork
        inquiry: inquiry,
        ask_specialist: ask_specialist
