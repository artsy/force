{ ARTWORK } = require('sharify').data
User = require '../../models/user.coffee'
Artwork = require '../../models/artwork.coffee'
openInquiryQuestionnaireFor = require '../../components/inquiry_questionnaire/index.coffee'

module.exports.init = ->
  artwork = new Artwork ARTWORK
  user = User.instantiate()

  $('.js-open-inquiry-flow').click (e) ->
    user.set name: 'Damon Zucconi', email: 'damon@artsymail.com', prequalified: !$(this).data('prequalify')
    openInquiryQuestionnaireFor user: user, artwork: artwork
