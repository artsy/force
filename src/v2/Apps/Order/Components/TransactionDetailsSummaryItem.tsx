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
import { DownloadAppBadges } from "v2/Components/DownloadAppBadges/DownloadAppBadges"
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

export class TransactionDetailsSummaryItem extends React.Component<
  TransactionDetailsSummaryItemProps
> {
  static defaultProps: Partial<TransactionDetailsSummaryItemProps> = {
    offerContextPrice: "LIST_PRICE",
  }

  amountPlaceholder = this.props.placeholderOverride || "—"

  render() {
    const {
      showOfferNote,
      offerOverride,
      order,
      placeholderOverride,
      ...others
    } = this.props

    return (
      <StepSummaryItem {...others}>
        {this.renderPriceEntry()}
        <Spacer mb={2} />
        <Entry
          label={this.shippingDisplayLabel()}
          value={this.shippingDisplayAmount()}
        />

        <Entry label="Tax" value={this.taxDisplayAmount()} />
        <Spacer mb={2} />
        <Entry label="Total" value={this.buyerTotalDisplayAmount()} final />
        {showOfferNote && order.mode === "OFFER" && this.renderNoteEntry()}
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
              <DownloadAppBadges contextModule={ContextModule.footer} />
            </Flex>
          </Column>
        )}
      </StepSummaryItem>
    )
  }

  getOffer(): TransactionDetailsSummaryItem_order["lastOffer"] | null {
    return this.props.useLastSubmittedOffer
      ? this.props.order.lastOffer
      : this.props.order.myLastOffer
  }

  shippingDisplayAmount = () => {
    const { order } = this.props
    switch (order.mode) {
      case "BUY":
        return order.shippingTotal || this.amountPlaceholder
      case "OFFER":
        const offer = this.getOffer()
        return (offer && offer.shippingTotal) || this.amountPlaceholder
    }
  }

  shippingDisplayLabel = () => {
    const { order } = this.props
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

  taxDisplayAmount = () => {
    const { order } = this.props
    switch (order.mode) {
      case "BUY":
        return order.taxTotal || this.amountPlaceholder
      case "OFFER":
        const offer = this.getOffer()
        return (offer && offer.taxTotal) || this.amountPlaceholder
    }
  }

  buyerTotalDisplayAmount = () => {
    const { order } = this.props
    switch (order.mode) {
      case "BUY":
        return order.buyerTotal
      case "OFFER":
        const offer = this.getOffer()
        return offer && offer.buyerTotal
    }
  }

  renderPriceEntry = () => {
    const { order, offerOverride, offerContextPrice } = this.props
    if (order.mode === "BUY") {
      return <Entry label="Price" value={order.itemsTotal} />
    }
    const offer = this.getOffer()
    const offerItem = getOfferItemFromOrder(order.lineItems)
    const isBuyerOffer =
      offerOverride != null || !offer || offer.fromParticipant === "BUYER"

    return (
      <>
        <Entry
          label={isBuyerOffer ? "Your offer" : "Seller's offer"}
          value={
            offerOverride || (offer && offer.amount) || this.amountPlaceholder
          }
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

  renderNoteEntry = () => {
    const offer = this.getOffer()
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
      <Text variant={["xs", "sm"]} color="black60">
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
