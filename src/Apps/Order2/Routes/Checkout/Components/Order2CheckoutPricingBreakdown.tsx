import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { RouterLink } from "System/Components/RouterLink"
import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"
import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { Flex, Spacer, Text } from "@artsy/palette"
import type {
  Order2CheckoutPricingBreakdown_order$data,
  Order2CheckoutPricingBreakdown_order$key,
} from "__generated__/Order2CheckoutPricingBreakdown_order.graphql"
import { DateTime } from "luxon"
import { Fragment } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2CheckoutPricingBreakdownProps {
  order: Order2CheckoutPricingBreakdown_order$key
}

const TAX_CALCULATION_ARTICLE_URL =
  "https://support.artsy.net/s/article/How-are-taxes-and-customs-fees-calculated"

export const Order2CheckoutPricingBreakdown: React.FC<
  Order2CheckoutPricingBreakdownProps
> = ({ order }) => {
  const { checkoutTracking } = useCheckoutContext()
  const { pricingBreakdownLines, mode, buyerStateExpiresAt, source } =
    useFragment(FRAGMENT, order)

  const hasPartnerOffer = source === "PARTNER_OFFER"
  // Calculate timer directly in this component to ensure re-renders
  const partnerOfferEndTime = (hasPartnerOffer && buyerStateExpiresAt) || ""
  const partnerOfferStartTime = hasPartnerOffer
    ? DateTime.fromISO(partnerOfferEndTime).minus({ days: 3 }).toString()
    : ""

  const timer = useCountdownTimer({
    startTime: partnerOfferStartTime,
    endTime: partnerOfferEndTime,
    imminentTime: 1,
  })

  return (
    <>
      {pricingBreakdownLines.map((line, _index) => {
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
        switch (typename) {
          case "SubtotalLine":
            if (line.amount) {
              amountText = `${line.amount.currencySymbol}${line.amount.amount}`
            } else if (mode === "OFFER") {
              amountText = "Waiting for offer"
            }

            // Show timer if we have a valid partner offer with time remaining
            if (hasPartnerOffer && timer.hasValidRemainingTime) {
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
            amountText = line.amount
              ? `${line.amount.currencySymbol}${line.amount.amount}`
              : (line.amountFallbackText as string)
            break
          case "TaxLine":
            amountText = line.amount
              ? `${line.amount.currencySymbol}${line.amount.amount}`
              : (line.amountFallbackText as string)
            withAsterisk = true
            break
          case "TotalLine":
            variant = "sm-display"
            fontWeight = "bold"
            color = "mono100"
            amountText = (line.amount?.display ||
              line.amountFallbackText) as string
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
                {amountText}
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
            checkoutTracking.clickedImportFees()
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
  fragment Order2CheckoutPricingBreakdown_order on Order {
    source
    mode
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
  }
`

const knownLineTypes = [
  "ShippingLine",
  "TaxLine",
  "SubtotalLine",
  "TotalLine",
] as const

type KnownLineType = Extract<
  Order2CheckoutPricingBreakdown_order$data["pricingBreakdownLines"][number],
  { __typename: (typeof knownLineTypes)[number] }
>

const isKnownLineType = (
  line: Order2CheckoutPricingBreakdown_order$data["pricingBreakdownLines"][number]
): line is KnownLineType => {
  return !!line && knownLineTypes.includes(line.__typename as any)
}
