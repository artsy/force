import { buildClientApp } from 'reaction/Artsy/Router'
import { data as sd } from 'sharify'
import { routes } from 'reaction/Apps/Order/routes'
import mediator from 'desktop/lib/mediator.coffee'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import openMultiPageModal from 'desktop/components/multi_page_modal/index.coffee'
import User from 'desktop/models/user.coffee'
import Artwork from 'desktop/models/artwork.coffee'
import ArtworkInquiry from 'desktop/models/artwork_inquiry.coffee'
import openInquiryQuestionnaireFor from 'desktop/components/inquiry_questionnaire/index.coffee'

mediator.on('openOrdersBuyerFAQModal', options => {
  openMultiPageModal('collector-faqs')
})

mediator.on('openOrdersContactArtsyModal', options => {
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

buildClientApp({
  routes,
  user: sd.CURRENT_USER,
  historyOptions: { useBeforeUnload: true },
})
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <Container>
        <ClientApp mediator={mediator} />
      </Container>,

      document.getElementById('react-root')
    )
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}

// FIXME: Move this to Reaction
const Container = styled.div`
  width: 100%;
  max-width: 1192px;
  margin: auto;
`
