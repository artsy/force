import StopwatchIcon from "@artsy/icons/StopwatchIcon"
import { Flex, Spacer, Text } from "@artsy/palette"
import type { Order2CheckoutModel } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
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

            if (isValidTimer(partnerOffer)) {
              color = "blue100"

              secondLine = (
                <>
                  <Text variant="sm" color="blue100">
                    <Flex alignItems="center">
                      <StopwatchIcon height={18} />
                      <Spacer x={0.5} />
                      Exp. {partnerOffer.timer.remainingTime}
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

const isValidTimer = (
  partnerOffer?: Order2CheckoutModel["partnerOffer"],
): partnerOffer is NonNullable<Order2CheckoutModel["partnerOffer"]> => {
  if (!partnerOffer?.timer?.remainingTime?.length) {
    return false
  }
  return (
    !partnerOffer?.timer.remainingTime.startsWith("NaN") &&
    !partnerOffer.timer.isExpired
  )
}
