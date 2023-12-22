import * as React from "react"
import {
  BorderedRadio,
  BoxProps,
  Column,
  Flex,
  GridColumns,
  RadioGroup,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShippingQuotes_shippingQuotes$data } from "__generated__/ShippingQuotes_shippingQuotes.graphql"

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

export interface ShippingQuotesProps extends BoxProps {
  onSelect: (shippingQuoteId: string) => void
  shippingQuotes: ShippingQuotes_shippingQuotes$data
  selectedShippingQuoteId?: string
}

export const ShippingQuotes: React.FC<ShippingQuotesProps> = ({
  onSelect,
  shippingQuotes,
  selectedShippingQuoteId,
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const quotes = shippingQuotes?.map(quote => quote.node!)

  if (!quotes || !quotes.length) {
    return null
  }

  return (
    <RadioGroup
      {...rest}
      onSelect={onSelect}
      defaultValue={selectedShippingQuoteId}
    >
      {quotes.map(shippingQuote => {
        const { id, price, typeName } = shippingQuote
        const description = shippingQuoteDescriptions[typeName]
        const displayName = shippingQuoteDisplayNames[typeName]

        return (
          <BorderedRadio
            data-test="shipping-quotes"
            value={id}
            key={id}
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
                  <Text textTransform="capitalize" data-test="quotePrice">
                    {price}
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

export const ShippingQuotesFragmentContainer = createFragmentContainer(
  ShippingQuotes,
  {
    shippingQuotes: graphql`
      fragment ShippingQuotes_shippingQuotes on CommerceShippingQuoteEdge
        @relay(plural: true) {
        node {
          id
          isSelected
          price(precision: 2)
          priceCents
          typeName
        }
      }
    `,
  }
)
