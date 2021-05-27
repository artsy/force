export const openAskSpecialistInquireableModal = (artworkId, sd) => {
  const User = require("desktop/models/user.coffee")
  const Artwork = require("desktop/models/artwork.coffee")
  const ArtworkInquiry = require("desktop/models/artwork_inquiry.coffee")
  const openInquiryQuestionnaireFor = require("desktop/components/inquiry_questionnaire/index.coffee")
  const $ = require("jquery")

  const user = User.instantiate()
  const inquiry = new ArtworkInquiry({ notification_delay: 600 })

  const artwork = new Artwork({
    id: artworkId,
  })

  // Set token to be able to load user's collector profile later
  $.ajaxSettings.headers = {
    "X-ACCESS-TOKEN":
      sd.CURRENT_USER != null ? sd.CURRENT_USER.accessToken : undefined,
    "X-XAPP-TOKEN": sd.ARTSY_XAPP_TOKEN,
  }

  openInquiryQuestionnaireFor({
    artwork,
    ask_specialist: true,
    inquiry,
    user,
  })
}
