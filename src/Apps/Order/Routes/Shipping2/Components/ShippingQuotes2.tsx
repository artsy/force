import * as React from "react"
import {
  BorderedRadio,
  Column,
  Flex,
  GridColumns,
  RadioGroup,
  Text,
} from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { ShippingQuotes2_commerceLineItem$key } from "__generated__/ShippingQuotes2_commerceLineItem.graphql"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { extractNodes } from "Utils/extractNodes"
import { useOrderTracking } from "Apps/Order/Hooks/useOrderTracking"
import { useEffect } from "react"

export interface ShippingQuotesProps {
  commerceLineItem: ShippingQuotes2_commerceLineItem$key
}

export const ShippingQuotes2: React.FC<ShippingQuotesProps> = ({
  commerceLineItem,
}) => {
  const shippingContext = useShippingContext()
  const orderTracking = useOrderTracking()

  const data = useFragment(
    graphql`
      fragment ShippingQuotes2_commerceLineItem on CommerceLineItem {
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
    `,
    commerceLineItem
  )

  const quotes = extractNodes(data.shippingQuoteOptions)

  useAutoSelectBestShippingQuote(quotes)

  if (!quotes.length) {
    return null
  }

  const handleShippingQuoteSelected = (newShippingQuoteID: string) => {
    orderTracking.clickedSelectShippingOption(newShippingQuoteID)
    shippingContext.actions.setSelectedShippingQuote(newShippingQuoteID)
  }

  return (
    <RadioGroup
      onSelect={handleShippingQuoteSelected}
      defaultValue={shippingContext.state.selectedShippingQuoteID}
    >
      {quotes.map(shippingQuote => {
        const description =
          shippingQuoteDescriptions[shippingQuote?.typeName as string]
        const displayName =
          shippingQuoteDisplayNames[shippingQuote?.typeName as string]

        return (
          <BorderedRadio
            data-testid="shipping-quotes"
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
                  <Text textColor="black60">{description}</Text>
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
    "Room-of-choice delivery handled via trained technicians with specialized packaging and climate-controlled transportation. Recommended for high-value works. Delivery timing variable.",
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
  }>
) => {
  const shippingContext = useShippingContext()

  /* The best available quote is the one of those currently available that:
   * is selected on the client,
   * or that is already selected on the server,
   * or the first quote in the list
   */
  const bestArtsyShippingQuoteID =
    quotes.find(
      quote => quote.id === shippingContext.state.selectedShippingQuoteID
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
    shippingContext.orderData.selectedShippingQuoteID,
    shippingContext.state.stage,
    shippingContext.state.selectedShippingQuoteID,
    shippingContext.actions,
  ])
}
