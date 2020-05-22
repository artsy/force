import { TransactionDetailsSummaryItem_order } from "v2/__generated__/TransactionDetailsSummaryItem_order.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { Flex, Sans, Serif, Spacer } from "@artsy/palette"
import {
  StepSummaryItem,
  StepSummaryItemProps,
} from "v2/Components/StepSummaryItem"
import { Omit } from "lodash"

export interface TransactionDetailsSummaryItemProps
  extends Omit<StepSummaryItemProps, "order"> {
  order: TransactionDetailsSummaryItem_order
  offerOverride?: string | null
  useLastSubmittedOffer?: boolean
  offerContextPrice?: "LIST_PRICE" | "LAST_OFFER"
  showOfferNote?: boolean
}

const emDash = "—"

export class TransactionDetailsSummaryItem extends React.Component<
  TransactionDetailsSummaryItemProps
  > {
  static defaultProps: Partial<TransactionDetailsSummaryItemProps> = {
    offerContextPrice: "LIST_PRICE",
  }
  render() {
    const { showOfferNote, offerOverride, order, ...others } = this.props
    return (
      <StepSummaryItem {...others}>
        {this.renderPriceEntry()}
        <Spacer mb={2} />
        <Entry label="Shipping" value={this.shippingDisplayAmount()} />

        <Entry label="Tax" value={this.taxDisplayAmount()} />
        <Spacer mb={2} />
        <Entry label="Total" value={this.buyerTotalDisplayAmount()} final />
        {showOfferNote && order.mode === "OFFER" && this.renderNoteEntry()}
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
        return order.shippingTotal || emDash
      case "OFFER":
        const offer = this.getOffer()
        return (offer && offer.shippingTotal) || emDash
    }
  }

  taxDisplayAmount = () => {
    const { order } = this.props
    switch (order.mode) {
      case "BUY":
        return order.taxTotal || emDash
      case "OFFER":
        const offer = this.getOffer()
        return (offer && offer.taxTotal) || emDash
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
    const isBuyerOffer =
      offerOverride != null || !offer || offer.fromParticipant === "BUYER"

    return (
      <>
        <Entry
          label={isBuyerOffer ? "Your offer" : "Seller's offer"}
          value={offerOverride || (offer && offer.amount) || emDash}
        />
        {offerContextPrice === "LIST_PRICE" ? (
          <SecondaryEntry label="List price" value={order.totalListPrice} />
        ) : (
            // show last offer
            <SecondaryEntry
              label={
                order.lastOffer.fromParticipant === "SELLER"
                  ? "Seller's offer"
                  : "Your offer"
              }
              value={order.lastOffer.amount}
            />
          )}
      </>
    )
  }

  renderNoteEntry = () => {
    const offer = this.getOffer()

    if (offer.note) {
      return (
        <>
          <Spacer mb={[2, 3]} />
          <Serif size={["2", "3t"]} weight="semibold" color="black100">
            Your note
          </Serif>
          <Serif size={["2", "3t"]} color="black60">
            {offer.note}
          </Serif>
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

const Entry: React.SFC<EntryProps> = ({ label, value, final }) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <div>
      <Serif size={["2", "3"]} color="black60">
        {label}
      </Serif>
    </div>
    <div>
      <Serif
        size={["2", "3"]}
        color={final ? "black100" : "black60"}
        weight={final ? "semibold" : "regular"}
      >
        {value}
      </Serif>
    </div>
  </Flex>
)

const SecondaryEntry: React.SFC<SecondaryEntryProps> = ({ label, value }) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <div>
      <Sans size="2" color="black60">
        {label}
      </Sans>
    </div>
    <div>
      <Sans size="2" color="black60">
        {value}
      </Sans>
    </div>
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
        mode
        shippingTotal(precision: 2)
        shippingTotalCents
        taxTotal(precision: 2)
        taxTotalCents
        itemsTotal(precision: 2)
        totalListPrice(precision: 2)
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
