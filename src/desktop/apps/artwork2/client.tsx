import { buildClientApp } from "reaction/Artsy/Router/client"
import { routes } from "reaction/Apps/Artwork/routes"
import React from "react"
import ReactDOM from "react-dom"

const mediator = require("desktop/lib/mediator.coffee")
const User = require("desktop/models/user.coffee")
const Artwork = require("desktop/models/artwork.coffee")
const ArtworkInquiry = require("desktop/models/artwork_inquiry.coffee")
const openInquiryQuestionnaireFor = require("desktop/components/inquiry_questionnaire/index.coffee")

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
