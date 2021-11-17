import { TransactionDetailsSummaryItem_order } from "v2/__generated__/TransactionDetailsSummaryItem_order.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { Flex, Text, Spacer, Column } from "@artsy/palette"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import { Omit } from "lodash"
import { getOfferItemFromOrder } from "v2/Apps/Order/Utils/offerItemExtractor"
import { extractNodes } from "v2/Utils/extractNodes"
import {
  Device,
  DOWNLOAD_APP_URLS,
  useDeviceDetection,
} from "v2/Utils/Hooks/useDeviceDetection"
import { DownloadAppBadge } from "v2/Components/DownloadAppBadge"
import { ContextModule } from "@artsy/cohesion"

export interface TransactionDetailsSummaryItemProps
  extends Omit<StepSummaryItemProps, "order"> {
  order: TransactionDetailsSummaryItem_order
  offerOverride?: string | null | number
  useLastSubmittedOffer?: boolean
  offerContextPrice?: "LIST_PRICE" | "LAST_OFFER"
  showOfferNote?: boolean
  placeholderOverride?: string | null
}

export const TransactionDetailsSummaryItem: React.FC<TransactionDetailsSummaryItemProps> = props => {
  const {
    showOfferNote,
    offerOverride,
    order,
    placeholderOverride,
    offerContextPrice = "LIST_PRICE",
    useLastSubmittedOffer,
    ...others
  } = props

  const { device, downloadAppUrl } = useDeviceDetection()

  const amountPlaceholder = placeholderOverride || "—"

  const getOffer = ():
    | TransactionDetailsSummaryItem_order["lastOffer"]
    | null => {
    return useLastSubmittedOffer ? order.lastOffer : order.myLastOffer
  }

  const shippingDisplayAmount = () => {
    switch (order.mode) {
      case "BUY":
        return order.shippingTotal || amountPlaceholder
      case "OFFER":
        const offer = getOffer()
        return (offer && offer.shippingTotal) || amountPlaceholder
    }
  }

  const shippingDisplayLabel = () => {
    let label = "Shipping"

    if (order.requestedFulfillment?.__typename === "CommerceShipArta") {
      const selectedShippingQuote = extractNodes(order.lineItems)?.[0]
        .selectedShippingQuote

      if (selectedShippingQuote) {
        label = `${selectedShippingQuote.displayName} delivery`
      }
    }

    return label
  }

  const taxDisplayAmount = () => {
    switch (order.mode) {
      case "BUY":
        return order.taxTotal || amountPlaceholder
      case "OFFER":
        const offer = getOffer()
        return (offer && offer.taxTotal) || amountPlaceholder
    }
  }

  const buyerTotalDisplayAmount = () => {
    switch (order.mode) {
      case "BUY":
        return order.buyerTotal
      case "OFFER":
        const offer = getOffer()
        return offer && offer.buyerTotal
    }
  }

  const renderPriceEntry = () => {
    if (order.mode === "BUY") {
      return <Entry label="Price" value={order.itemsTotal} />
    }
    const offer = getOffer()
    const offerItem = getOfferItemFromOrder(order.lineItems)
    const isBuyerOffer =
      offerOverride != null || !offer || offer.fromParticipant === "BUYER"

    return (
      <>
        <Entry
          label={isBuyerOffer ? "Your offer" : "Seller's offer"}
          value={offerOverride || (offer && offer.amount) || amountPlaceholder}
        />
        {offerContextPrice === "LIST_PRICE" ? (
          offerItem && (
            <SecondaryEntry label="List price" value={offerItem.price} />
          )
        ) : (
          // show last offer
          <SecondaryEntry
            label={
              order.lastOffer?.fromParticipant === "SELLER"
                ? "Seller's offer"
                : "Your offer"
            }
            value={order.lastOffer?.amount}
          />
        )}
      </>
    )
  }

  const renderNoteEntry = () => {
    const offer = getOffer()
    if (offer?.note) {
      return (
        <>
          <Spacer mb={[2, 4]} />
          <Text variant={["xs", "sm"]} fontWeight="bold" color="black100">
            Your note
          </Text>
          <Text size={["xs", "sm"]} color="black60">
            {offer.note}
          </Text>
        </>
      )
    }
  }
  return (
    <StepSummaryItem {...others}>
      {renderPriceEntry()}
      <Spacer mb={2} />
      <Entry label={shippingDisplayLabel} value={shippingDisplayAmount} />

      <Entry label="Tax" value={taxDisplayAmount()} />
      <Spacer mb={2} />
      <Entry label="Total" value={buyerTotalDisplayAmount()} final />
      {showOfferNote && order.mode === "OFFER" && renderNoteEntry()}
      {order.state === "SUBMITTED" && (
        <Column
          span={4}
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          backgroundColor="blue10"
          justifyContent="center"
          order={[2, 1]}
          p={2}
          mt={4}
        >
          <Flex flexDirection="column" mr="auto">
            <Text variant="sm" color="blue100">
              Congratulations! We have added this artwork to your Collection.
            </Text>
            <Text variant="sm">
              View and manage your Collection in the Artsy App.
            </Text>
          </Flex>
          <Flex pt={1}>
            {device === Device.Unknown ? (
              <Flex flexWrap="wrap" justifyContent="center">
                <DownloadAppBadge
                  contextModule={ContextModule.footer}
                  device={Device.iPhone}
                  downloadAppUrl={DOWNLOAD_APP_URLS[Device.iPhone]}
                  mx={0.5}
                  mb={0.5}
                />

                <DownloadAppBadge
                  contextModule={ContextModule.footer}
                  device={Device.Android}
                  downloadAppUrl={DOWNLOAD_APP_URLS[Device.Android]}
                  mx={0.5}
                />
              </Flex>
            ) : (
              <DownloadAppBadge
                contextModule={ContextModule.footer}
                device={device}
                downloadAppUrl={downloadAppUrl}
              />
            )}
          </Flex>
        </Column>
      )}
    </StepSummaryItem>
  )
}
interface SecondaryEntryProps {
  label: React.ReactNode
  value: React.ReactNode
}

interface EntryProps extends SecondaryEntryProps {
  final?: boolean
}

const Entry: React.FC<EntryProps> = ({ label, value, final }) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <div>
      <Text
        variant={["xs", "sm"]}
        color={final ? "black100" : "black60"}
        fontWeight={final ? "semibold" : "regular"}
      >
        {label}
      </Text>
    </div>
    <div>
      <Text
        variant={["xs", "sm"]}
        color={final ? "black100" : "black60"}
        fontWeight={final ? "semibold" : "regular"}
      >
        {value}
      </Text>
    </div>
  </Flex>
)

const SecondaryEntry: React.FC<SecondaryEntryProps> = ({ label, value }) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <Text variant="xs" color="black60">
      {label}
    </Text>
    <Text variant="xs" color="black60">
      {value}
    </Text>
  </Flex>
)

graphql`
  fragment TransactionDetailsSummaryItemOfferProperties on CommerceOffer {
    internalID
    amount(precision: 2)
    amountCents
    shippingTotal(precision: 2)
    shippingTotalCents
    taxTotal(precision: 2)
    taxTotalCents
    buyerTotal(precision: 2)
    buyerTotalCents
    fromParticipant
    note
  }
`

export const TransactionDetailsSummaryItemFragmentContainer = createFragmentContainer(
  TransactionDetailsSummaryItem,
  {
    order: graphql`
      fragment TransactionDetailsSummaryItem_order on CommerceOrder {
        __typename
        requestedFulfillment {
          __typename
        }
        lineItems {
          edges {
            node {
              artworkOrEditionSet {
                __typename
                ... on Artwork {
                  price
                }
                ... on EditionSet {
                  price
                }
              }
              selectedShippingQuote {
                displayName
              }
            }
          }
        }
        state
        mode
        shippingTotal(precision: 2)
        shippingTotalCents
        taxTotal(precision: 2)
        taxTotalCents
        itemsTotal(precision: 2)
        buyerTotal(precision: 2)
        ... on CommerceOfferOrder {
          lastOffer {
            ...TransactionDetailsSummaryItemOfferProperties @relay(mask: false)
          }
          myLastOffer {
            ...TransactionDetailsSummaryItemOfferProperties @relay(mask: false)
          }
        }
      }
    `,
  }
)
