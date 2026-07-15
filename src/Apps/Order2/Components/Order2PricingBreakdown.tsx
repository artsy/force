import type { ContextModule } from "@artsy/cohesion"
import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { Flex, SkeletonText, Spacer, Text } from "@artsy/palette"
import type { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { RouterLink } from "System/Components/RouterLink"
import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"
import type {
  Order2PricingBreakdown_order$data,
  Order2PricingBreakdown_order$key,
} from "__generated__/Order2PricingBreakdown_order.graphql"
import { DateTime } from "luxon"
import { Fragment } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2PricingBreakdownProps {
  order: Order2PricingBreakdown_order$key
  contextModule: ContextModule
  isLoading?: boolean
  checkoutTracking: ReturnType<typeof useCheckoutTracking>
  // Defaults on. Pass false to price from the order rather than the buyer's pending offer
  priceFromPendingOffer?: boolean
}

const TAX_CALCULATION_ARTICLE_URL =
  "https://support.artsy.net/s/article/How-are-taxes-and-customs-fees-calculated"

export const Order2PricingBreakdown: React.FC<Order2PricingBreakdownProps> = ({
  order,
  contextModule,
  isLoading,
  checkoutTracking,
  priceFromPendingOffer = true,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const { mode, source, buyerState, buyerStateExpiresAt } = orderData

  const isOffer = mode === "OFFER"
  const accountForPartnerOffer = !isOffer && source === "PARTNER_OFFER"

  // Show the expiry countdown for partner offers (buy-now) or when a gallery
  // offer is awaiting the buyer's response (the respond flow).
  const isAwaitingBuyerResponse = buyerState === "OFFER_RECEIVED"
  const showOfferCountdown = accountForPartnerOffer || isAwaitingBuyerResponse

  // Calculate timer directly in this component to ensure re-renders. Only the
  // end time drives the countdown display; startTime feeds percentComplete
  // (unused here), so partner offers assume a 3-day window.
  const offerEndTime = (showOfferCountdown && buyerStateExpiresAt) || ""
  const offerStartTime = accountForPartnerOffer
    ? DateTime.fromISO(offerEndTime).minus({ days: 3 }).toString()
    : offerEndTime

  const timer = useCountdownTimer({
    startTime: offerStartTime,
    endTime: offerEndTime,
    imminentTime: 1,
  })

  const pricingBreakdownLines =
    priceFromPendingOffer &&
    isOffer &&
    orderData.pendingOffer?.pricingBreakdownLines
      ? orderData.pendingOffer.pricingBreakdownLines
      : orderData.pricingBreakdownLines

  return (
    <>
      {pricingBreakdownLines.map((line, index) => {
        if (!(line && isKnownLineType(line))) {
          return null
        }

        const typename = line.__typename
        let variant: "sm" | "sm-display" = "sm"
        let fontWeight: "normal" | "bold" = "normal"
        let color = "mono60"
        let withAsterisk = false
        let secondLine: JSX.Element | null = null

        let amountText = ""
        let showSkeleton = false
        switch (typename) {
          case "SubtotalLine":
            if (line.amount) {
              amountText = `${line.amount.currencySymbol}${line.amount.amount}`
            } else if (isOffer) {
              amountText = "Waiting for your offer"
            }

            // Show timer if we have a valid offer with time remaining
            if (showOfferCountdown && timer.hasValidRemainingTime) {
              color = "blue100"

              secondLine = (
                <>
                  <Text variant="sm" color="blue100">
                    <Flex alignItems="center">
                      <StopwatchIcon height={18} />
                      <Spacer x={0.5} />
                      Exp. {timer.remainingTime}
                    </Flex>
                  </Text>
                  <Spacer y={0.5} />
                </>
              )
            }

            break
          case "ShippingLine":
            if (isLoading) {
              showSkeleton = true
            } else if (line.amount) {
              amountText = `${line.amount.currencySymbol}${line.amount.amount}`
            } else {
              amountText = line.amountFallbackText as string
            }
            break
          case "TaxLine":
            if (isLoading) {
              showSkeleton = true
            } else if (line.amount) {
              amountText = `${line.amount.currencySymbol}${line.amount.amount}`
            } else {
              amountText = line.amountFallbackText as string
            }
            withAsterisk = true
            break
          case "TotalLine":
            variant = "sm-display"
            fontWeight = "bold"
            color = "mono100"
            if (isLoading) {
              showSkeleton = true
            } else if (line.amount?.display) {
              amountText = line.amount.display
            } else {
              amountText = line.amountFallbackText as string
            }
        }

        return (
          <Fragment key={typename}>
            {typename === "TotalLine" && <Spacer y={0.5} />}
            <Flex color={color}>
              <Text flexGrow={1} variant={variant} fontWeight={fontWeight}>
                {line.displayName}
                {withAsterisk && "*"}
              </Text>
              <Text flexGrow={0} variant={variant} fontWeight={fontWeight}>
                {showSkeleton ? (
                  <SkeletonText variant={variant}>Loading</SkeletonText>
                ) : (
                  amountText
                )}
              </Text>
            </Flex>
            {secondLine}
          </Fragment>
        )
      })}
      <Text variant="xs" color="mono60" textAlign="left" mt={2}>
        *Additional duties and taxes{" "}
        <RouterLink
          inline
          to={TAX_CALCULATION_ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            checkoutTracking?.clickedImportFees(contextModule)
          }}
        >
          may apply at import
        </RouterLink>
        .
      </Text>
    </>
  )
}

const FRAGMENT = graphql`
  fragment Order2PricingBreakdown_order on Order {
    source
    mode
    buyerState
    buyerStateExpiresAt
    pricingBreakdownLines {
      __typename
      ... on ShippingLine {
        displayName
        amountFallbackText
        amount {
          amount
          currencySymbol
        }
      }

      ... on TaxLine {
        displayName
        amountFallbackText
        amount {
          amount
          currencySymbol
        }
      }

      ... on SubtotalLine {
        displayName
        amount {
          amount
          currencySymbol
        }
      }

      ... on TotalLine {
        displayName
        amountFallbackText
        amount {
          display
        }
      }
    }
    pendingOffer {
      pricingBreakdownLines {
        __typename
        ... on ShippingLine {
          displayName
          amountFallbackText
          amount {
            amount
            currencySymbol
          }
        }

        ... on TaxLine {
          displayName
          amountFallbackText
          amount {
            amount
            currencySymbol
          }
        }

        ... on SubtotalLine {
          displayName
          amount {
            amount
            currencySymbol
          }
        }

        ... on TotalLine {
          displayName
          amountFallbackText
          amount {
            display
          }
        }
      }
    }
  }
`

const knownLineTypes = [
  "ShippingLine",
  "TaxLine",
  "SubtotalLine",
  "TotalLine",
] as const

type KnownLineType = Extract<
  Order2PricingBreakdown_order$data["pricingBreakdownLines"][number],
  { __typename: (typeof knownLineTypes)[number] }
>

const isKnownLineType = (
  line: Order2PricingBreakdown_order$data["pricingBreakdownLines"][number],
): line is KnownLineType => {
  return !!line && knownLineTypes.includes(line.__typename as any)
}
