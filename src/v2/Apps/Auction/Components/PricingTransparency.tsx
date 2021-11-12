import { Flex, Sans, Serif, Spinner } from "@artsy/palette"
import * as React from "react"
import { graphql } from "react-relay"

import {
  PricingTransparencyQuery,
  PricingTransparencyQueryResponse,
  PricingTransparencyQueryVariables,
} from "v2/__generated__/PricingTransparencyQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

const Text = props => <Serif size="3t" color="black100" {...props} />
const Row = props => (
  <Flex flexDirection="row" justifyContent="space-between" pb={1} {...props} />
)

export const PricingTransparency: React.FC<PricingTransparencyQueryResponse> = props => {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const { calculatedCost } = props.artwork.saleArtwork

  return (
    <Flex pt={3} flexDirection="column">
      <Serif pb={1} size="4t" weight="semibold" color="black100">
        Summary
      </Serif>

      <Row>
        <Text>Your max bid</Text>
        <Text>{calculatedCost.bidAmount.display}</Text>
      </Row>
      <Row pb={2}>
        <Text>Buyer's Premium</Text>
        <Text>{calculatedCost.buyersPremium.display}</Text>
      </Row>
      <Row>
        <Text>Subtotal</Text>
        <Text>{calculatedCost.subtotal.display}</Text>
      </Row>
      <Sans size="2" color="black60">
        Plus any applicable shipping, taxes, and fees.
      </Sans>
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
      <SystemQueryRenderer<PricingTransparencyQuery>
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
