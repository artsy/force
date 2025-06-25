import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { Flex, Spacer, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { RouterLink } from "System/Components/RouterLink"
import type {
  Order2CheckoutPricingBreakdown_order$data,
  Order2CheckoutPricingBreakdown_order$key,
} from "__generated__/Order2CheckoutPricingBreakdown_order.graphql"
import { Fragment } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2CheckoutPricingBreakdownProps {
  order: Order2CheckoutPricingBreakdown_order$key
}

const TAX_CALCULATION_ARTICLE_URL =
  "https://support.artsy.net/s/article/How-are-taxes-and-customs-fees-calculated"

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
  line: Order2CheckoutPricingBreakdown_order$data["pricingBreakdownLines"][number],
): line is KnownLineType => {
  return !!line && knownLineTypes.includes(line.__typename as any)
}

export const Order2CheckoutPricingBreakdown: React.FC<
  Order2CheckoutPricingBreakdownProps
> = ({ order }) => {
  const { checkoutTracking, partnerOffer } = useCheckoutContext()
  const { pricingBreakdownLines } = useFragment(FRAGMENT, order)

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

        let amountText: string
        switch (typename) {
          case "SubtotalLine":
            amountText = line.amount
              ? `${line.amount.currencySymbol}${line.amount.amount}`
              : ""

            // TODO
            if (partnerOffer) {
              color = "blue100"
              fontWeight = "bold"
              secondLine = (
                <Text variant="sm-display" color="blue100" mt={0.5}>
                  <StopwatchIcon />
                  {partnerOffer.timer.remainingTime}
                </Text>
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
            {secondLine && secondLine}
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
    buyerStateExpiresAt
    # BuyerState to make sure the timer applies only to pre-submission orders?
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
