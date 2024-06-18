import { FC } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Title } from "react-head"
import { Match } from "found"
import {
  Button,
  Flex,
  Join,
  Message,
  Text,
  Spacer,
  media,
  Box,
} from "@artsy/palette"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import createLogger from "Utils/logger"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { PaymentMethodSummaryItemFragmentContainer as PaymentMethodSummaryItem } from "Apps/Order/Components/PaymentMethodSummaryItem"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "Apps/Order/Components/ShippingSummaryItem"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Status_order$data } from "__generated__/Status_order.graphql"
import {
  getStatusCopy,
  continueToInboxText,
} from "Apps/Order/Utils/getStatusCopy"
import { BackToConversationBanner } from "Apps/Order/Components/BackToConversationBanner"

const logger = createLogger("Order/Routes/Status/index.tsx")

const declinedStatuses = [
  "buyer_rejected",
  "seller_rejected_offer_too_low",
  "seller_rejected_shipping_unavailable",
  "seller_rejected",
  "seller_rejected_artwork_unavailable",
  "seller_rejected_other",
]

export interface StatusProps {
  order: Status_order$data
  match: Match
}

export const StatusRoute: FC<StatusProps> = ({ order, match }) => {
  const { isEigen } = useSystemContext()

  const flowName = order.mode === "OFFER" ? "Offer" : "Order"
  const isSubmittedOffer =
    order.mode === "OFFER" && order.displayState === "SUBMITTED"
  const isDeclined = declinedStatuses.includes(order.stateReason as string)
  const isModal = !!match?.location.query.isModal
  const shouldButtonDisplay = isEigen && !isModal && !isDeclined
  const shouldContinueToInbox =
    isEigen && isSubmittedOffer && order.source === "artwork_page"
  const conversationId = match.location.query.backToConversationId
  const shouldDisplayBackToConversationLink = !!match.location.query
    .backToConversationId

  const {
    title,
    description,
    alertMessageTitle,
    alertMessage,
    content,
    showTransactionSummary = true,
  } = getStatusCopy(order, logger)

  return (
    <>
      {shouldDisplayBackToConversationLink ? (
        <BackToConversationBanner conversationId={conversationId} />
      ) : (
        <>
          <Text variant="lg-display" fontWeight="regular" color="black100">
            {title}
          </Text>
          <Text variant="xs" fontWeight="regular" color="black60" mb={[2, 4]}>
            {flowName} <span data-test="OrderCode">#{order.code}</span>
          </Text>
        </>
      )}
      <TwoColumnLayout
        noRowGap
        Content={
          <>
            <Title>{flowName} status | Artsy</Title>
            <Join separator={<Spacer y={[2, 4]} />}>
              {description && <Message>{description}</Message>}
              {alertMessage && (
                <Message variant="alert" title={alertMessageTitle as string}>
                  {alertMessage}
                </Message>
              )}
              {content && (
                <Box
                  border="1px solid #D8D8D8"
                  flexDirection="column"
                  padding={2}
                >
                  {content}
                </Box>
              )}
              {shouldContinueToInbox ? (
                <>
                  <Spacer y={2} />
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
                      order.displayState === "SUBMITTED" &&
                      order.source !== "private_sale"
                    }
                  />
                </Flex>
              ) : (
                shouldButtonDisplay && (
                  <Button
                    // @ts-ignore
                    as={RouterLink}
                    to="/"
                    variant="primaryBlack"
                    width="100%"
                  >
                    Back to Artsy
                  </Button>
                )
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
                <PaymentMethodSummaryItem
                  order={order}
                  withDescription={false}
                  title="Payment method"
                />
              </Flex>
            </Flex>
          )
        }
      />
    </>
  )
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
      currencyCode
      displayState
      state
      mode
      source
      stateReason
      paymentMethod
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
      ...PaymentMethodSummaryItem_order
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
              typeName
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
