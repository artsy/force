import { Component } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Title } from "react-head"
import { Router, Match } from "found"
import {
  Button,
  Flex,
  Join,
  Message,
  Text,
  Spacer,
  media,
} from "@artsy/palette"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import createLogger from "v2/Utils/logger"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "../../Components/ShippingSummaryItem"
import { SystemContextConsumer } from "v2/System/SystemContext"
import { Status_order } from "v2/__generated__/Status_order.graphql"
import { getStatusCopy, continueToInboxText } from "../../Utils/getStatusCopy"

const logger = createLogger("Order/Routes/Status/index.tsx")

export interface StatusProps {
  order: Status_order
  router: Router
  match: Match
}

export class StatusRoute extends Component<StatusProps> {
  shouldButtonDisplay(): React.ReactNode | null {
    const {
      match,
      order: { stateReason },
    } = this.props
    const isModal = !!match?.location.query.isModal
    const declinedStatuses = [
      "buyer_rejected",
      "seller_rejected_offer_too_low",
      "seller_rejected_shipping_unavailable",
      "seller_rejected",
      "seller_rejected_artwork_unavailable",
      "seller_rejected_other",
    ]
    const isDeclined = declinedStatuses.includes(stateReason!)

    if (isModal || isDeclined) {
      return null
    }

    return (
      // @ts-ignore
      <Button as={RouterLink} to="/" variant="primaryBlack" width="100%">
        Back to Artsy
      </Button>
    )
  }

  render() {
    const { order } = this.props
    const flowName = order.mode === "OFFER" ? "Offer" : "Order"
    const { title, description, showTransactionSummary = true } = getStatusCopy(
      order,
      logger
    )
    const isSubmittedOffer =
      order.mode === "OFFER" && order.state === "SUBMITTED"

    return (
      <SystemContextConsumer>
        {({ isEigen, user }) => {
          const shouldContinueToInbox =
            isEigen && isSubmittedOffer && order.source === "artwork_page"

          return (
            <>
              <Text variant="lg" fontWeight="regular" color="black100">
                {title}
              </Text>
              <Text
                variant="xs"
                fontWeight="regular"
                color="black60"
                mb={[2, 4]}
              >
                {flowName} <span data-test="OrderCode">#{order.code}</span>
              </Text>
              <TwoColumnLayout
                Content={
                  <>
                    <Title>{flowName} status | Artsy</Title>
                    <Join separator={<Spacer mb={[2, 4]} />}>
                      {description && (
                        <Message p={[2, 4]}>{description}</Message>
                      )}
                      {shouldContinueToInbox ? (
                        <>
                          <Spacer mb={2} />
                          <Text>{continueToInboxText}</Text>
                        </>
                      ) : showTransactionSummary ? (
                        <Flex flexDirection="column">
                          <ArtworkSummaryItem order={order} />
                          <StyledTransactionDetailsSummaryItem
                            order={order}
                            useLastSubmittedOffer
                            showOfferNote={isSubmittedOffer}
                            showCongratulationMessage={
                              order.state === "SUBMITTED"
                            }
                          />
                        </Flex>
                      ) : (
                        isEigen && this.shouldButtonDisplay()
                      )}
                    </Join>
                  </>
                }
                Sidebar={
                  showTransactionSummary &&
                  !shouldContinueToInbox && (
                    <Flex flexDirection="column">
                      <Flex flexDirection="column">
                        <StyledShippingSummaryItem order={order} />
                        <CreditCardSummaryItem order={order} />
                      </Flex>
                    </Flex>
                  )
                }
              />
            </>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

const StyledShippingSummaryItem = styled(ShippingSummaryItem)`
  ${media.xs`
    &&& {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  `};
`
const StyledTransactionDetailsSummaryItem = styled(
  TransactionDetailsSummaryItem
)`
  ${media.xs`
    &&& {
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  `};
`

export const StatusFragmentContainer = createFragmentContainer(StatusRoute, {
  order: graphql`
    fragment Status_order on CommerceOrder {
      __typename
      internalID
      code
      displayState
      state
      mode
      source
      stateReason
      stateExpiresAt(format: "MMM D")
      requestedFulfillment {
        ... on CommerceShip {
          __typename
        }
        ... on CommercePickup {
          __typename
        }
        ... on CommerceShipArta {
          __typename
        }
      }
      ...ArtworkSummaryItem_order
      ...TransactionDetailsSummaryItem_order
      ...ShippingSummaryItem_order
      ...CreditCardSummaryItem_order
      lineItems {
        edges {
          node {
            shipment {
              trackingNumber
              trackingUrl
              carrierName
              estimatedDeliveryWindow
            }
            selectedShippingQuote {
              displayName
            }
            fulfillments {
              edges {
                node {
                  courier
                  trackingId
                  estimatedDelivery(format: "MMM Do, YYYY")
                }
              }
            }
          }
        }
      }
      ... on CommerceOfferOrder {
        myLastOffer {
          internalID
          amount(precision: 2)
          amountCents
          shippingTotal(precision: 2)
          shippingTotalCents
          taxTotal(precision: 2)
          taxTotalCents
        }
      }
    }
  `,
})
