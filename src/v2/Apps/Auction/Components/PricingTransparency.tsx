import { Box, Flex, Sans, Serif, Spinner } from "@artsy/palette"
import React from "react"
import { graphql } from "react-relay"

import {
  PricingTransparencyQuery,
  PricingTransparencyQueryResponse,
  PricingTransparencyQueryVariables,
} from "v2/__generated__/PricingTransparencyQuery.graphql"
import { SystemContextProps, withSystemContext } from "v2/Artsy"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"

export const PricingTransparency: React.FC<PricingTransparencyQueryResponse> = props => {
  const { calculatedCost } = props.artwork.saleArtwork

  return (
    <Flex pt={3} flexDirection="column">
      <Serif pb={1} size="4t" weight="semibold" color="black100">
        Summary
      </Serif>

      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
        pb={1}
      >
        <Box>
          <Serif size="3t" color="black100">
            Your max bid
          </Serif>
        </Box>
        <Box>
          <Serif size="3t" color="black100">
            {calculatedCost.bidAmount.display}
          </Serif>
        </Box>
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
        pb={2}
      >
        <Box>
          <Serif size="3t" color="black100">
            Buyer's Premium
          </Serif>
        </Box>
        <Box>
          <Serif size="3t" color="black100">
            {calculatedCost.buyersPremium.display}
          </Serif>
        </Box>
      </Flex>
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
        pb={1}
      >
        <Box>
          <Serif size="3t" color="black100">
            Subtotal
          </Serif>
        </Box>
        <Box>
          <Serif size="3t" color="black100">
            {calculatedCost.subtotal.display}
          </Serif>
        </Box>
      </Flex>
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
