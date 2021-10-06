import React from "react"
import { BorderedRadio, BoxProps, Flex, RadioGroup, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ShippingQuotes_shippingQuotes } from "v2/__generated__/ShippingQuotes_shippingQuotes.graphql"
import { compact } from "lodash"

export const shippingQuoteDescriptions = {
  standard:
    "Delivers to your door in 3-5 business days once packaged and shipped via a common carrier.",
  express:
    "Delivers to your door in 2 business days once packaged and shipped via a common carrier.",
  rush:
    "Delivers to your door in 1 business day once packaged and shipped via a common carrier.",
  premium:
    "Inside delivery shipped via a white glove shipping service with custom packaging. Delivery timing variable.",
  "white glove":
    "Room-of-choice delivery handled via trained technicians with specialized packaging and climate-controlled transportation. Recommended for high-value works. Delivery timing variable.",
}

export interface ShippingQuotesProps extends BoxProps {
  onSelect: (shippingQuoteId: string) => void
  shippingQuotes: ShippingQuotes_shippingQuotes
  selectedShippingQuoteId?: string
}

export const ShippingQuotes: React.FC<ShippingQuotesProps> = ({
  onSelect,
  shippingQuotes,
  selectedShippingQuoteId,
  ...rest
}) => {
  const quotes = compact(
    shippingQuotes?.map(quote => quote.node)
  ).sort((a, b) => (a && b ? a.priceCents - b.priceCents : 0))

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
        const { id, displayName, price } = shippingQuote
        const description = shippingQuoteDescriptions[displayName.toLowerCase()]

        return (
          <BorderedRadio
            data-test="shipping-quotes"
            value={id}
            key={id}
            position="relative"
          >
            <Flex flexDirection="column" width="100%">
              <Flex justifyContent="space-between">
                <Text textTransform="capitalize">{displayName}</Text>
                <Text textTransform="capitalize" data-test="quotePrice">
                  {price}
                </Text>
              </Flex>
              <Text textColor="black60">{description}</Text>
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
          displayName
          isSelected
          price(precision: 2)
          priceCents
        }
      }
    `,
  }
)
