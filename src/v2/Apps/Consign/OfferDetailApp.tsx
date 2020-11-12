import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"

import { Separator, Text } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"

import { OfferDetailApp_offer } from "v2/__generated__/OfferDetailApp_offer.graphql"

interface OfferDetailAppProps {
  offer: OfferDetailApp_offer
}

const OfferDetailApp: React.FC<OfferDetailAppProps> = ({ offer }) => {
  // TODO: make sure to account for a 404 page when I'm logged in but the offer ID doesn't belong to me
  if (!offer) return <ErrorPage code={404} />

  return (
    <>
      <AppContainer>
        <HorizontalPadding>
          <Text variant="largeTitle">Review your offer</Text>
          <Text>title: {offer.submission.title}</Text>
          <Text>sale name: {offer.saleName}</Text>
          <Separator my="5" />
          <Footer />
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

export default createFragmentContainer(OfferDetailApp, {
  offer: graphql`
    fragment OfferDetailApp_offer on ConsignmentOffer {
      saleName
      submission {
        title
      }
    }
  `,
})
