import { Flex, Text, Spinner } from "@artsy/palette"
import React from "react"
import { graphql } from "react-relay"

import {
  PricingTransparencyQuery,
  PricingTransparencyQueryResponse,
  PricingTransparencyQueryVariables,
} from "v2/__generated__/PricingTransparencyQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/System"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

const Row = props => (
  <Flex flexDirection="row" justifyContent="space-between" pb={1} {...props} />
)

export const PricingTransparency: React.FC<PricingTransparencyQueryResponse> = props => {
  // @ts-expect-error STRICT_NULL_CHECK
  const { calculatedCost } = props.artwork.saleArtwork

  return (
    <Flex pt={2} flexDirection="column">
      <Text variant="md" pb={1} size="4t" fontWeight="bold" color="black100">
        Summary
      </Text>

      <Row>
        <Text variant="md">Your max bid</Text>
        <Text>{calculatedCost.bidAmount.display}</Text>
      </Row>
      <Row>
        <Text variant="md">Buyer's Premium</Text>
        <Text>{calculatedCost.buyersPremium.display}</Text>
      </Row>
      <Row>
        <Text variant="md">Subtotal</Text>
        <Text>{calculatedCost.subtotal.display}</Text>
      </Row>
      <Text variant="sm" color="black60" mt={2}>
        Plus any applicable shipping, taxes, and fees.
      </Text>
    </Flex>
  )
}

export const PricingTransparencyQueryRenderer = withSystemContext(
  ({
    saleId,
    artworkId,
    bidAmountMinor,
    relayEnvironment,
  }: SystemContextProps & PricingTransparencyQueryVariables) => {
    return (
      <QueryRenderer<PricingTransparencyQuery>
        environment={relayEnvironment}
        query={graphql`
          query PricingTransparencyQuery(
            $saleId: String!
            $artworkId: String!
            $bidAmountMinor: Int!
          ) {
            artwork(id: $artworkId) {
              saleArtwork(saleID: $saleId) {
                calculatedCost(bidAmountMinor: $bidAmountMinor) {
                  bidAmount {
                    display
                  }
                  buyersPremium {
                    display
                  }
                  subtotal {
                    display
                  }
                }
              }
            }
          }
        `}
        variables={{ saleId, artworkId, bidAmountMinor }}
        render={({ props }) => {
          if (props) {
            return <PricingTransparency artwork={props.artwork} />
          } else {
            return (
              <Flex position="relative" height="178px">
                <Spinner />
              </Flex>
            )
          }
        }}
      />
    )
  }
)
