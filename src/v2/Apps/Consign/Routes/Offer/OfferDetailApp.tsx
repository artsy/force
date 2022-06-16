import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay"
import { Meta, Title } from "react-head"

import { MinimalNavBar } from "v2/Components/NavBar/MinimalNavBar"
import { ErrorPage } from "v2/Components/ErrorPage"

import { OfferDetailApp_offer } from "v2/__generated__/OfferDetailApp_offer.graphql"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import { ResponseFormFragmentContainer as ResponseForm } from "./Components/ResponseForm"
import { SummaryFragmentContainer as Summary } from "./Components/Summary"
import { StickyFooter } from "./Components/StickyFooter"

export interface OfferDetailAppProps {
  offer: OfferDetailApp_offer
}

const OfferDetailApp: React.FC<OfferDetailAppProps> = ({ offer }) => {
  // TODO: make sure to account for a 404 page when I'm logged in but the offer ID doesn't belong to me
  if (!offer) return <ErrorPage code={404} />

  return (
    <>
      <MinimalNavBar to="/">
        <>
          <Title>Review Offer | Artsy</Title>
          <Meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
          />

          <HorizontalPadding px={[0, 4]} mb="75px">
            <TwoColumnLayout
              Content={<ResponseForm offer={offer} />}
              Sidebar={<Summary offer={offer} />}
            />
          </HorizontalPadding>
          <StickyFooter />
        </>
      </MinimalNavBar>
    </>
  )
}

export const OfferDetailAppFragmentContainer = createFragmentContainer(
  OfferDetailApp,
  {
    offer: graphql`
      fragment OfferDetailApp_offer on ConsignmentOffer {
        ...ResponseForm_offer
        ...Summary_offer
      }
    `,
  }
)
