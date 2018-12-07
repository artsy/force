import { buildClientApp } from "reaction/Artsy/Router/client"
import { routes } from "reaction/Apps/Artwork/routes"
import { data as sd } from "sharify"
import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"

const mediator = require("desktop/lib/mediator.coffee")
const User = require("desktop/models/user.coffee")
const Artwork = require("desktop/models/artwork.coffee")
const ArtworkInquiry = require("desktop/models/artwork_inquiry.coffee")
const openInquiryQuestionnaireFor = require("desktop/components/inquiry_questionnaire/index.coffee")
const openAuctionBuyerPremium = require("desktop/apps/artwork/components/auction/components/buyers_premium/index.coffee")

// FIXME: Move this to Reaction
const Container = styled.div`
  width: 100%;
  max-width: 1192px;
  margin: auto;
`

buildClientApp({
  routes,
  context: {
    user: sd.CURRENT_USER,
    mediator,
  },
})
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <Container>
        <ClientApp />
      </Container>,
      document.getElementById("react-root")
    )
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}

const openInquireableModal = (artworkId: string, { ask_specialist }) => {
  if (!artworkId) return
  const user = User.instantiate()
  const inquiry = new ArtworkInquiry({ notification_delay: 600 })
  const artwork = new Artwork({ id: artworkId })

  artwork.fetch().then(() => {
    openInquiryQuestionnaireFor({
      user,
      artwork,
      inquiry,
      ask_specialist,
    })
  })
}

mediator.on("launchInquiryFlow", options => {
  openInquireableModal(options.artworkId, { ask_specialist: false })
})

mediator.on("openBuyNowAskSpecialistModal", options => {
  openInquireableModal(options.artworkId, { ask_specialist: true })
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

mediator.on("openAuctionBuyerPremium", options => {
  openAuctionBuyerPremium(options.auctionId)
})
