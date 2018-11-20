import { buildClientApp } from "reaction/Artsy/Router/client"
import { routes } from "reaction/Apps/Artwork/routes"
import React from "react"
import ReactDOM from "react-dom"
import mediator from "desktop/lib/mediator.coffee"
import User from "desktop/models/user.coffee"
import Artwork from "desktop/models/artwork.coffee"
import ArtworkInquiry from "desktop/models/artwork_inquiry.coffee"
import openInquiryQuestionnaireFor from "desktop/components/inquiry_questionnaire/index.coffee"

mediator.on("openBuyNowAskSpecialistModal", options => {
  const artworkId = options.artworkId
  if (artworkId) {
    const user = User.instantiate()
    const inquiry = new ArtworkInquiry({ notification_delay: 600 })
    const artwork = new Artwork({ id: artworkId })

    artwork.fetch().then(() => {
      openInquiryQuestionnaireFor({
        user,
        artwork,
        inquiry,
        ask_specialist: true,
      })
    })
  }
})

mediator.on("openAuctionAskSpecialistModal", options => {
  const artworkId = options.artworkId
  if (artworkId) {
    const user = User.instantiate()
    const inquiry = new ArtworkInquiry({ notification_delay: 600 })
    const artwork = new Artwork({ id: artworkId })

    artwork.fetch().then(() => {
      artwork.set("is_in_auction", true)
      openInquiryQuestionnaireFor({
        user,
        artwork,
        inquiry,
        ask_specialist: true,
      })
    })
  }
})

buildClientApp({ routes })
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
