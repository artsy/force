import { Flex, Spacer, Text } from "@artsy/palette"
import type {
  Order2PricingBreakdown_order$data,
  Order2PricingBreakdown_order$key,
} from "__generated__/Order2PricingBreakdown_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2PricingBreakdownProps {
  order: Order2PricingBreakdown_order$key
}

const knownLineTypes = [
  "ShippingLine",
  "TaxLine",
  "SubtotalLine",
  "TotalLine",
] as const

type KnownLineType = Extract<
  Order2PricingBreakdown_order$data["pricingBreakdownLines"][number],
  { __typename: "ShippingLine" | "TaxLine" | "SubtotalLine" | "TotalLine" }
>

const isKnownLineType = (
  line: Order2PricingBreakdown_order$data["pricingBreakdownLines"][number],
): line is KnownLineType => {
  return !!line && knownLineTypes.includes(line.__typename as any)
}

export const Order2PricingBreakdown: React.FC<Order2PricingBreakdownProps> = ({
  order,
}) => {
  const { pricingBreakdownLines } = useFragment(FRAGMENT, order)
  return (
    <>
      {pricingBreakdownLines.map((line, index) => {
        if (!(line && isKnownLineType(line))) {
          return null
        }

        const typename = line.__typename
        let variant: "sm" | "sm-display" = "sm"
        let fontWeight = "regular"
        let color = "mono60"
        let withAsterisk = false

        let amountText: string
        switch (typename) {
          case "SubtotalLine":
            amountText = line.amount
              ? `${line.amount.currencySymbol} ${line.amount.amount}`
              : ""
            break
          case "ShippingLine":
            amountText = line.amount
              ? `${line.amount.currencySymbol} ${line.amount.amount}`
              : (line.amountFallbackText ?? "")
            break
          case "TaxLine":
            amountText = line.amount
              ? `${line.amount.currencySymbol} ${line.amount.amount}`
              : (line.amountFallbackText ?? "")
            withAsterisk = true
            break
          case "TotalLine":
            variant = "sm-display"
            fontWeight = "medium"
            color = "mono100"
            amountText = (line.amount?.display || line.amountFallbackText) ?? ""
        }
        if (typename === "TotalLine") {
          amountText = (line.amount?.display || line.amountFallbackText) ?? ""
        }

        return (
          <>
            {typename !== "TotalLine" && <Spacer y={0.5} />}
            <Flex key={typename} color={color}>
              <Text flexGrow={1} variant={variant} fontWeight={fontWeight}>
                {line.displayName}
                {withAsterisk && "*"}
              </Text>
              <Text flexGrow={0} variant={variant} fontWeight={fontWeight}>
                {amountText}
              </Text>
            </Flex>
          </>
        )
      })}
    </>
  )
}

const FRAGMENT = graphql`
  fragment Order2PricingBreakdown_order on Order {
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
