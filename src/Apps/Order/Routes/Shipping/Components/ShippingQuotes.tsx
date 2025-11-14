import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { CollapseDetails } from "Apps/Order/Routes/Shipping/Components/CollapseDetails"
import { useShippingContext } from "Apps/Order/Routes/Shipping/Hooks/useShippingContext"
import { extractNodes } from "Utils/extractNodes"
import {
  BorderedRadio,
  Column,
  Flex,
  GridColumns,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import type { ShippingQuotes_order$key } from "__generated__/ShippingQuotes_order.graphql"
import type * as React from "react"
import { useEffect } from "react"
import { graphql, useFragment } from "react-relay"

export interface ShippingQuotesProps {
  order: ShippingQuotes_order$key
}

export const ShippingQuotes: React.FC<
  React.PropsWithChildren<ShippingQuotesProps>
> = ({ order }) => {
  const shippingContext = useShippingContext()
  const orderTracking = useOrderTracking()
  const { orderData } = shippingContext

  const data = useFragment(
    graphql`
      fragment ShippingQuotes_order on CommerceOrder {
        lineItems {
          edges {
            node {
              shippingQuoteOptions {
                edges {
                  node {
                    id
                    isSelected
                    price(precision: 2)
                    priceCents
                    typeName
                  }
                }
              }
            }
          }
        }
      }
    `,
    order,
  )

  const firstLineItem = extractNodes(data.lineItems)[0] ?? {}
  const quotes = extractNodes(firstLineItem.shippingQuoteOptions) ?? []

  useAutoSelectBestShippingQuote(quotes)

  if (!quotes.length) {
    return null
  }

  const handleShippingQuoteSelected = (newShippingQuoteID: string) => {
    orderTracking.clickedSelectShippingOption(newShippingQuoteID)
    shippingContext.actions.setSelectedShippingQuote(newShippingQuoteID)
  }

  return (
    <CollapseDetails>
      <Text variant="sm">Artsy shipping options</Text>

      <Text variant="xs" mb="1" color="mono60">
        {orderData.isOffer ? (
          <>
            Please note that these are estimates and may change once offer is
            finalized. All options are eligible for Artsy’s Buyer Guarantee
            policy, which protects against damage and loss.
          </>
        ) : (
          <>
            All options are eligible for Artsy’s Buyer Guarantee policy, which
            protects against damage and loss.
          </>
        )}
      </Text>

      <RadioGroup
        onSelect={handleShippingQuoteSelected}
        data-testid="shipping-quotes"
        defaultValue={shippingContext.state.selectedShippingQuoteID}
      >
        {quotes.map(shippingQuote => {
          const description =
            shippingQuoteDescriptions[shippingQuote?.typeName as string]
          const displayName =
            shippingQuoteDisplayNames[shippingQuote?.typeName as string]

          return (
            <BorderedRadio
              value={shippingQuote?.id}
              key={shippingQuote?.id}
              position="relative"
            >
              <Flex flexDirection="column" width="100%">
                <GridColumns>
                  <Column span={10}>
                    <Text variant="sm-display" textTransform="capitalize">
                      {displayName}
                    </Text>
                    <Text textColor="mono60">{description}</Text>
                  </Column>
                  <Column span={2} textAlign={"right"}>
                    <Text textTransform="capitalize" data-testid="quotePrice">
                      {shippingQuote?.price}
                    </Text>
                  </Column>
                </GridColumns>
              </Flex>
            </BorderedRadio>
          )
        })}
      </RadioGroup>

      <Spacer y={4} />
    </CollapseDetails>
  )
}

export const shippingQuoteDescriptions = {
  // Domestic shipping quotes
  ground:
    "Delivers to your door in 3-5 business days once packaged and shipped via a common carrier.",
  second_day_air:
    "Delivers to your door in 2 business days once packaged and shipped via a common carrier.",
  next_day_air:
    "Delivers to your door in 1 business day once packaged and shipped via a common carrier.",
  select:
    "Inside delivery shipped via a white glove shipping service with custom packaging. Delivery timing variable.",
  premium:
    "This service includes custom packing, transportation on a fine art shuttle, and in-home delivery. Recommended for high-value works. Delivery timing variable.",
  // International shipping quotes
  economy:
    "Delivers to your door in 5-7 business days once packaged and shipped via a common carrier, depending on destination and prompt payment of applicable duties and taxes.",
  standard:
    "Delivers to your door in 3-5 business days once packaged and shipped via a common carrier, depending on destination and prompt payment of applicable duties and taxes.",
  priority:
    "Delivers to your door in 2-4 business days once packaged and shipped via a common carrier, depending on destination and prompt payment of applicable duties and taxes.",
}

export const shippingQuoteDisplayNames = {
  // Domestic shipping quotes
  ground: "Standard",
  second_day_air: "Express",
  next_day_air: "Rush",
  select: "Premium",
  premium: "White Glove",
  // International shipping quotes
  economy: "Saver",
  standard: "Standard",
  priority: "Priority",
}

const useAutoSelectBestShippingQuote = (
  quotes: Array<{
    id: string
    isSelected: boolean
  }>,
) => {
  const shippingContext = useShippingContext()

  /* The best available quote is the one of those currently available that:
   * is selected on the client,
   * or that is already selected on the server,
   * or the first quote in the list
   */
  const bestArtsyShippingQuoteID =
    quotes.find(
      quote => quote.id === shippingContext.state.selectedShippingQuoteID,
    )?.id ||
    quotes.find(quote => quote.isSelected)?.id ||
    quotes?.[0]?.id

  useEffect(() => {
    if (
      shippingContext.state.stage === "shipping_quotes" &&
      bestArtsyShippingQuoteID &&
      bestArtsyShippingQuoteID !== shippingContext.state.selectedShippingQuoteID
    ) {
      shippingContext.actions.setSelectedShippingQuote(bestArtsyShippingQuoteID)
    }
  }, [
    bestArtsyShippingQuoteID,
    shippingContext.state.stage,
    shippingContext.state.selectedShippingQuoteID,
    shippingContext.actions,
  ])
}
