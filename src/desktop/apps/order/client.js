import { buildClientApp } from "reaction/Artsy/Router/client"
import { data as sd } from "sharify"
import { routes } from "reaction/Apps/Order/routes"
import mediator from "desktop/lib/mediator.coffee"
import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import User from "desktop/models/user.coffee"
import Artwork from "desktop/models/artwork.coffee"
import ArtworkInquiry from "desktop/models/artwork_inquiry.coffee"
import openInquiryQuestionnaireFor from "desktop/components/inquiry_questionnaire/index.coffee"
import { enableIntercom } from "lib/intercom"

mediator.on("openOrdersContactArtsyModal", options => {
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

mediator.on("enableIntercomForBuyers", options => {
  enableIntercom(options)
})

// Track page views for order checkout flow: shipping, payment and review.
// These events are triggered from Reaction.
const orderCheckoutFlowEvents = [
  "order:shipping",
  "order:payment",
  "order:review",
  "order:status",
]
orderCheckoutFlowEvents.map(eventName => {
  mediator.on(eventName, () => {
    window.analytics.page(
      { path: window.location.pathname },
      { integrations: { Marketo: false } }
    )
    // Reset timers that track time on page since we're tracking each order
    // checkout view as a separate page.
    typeof window.desktopPageTimeTrackers !== "undefined" &&
      window.desktopPageTimeTrackers.forEach(tracker => {
        // No need to reset the tracker if we're on the same page.
        if (window.location.pathname !== tracker.path)
          tracker.reset(window.location.pathname)
      })
  })
})

buildClientApp({
  routes,
  context: {
    user: sd.CURRENT_USER,
    mediator,
    isEigen: sd.EIGEN,
  },
  history: {
    options: {
      useBeforeUnload: true,
    },
  },
})
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <ClientApp />,

      document.getElementById("react-root")
    )
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
