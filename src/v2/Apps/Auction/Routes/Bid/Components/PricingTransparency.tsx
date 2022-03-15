import * as React from "react"
import { graphql } from "react-relay"
import {
  PricingTransparencyQuery,
  PricingTransparencyQueryResponse,
  PricingTransparencyQueryVariables,
} from "v2/__generated__/PricingTransparencyQuery.graphql"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useFormContext } from "v2/Apps/Auction/Hooks/useFormContext"

import {
  Text,
  Skeleton,
  SkeletonText,
  Spacer,
  Join,
  Flex,
} from "@artsy/palette"
import { useMemo } from "react"

const PricingTransparency: React.FC<PricingTransparencyQueryResponse> = props => {
  const calculatedCost = props.artwork?.saleArtwork?.calculatedCost

  return (
    <Join separator={<Spacer my={1} />}>
      <Text variant="md" fontWeight="bold">
        Summary
      </Text>

      <Row>
        <Text variant="md">Your Max Bid</Text>
        <Text variant="md">{calculatedCost?.bidAmount?.display}</Text>
      </Row>
      <Row>
        <Text variant="md">Buyer's Premium</Text>
        <Text variant="md">{calculatedCost?.buyersPremium?.display}</Text>
      </Row>
      <Row>
        <Text variant="md">Subtotal</Text>
        <Text variant="md">{calculatedCost?.subtotal?.display}</Text>
      </Row>

      <Text variant="sm" color="black60">
        Plus any applicable shipping, taxes, and fees.
      </Text>
    </Join>
  )
}

const Row: React.FC = ({ children }) => {
  return <Flex justifyContent="space-between">{children}</Flex>
}

const PLACEHOLDER = (
  <Skeleton>
    <Join separator={<Spacer my={1} />}>
      <Text variant="md" fontWeight="bold">
        Summary
      </Text>

      <Row>
        <Text variant="md">Your Max Bid</Text>
        <SkeletonText variant="md">20000</SkeletonText>
      </Row>
      <Row>
        <Text variant="md">Buyer's Premium</Text>
        <SkeletonText variant="md">20000</SkeletonText>
      </Row>
      <Row>
        <Text variant="md">Subtotal</Text>
        <SkeletonText variant="md">20000</SkeletonText>
      </Row>

      <Text variant="sm" color="black60">
        Plus any applicable shipping, taxes, and fees.
      </Text>
    </Join>
  </Skeleton>
)

export const PricingTransparencyQueryRenderer = ({
  saleId,
  artworkId,
}: Omit<PricingTransparencyQueryVariables, "bidAmountMinor">) => {
  const { relayEnvironment } = useSystemContext()
  const { values } = useFormContext()
  const bidAmountMinor = parseInt(values.selectedBid!)

  // Hack to prevent invalid refetch / preloader state during route transition
  // when the url changes after user places a successful bid and we redirect
  // back to artwork/id. If / when we remove the transition to the auction page
  // from artwork/id we can remove this hack.
  const variables = useMemo(() => {
    return {
      saleId,
      artworkId,
      bidAmountMinor,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidAmountMinor])

  return (
    <SystemQueryRenderer<PricingTransparencyQuery>
      placeholder={PLACEHOLDER}
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
      variables={variables}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
        }
        if (!props) {
          return PLACEHOLDER
        }
        if (props) {
          return <PricingTransparency artwork={props.artwork} />
        }
      }}
    />
  )
}
