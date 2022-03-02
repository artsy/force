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
import { appendCurrencySymbol } from "v2/Apps/Order/Utils/currencyUtils"
import { withSystemContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { userHasLabFeature } from "v2/Utils/user"

export interface TransactionDetailsSummaryItemProps
  extends Omit<StepSummaryItemProps, "order"> {
  order: TransactionDetailsSummaryItem_order
  offerOverride?: string | null | number
  useLastSubmittedOffer?: boolean
  offerContextPrice?: "LIST_PRICE" | "LAST_OFFER"
  showOfferNote?: boolean
  transactionStep?: string | null
  showCongratulationMessage?: boolean
  isEigen?: boolean
  showOrderNumberHeader?: boolean
  user: User
}

export class TransactionDetailsSummaryItem extends React.Component<
  TransactionDetailsSummaryItemProps
> {
  static defaultProps: Partial<TransactionDetailsSummaryItemProps> = {
    offerContextPrice: "LIST_PRICE",
  }

  avalaraPhase2enabled = userHasLabFeature(this.props.user, "Avalara Phase 2")

  render() {
    const {
      showOfferNote,
      offerOverride,
      order,
      transactionStep,
      isEigen,
      showCongratulationMessage = false,
      ...others
    } = this.props

    return (
      <StepSummaryItem {...others}>
        {this.renderPriceEntry()}
        <Spacer mb={2} />
        <Entry
          label={this.shippingDisplayLabel(this.shippingNotCalculated)}
          value={this.shippingDisplayAmount()}
          data-test="shippingDisplayAmount"
        />

        <Entry
          label={this.avalaraPhase2enabled ? "Tax*" : "Tax"}
          value={this.taxDisplayAmount()}
          data-test="taxDisplayAmount"
        />
        <Spacer mb={2} />
        <Entry
          label="Total"
          value={
            this.buyerTotalDisplayAmount()
              ? this.buyerTotalDisplayAmount()
              : "Waiting for final costs"
          }
          final
          data-test="buyerTotalDisplayAmount"
        />
        <Spacer mb={2} />
        {this.avalaraPhase2enabled && (
          <Text variant={["xs", "sm"]} color="black60">
            *Additional duties and taxes{" "}
            <a
              href="https://support.artsy.net/hc/en-us/articles/4413546314647-Will-my-order-be-subject-to-customs-fees-"
              target="_blank"
              rel="noopener noreferrer"
            >
              may apply at import.
            </a>
          </Text>
        )}
        <Spacer mb={2} />
        {this.avalaraPhase2enabled && this.shippingNotCalculated() && (
          <Text variant={["xs", "sm"]} color="black60">
            **Shipping costs to be confirmed by gallery. You will be able to
            review the total price before payment.
          </Text>
        )}
        {showOfferNote && order.mode === "OFFER" && this.renderNoteEntry()}
        {showCongratulationMessage && (
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
                Congratulations! This artwork will be added to your Collection
                once the gallery confirms the order.
              </Text>
              <Text variant="sm">
                View and manage all artworks in your Collection{" "}
                {!isEigen ? "on the Artsy app." : "through your "}
                {isEigen && (
                  <RouterLink to={"/my-profile"}>profile.</RouterLink>
                )}
              </Text>
            </Flex>
            <Flex pt={1}>
              {!isEigen && (
                <DownloadAppBadges
                  contextModule={ContextModule.ordersSubmitted}
                />
              )}
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

  amountPlaceholder = () => {
    const { transactionStep } = this.props

    if (this.avalaraPhase2enabled) {
      return ["shipping", "offer"].includes(transactionStep!)
        ? "Calculated in next steps"
        : "Waiting for final costs"
    }

    return transactionStep === "review" ? "To be confirmed*" : "—"
  }

  shippingDisplayAmount = () => {
    const { order } = this.props
    const currency = order.currencyCode

    switch (order.mode) {
      case "BUY":
        return (
          appendCurrencySymbol(order.shippingTotal, currency) ||
          this.amountPlaceholder()
        )
      case "OFFER":
        const offer = this.getOffer()
        return (
          (offer && appendCurrencySymbol(offer.shippingTotal, currency)) ||
          this.amountPlaceholder()
        )
    }
  }

  shippingNotCalculated = () => {
    const { order, transactionStep } = this.props
    const shippingAddressAdded = !(
      transactionStep === "shipping" || transactionStep === "offer"
    )

    switch (order.mode) {
      case "BUY":
        return shippingAddressAdded && !order.shippingTotal
      case "OFFER":
        const offer = this.getOffer()
        return shippingAddressAdded && offer && !offer.shippingTotal
    }
  }

  shippingDisplayLabel = shippingNotCalculated => {
    const { order } = this.props

    if (this.avalaraPhase2enabled && shippingNotCalculated()) {
      return "Shipping**"
    }

    if (order.requestedFulfillment?.__typename === "CommerceShipArta") {
      const selectedShippingQuote = extractNodes(order.lineItems)?.[0]
        .selectedShippingQuote

      if (selectedShippingQuote) {
        return `${selectedShippingQuote.displayName} delivery`
      }
    }

    return "Shipping"
  }

  taxDisplayAmount = () => {
    const { order } = this.props
    const currency = order.currencyCode

    switch (order.mode) {
      case "BUY":
        return (
          appendCurrencySymbol(order.taxTotal, currency) ||
          this.amountPlaceholder()
        )
      case "OFFER":
        const offer = this.getOffer()
        return (
          (offer && appendCurrencySymbol(offer.taxTotal, currency)) ||
          this.amountPlaceholder()
        )
    }
  }

  buyerTotalDisplayAmount = () => {
    const { order } = this.props
    const currency = order.currencyCode

    switch (order.mode) {
      case "BUY":
        return appendCurrencySymbol(order.buyerTotal, currency)
      case "OFFER":
        const offer = this.getOffer()
        return offer && appendCurrencySymbol(offer.buyerTotal, currency)
    }
  }

  renderPriceEntry = () => {
    const { order, offerOverride, offerContextPrice } = this.props
    const currency = order.currencyCode

    if (order.mode === "BUY") {
      return (
        <Entry
          label="Price"
          value={appendCurrencySymbol(order.itemsTotal, currency)}
          data-test="price"
        />
      )
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
            appendCurrencySymbol(offerOverride, currency) ||
            (offer && appendCurrencySymbol(offer.amount, currency)) ||
            "—"
          }
          data-test="offer"
        />
        {offerContextPrice === "LIST_PRICE" ? (
          offerItem &&
          !this.avalaraPhase2enabled && (
            <SecondaryEntry
              label="List price"
              value={appendCurrencySymbol(offerItem.price, currency)}
            />
          )
        ) : (
          // show last offer
          <SecondaryEntry
            label={
              order.lastOffer?.fromParticipant === "SELLER"
                ? "Seller's offer"
                : "Your offer"
            }
            value={appendCurrencySymbol(order.lastOffer?.amount, currency)}
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
      <Text variant={["xs", "sm"]} color={final ? "black100" : "black60"}>
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
  withSystemContext(TransactionDetailsSummaryItem),
  {
    order: graphql`
      fragment TransactionDetailsSummaryItem_order on CommerceOrder {
        __typename
        requestedFulfillment {
          __typename
        }
        code
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
        mode
        shippingTotal(precision: 2)
        shippingTotalCents
        taxTotal(precision: 2)
        taxTotalCents
        itemsTotal(precision: 2)
        buyerTotal(precision: 2)
        currencyCode
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
