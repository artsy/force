import { ContextModule } from "@artsy/cohesion"
import { Flex, Message, Spacer, Stack, Sup, Text } from "@artsy/palette"
import { shippingQuoteDisplayNames } from "Apps/Order/Routes/Shipping/Components/ShippingQuotes"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { DownloadAppBadges } from "Components/DownloadAppBadges/DownloadAppBadges"
import {
  StepSummaryItem,
  type StepSummaryItemProps,
} from "Components/StepSummaryItem"
import { RouterLink } from "System/Components/RouterLink"
import { withSystemContext } from "System/Contexts/SystemContext"
import { Device, useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { extractNodes } from "Utils/extractNodes"
import type { TransactionDetailsSummaryItem_order$data } from "__generated__/TransactionDetailsSummaryItem_order.graphql"
import type { Omit } from "lodash"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface TransactionDetailsSummaryItemProps
  extends Omit<StepSummaryItemProps, "order"> {
  order: TransactionDetailsSummaryItem_order$data
  offerOverride?: string | null | number
  useLastSubmittedOffer?: boolean
  offerContextPrice?: "LIST_PRICE" | "LAST_OFFER"
  showOfferNote?: boolean
  transactionStep?: string | null
  showCongratulationMessage?: boolean
  isEigen?: boolean
  showOrderNumberHeader?: boolean
}

export const TransactionDetailsSummaryItem: FC<
  React.PropsWithChildren<TransactionDetailsSummaryItemProps>
> = ({
  showOfferNote,
  offerOverride,
  order,
  transactionStep,
  isEigen,
  showCongratulationMessage = false,
  offerContextPrice = "LIST_PRICE",
  useLastSubmittedOffer,
  ...others
}) => {
  const { device } = useDeviceDetection()

  const renderPriceEntry = () => {
    const currency = order.currencyCode

    if (order.mode === "BUY") {
      let price_item_label
      if (order.source === "partner_offer") {
        price_item_label = "Gallery offer"
      } else {
        price_item_label = "Price"
      }

      return (
        <Entry
          label={price_item_label}
          source={order.source}
          value={appendCurrencySymbol(order.itemsTotal, currency)}
          data-test="price"
        />
      )
    }
    const offer = getOffer()
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
        {offerContextPrice === "LAST_OFFER" ? (
          // show last offer
          <SecondaryEntry
            label={
              order.lastOffer?.fromParticipant === "SELLER"
                ? "Seller's offer"
                : "Your offer"
            }
            value={appendCurrencySymbol(order.lastOffer?.amount, currency)}
          />
        ) : null}
      </>
    )
  }

  const getOffer = ():
    | TransactionDetailsSummaryItem_order$data["lastOffer"]
    | null => {
    return useLastSubmittedOffer ? order.lastOffer : order.myLastOffer
  }

  const getShippingLabel = shippingQuoteType => {
    const artsyShippingLabel =
      shippingQuoteDisplayNames[shippingQuoteType] + " delivery"
    const suffix = offerShippingCostSubjectToChange() ? "*" : ""
    return artsyShippingLabel + suffix
  }

  const shippingDisplayLabel = shippingNotCalculated => {
    if (shippingNotCalculated()) {
      return "Shipping*"
    }

    const requestedFulfillment = order.requestedFulfillment

    if (requestedFulfillment?.__typename === "CommerceShipArta") {
      const selectedShippingQuote = extractNodes(order.lineItems)?.[0]
        ?.selectedShippingQuote

      if (selectedShippingQuote) {
        return getShippingLabel(selectedShippingQuote.typeName)
      }
    }

    return "Shipping"
  }

  const shippingNotCalculated = () => {
    const shippingAddressAdded = !(
      transactionStep === "shipping" || transactionStep === "offer"
    )

    switch (order.mode) {
      case "BUY":
        return shippingAddressAdded && !order.shippingTotal
      case "OFFER":
        const offer = getOffer()
        return shippingAddressAdded && offer && !offer.shippingTotal
    }
  }

  const shippingDisplayAmount = () => {
    const currency = order.currencyCode

    switch (order.mode) {
      case "BUY":
        return (
          appendCurrencySymbol(order.shippingTotal, currency) ||
          amountPlaceholder()
        )
      case "OFFER":
        const offer = getOffer()
        return (
          (offer && appendCurrencySymbol(offer.shippingTotal, currency)) ||
          amountPlaceholder()
        )
    }
  }

  const amountPlaceholder = () => {
    return transactionStep && ["shipping", "offer"].includes(transactionStep)
      ? "Calculated in next steps"
      : "Waiting for final costs"
  }

  const taxDisplayAmount = () => {
    const currency = order.currencyCode

    switch (order.mode) {
      case "BUY":
        return (
          appendCurrencySymbol(order.taxTotal, currency) || amountPlaceholder()
        )
      case "OFFER":
        const offer = getOffer()
        return (
          (offer && appendCurrencySymbol(offer.taxTotal, currency)) ||
          amountPlaceholder()
        )
    }
  }

  const taxPrefix = () => {
    let prefix
    if (shippingNotCalculated() || offerShippingCostSubjectToChange()) {
      prefix = <Sup>†</Sup>
    } else {
      prefix = "*"
    }
    return <>{prefix}Additional duties and taxes </>
  }

  const taxLabel = () => {
    let suffix
    if (shippingNotCalculated() || offerShippingCostSubjectToChange()) {
      suffix = <Sup>†</Sup>
    } else {
      suffix = "*"
    }
    return <>Tax{suffix}</>
  }

  const offerShippingCostSubjectToChange = () => {
    const offer = getOffer()

    return (
      !!offer?.shippingTotalCents &&
      order.requestedFulfillment?.__typename === "CommerceShipArta" &&
      offerStillInNegotiation()
    )
  }

  const offerStillInNegotiation = () => {
    return (
      order.mode === "OFFER" &&
      ["PENDING", "SUBMITTED"].includes(order.displayState)
    )
  }

  const buyerTotalDisplayAmount = () => {
    const currency = order.currencyCode
    const totalPlaceholder = "Waiting for final costs"

    switch (order.mode) {
      case "BUY":
        return (
          appendCurrencySymbol(order.buyerTotal, currency) || totalPlaceholder
        )
      case "OFFER":
        const offer = getOffer()
        return (
          (offer && appendCurrencySymbol(offer.buyerTotal, currency)) ||
          totalPlaceholder
        )
    }
  }

  const renderNoteEntry = () => {
    const offer = getOffer()
    if (offer?.note) {
      return (
        <>
          <Spacer y={2} />
          <Text variant="sm" fontWeight="bold" color="mono100">
            Your note
          </Text>
          <Text size="sm" color="mono60">
            {offer.note}
          </Text>
        </>
      )
    }
  }

  return (
    <StepSummaryItem
      {...others}
      data-testid="transactionSummary"
      data-testid-inner="transactionDetailsSummaryItem"
    >
      {renderPriceEntry()}
      <Spacer y={2} />
      <Entry
        label={shippingDisplayLabel(shippingNotCalculated)}
        value={shippingDisplayAmount()}
        data-test="shippingDisplayAmount"
      />
      <Entry
        label={taxLabel()}
        value={taxDisplayAmount()}
        data-test="taxDisplayAmount"
      />
      <Spacer y={2} />
      <Entry
        label="Total"
        value={buyerTotalDisplayAmount()}
        final
        data-test="buyerTotalDisplayAmount"
      />
      <Spacer y={2} />
      {offerShippingCostSubjectToChange() && (
        <Text variant="sm" color="mono60">
          *Estimate only. Price may vary once offer is finalized.
        </Text>
      )}
      {shippingNotCalculated() && (
        <>
          <Spacer y={2} />
          <Text variant="sm" color="mono60">
            *Shipping costs to be confirmed by gallery. You will be able to
            review the total price before payment.
          </Text>
        </>
      )}
      <Text variant="sm" color="mono60">
        {taxPrefix()}
        <RouterLink
          inline
          to="https://support.artsy.net/s/article/How-are-taxes-and-customs-fees-calculated"
          target="_blank"
          rel="noopener noreferrer"
        >
          may apply at import
        </RouterLink>
        .
      </Text>
      {showOfferNote && order.mode === "OFFER" && renderNoteEntry()}
      {showCongratulationMessage && (
        <>
          <Spacer y={1} />

          <Message
            variant="info"
            title="Congratulations! This artwork will be added to your Collection
              once the gallery confirms the order."
          >
            {isEigen ? (
              <>
                View and manage all artworks in your Collection through your{" "}
                {device === Device.iPhone ? (
                  <RouterLink inline to={"/my-collection"}>
                    profile.
                  </RouterLink>
                ) : (
                  "profile."
                )}
              </>
            ) : (
              <Stack gap={1}>
                View and manage all artworks in your Collection on the Artsy
                app.
                <DownloadAppBadges
                  contextModule={ContextModule.ordersSubmitted}
                />
              </Stack>
            )}
          </Message>
        </>
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
  source?: string
}

const Entry: React.FC<React.PropsWithChildren<EntryProps>> = ({
  label,
  value,
  final,
  source,
}) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <div>
      <Text variant="sm" color={getLabelColor(final, source)}>
        {label}
      </Text>
    </div>
    <div>
      <Text
        variant="sm"
        color={getLabelColor(final, source)}
        fontWeight={final ? "semibold" : "regular"}
      >
        {value}
      </Text>
    </div>
  </Flex>
)

const SecondaryEntry: React.FC<
  React.PropsWithChildren<SecondaryEntryProps>
> = ({ label, value }) => (
  <Flex justifyContent="space-between" alignItems="baseline">
    <Text variant="xs" color="mono60">
      {label}
    </Text>
    <Text variant="xs" color="mono60">
      {value}
    </Text>
  </Flex>
)

const getLabelColor = (final?: boolean, source?: string) => {
  let color
  if (source === "partner_offer") {
    color = "blue100"
  } else if (final) {
    color = "mono100"
  } else {
    color = "mono60"
  }
  return color
}

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

export const TransactionDetailsSummaryItemFragmentContainer =
  createFragmentContainer(withSystemContext(TransactionDetailsSummaryItem), {
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
                typeName
              }
            }
          }
        }
        mode
        source
        displayState
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
  })
