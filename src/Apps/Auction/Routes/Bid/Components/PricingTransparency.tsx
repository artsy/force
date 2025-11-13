import { useAuctionFormContext } from "Apps/Auction/Hooks/useAuctionFormContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  Flex,
  Join,
  Skeleton,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import type {
  PricingTransparencyQuery,
  PricingTransparencyQuery$data,
  PricingTransparencyQuery$variables,
} from "__generated__/PricingTransparencyQuery.graphql"
import type * as React from "react"
import { useMemo } from "react"
import { graphql } from "react-relay"

const PricingTransparency: React.FC<
  React.PropsWithChildren<PricingTransparencyQuery$data>
> = props => {
  const calculatedCost = props.artwork?.saleArtwork?.calculatedCost

  return (
    <Join separator={<Spacer y={1} />}>
      <Text variant="sm-display" fontWeight="bold">
        Summary
      </Text>

      <Row>
        <Text variant="sm-display">Your Max Bid</Text>
        <Text variant="sm-display">{calculatedCost?.bidAmount?.display}</Text>
      </Row>
      <Row>
        <Text variant="sm-display">Buyer's Premium</Text>
        <Text variant="sm-display">
          {calculatedCost?.buyersPremium?.display}
        </Text>
      </Row>
      <Row>
        <Text variant="sm-display">Subtotal</Text>
        <Text variant="sm-display">{calculatedCost?.subtotal?.display}</Text>
      </Row>

      <Text variant="sm" color="mono60">
        Plus any applicable shipping, taxes, and fees.
      </Text>
    </Join>
  )
}

const Row: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <Flex justifyContent="space-between">{children}</Flex>
}

const PLACEHOLDER = (
  <Skeleton>
    <Join separator={<Spacer y={1} />}>
      <Text variant="sm-display" fontWeight="bold">
        Summary
      </Text>

      <Row>
        <Text variant="sm-display">Your Max Bid</Text>
        <SkeletonText variant="sm-display">20000</SkeletonText>
      </Row>
      <Row>
        <Text variant="sm-display">Buyer's Premium</Text>
        <SkeletonText variant="sm-display">20000</SkeletonText>
      </Row>
      <Row>
        <Text variant="sm-display">Subtotal</Text>
        <SkeletonText variant="sm-display">20000</SkeletonText>
      </Row>

      <Text variant="sm" color="mono60">
        Plus any applicable shipping, taxes, and fees.
      </Text>
    </Join>
  </Skeleton>
)

export const PricingTransparencyQueryRenderer = ({
  saleId,
  artworkId,
}: Omit<PricingTransparencyQuery$variables, "bidAmountMinor">) => {
  const { relayEnvironment } = useSystemContext()
  const { values } = useAuctionFormContext()
  const bidAmountMinor = Number.parseInt(values.selectedBid || "0", 10)

  // Hack to prevent invalid refetch / preloader state during route transition
  // when the url changes after user places a successful bid and we redirect
  // back to artwork/id. If / when we remove the transition to the auction page
  // from artwork/id we can remove this hack.
  // biome-ignore lint/correctness/useExhaustiveDependencies: Bid variables memoization prevents invalid refetch during route transitions
  const variables = useMemo(() => {
    return {
      saleId,
      artworkId,
      bidAmountMinor,
    }
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
