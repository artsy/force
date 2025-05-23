import ShieldIcon from "@artsy/icons/ShieldIcon"
import { Box, Flex, Image, Message, Spacer, Text } from "@artsy/palette"
import { Order2PricingBreakdown } from "Apps/Order2/Components/Order2PricingBreakdown"
import { RouterLink } from "System/Components/RouterLink"
import type { Order2DetailsOrderSummary_order$key } from "__generated__/Order2DetailsOrderSummary_order.graphql"
import type * as React from "react"
import { graphql, useFragment } from "react-relay"

interface Order2DetailsOrderSummaryProps {
  order: Order2DetailsOrderSummary_order$key
}

const BUYER_GUARANTEE_URL =
  "https://support.artsy.net/s/article/The-Artsy-Guarantee"

export const Order2DetailsOrderSummary: React.FC<
  Order2DetailsOrderSummaryProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)

  const artwork = orderData.lineItems[0]?.artwork
  const artworkVersion = orderData.lineItems[0]?.artworkVersion
  const artworkImage = artworkVersion?.image

  return (
    <Box backgroundColor="mono0" p={2}>
      {artworkImage?.resized?.url && (
        <Flex alignItems="center" width="100%" flexDirection="column" m={1}>
          <RouterLink to={`/artwork/${artwork?.slug}`} target="_blank">
            <Image
              src={artworkImage?.resized?.url}
              alt={artworkVersion?.title as string}
            />
          </RouterLink>
        </Flex>
      )}

      <Spacer y={2} />
      <Box>
        <Text variant="sm" overflowEllipsis>
          {artworkVersion?.artistNames}
        </Text>
        <Text variant="sm" color="mono60" overflowEllipsis>
          {[artworkVersion?.title, artworkVersion?.date].join(", ")}
        </Text>
        {orderData.totalListPrice && (
          <Text variant="sm" color="mono60">
            List price: {orderData.totalListPrice.display}
          </Text>
        )}
      </Box>
      <Spacer y={2} />
      {artworkVersion?.attributionClass?.shortDescription && (
        <Text variant="sm" color="mono60">
          {artworkVersion.attributionClass.shortDescription}
        </Text>
      )}
      {artworkVersion?.dimensions && (
        <Text variant="sm" color="mono60">
          {artworkVersion.dimensions.in} | {artworkVersion.dimensions.cm}
        </Text>
      )}
      <Spacer y={2} />
      <Box mb={2}>
        <Order2PricingBreakdown order={orderData} />
      </Box>
      <Spacer y={4} />
      <Message variant="default">
        <Flex>
          <ShieldIcon fill="mono100" />
          <Spacer x={1} />
          <Text variant="xs" color="mono100">
            Your purchase is protected with{" "}
            <RouterLink inline target="_blank" to={BUYER_GUARANTEE_URL}>
              Artsy’s buyer protection
            </RouterLink>
            .
          </Text>
        </Flex>
      </Message>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment Order2DetailsOrderSummary_order on Order {
    ...Order2PricingBreakdown_order
    source
    totalListPrice {
      display
    }
    itemsTotal {
      display
    }
    shippingTotal {
      display
    }
    taxTotal {
      display
    }
    lineItems {
      artwork {
        slug
      }
      artworkVersion {
        title
        artistNames
        date
        attributionClass {
          shortDescription
        }
        dimensions {
          in
          cm
        }
        image {
          resized(height: 380) {
            url
          }
        }
      }
    }
  }
`
