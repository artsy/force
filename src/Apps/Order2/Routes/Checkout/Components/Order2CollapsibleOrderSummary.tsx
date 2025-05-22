import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import { Box, Clickable, Flex, Image, Spacer, Text } from "@artsy/palette"
import { Order2PricingBreakdown } from "Apps/Order2/Components/Order2PricingBreakdown"
import { RouterLink } from "System/Components/RouterLink"
import type { Order2CollapsibleOrderSummary_order$key } from "__generated__/Order2CollapsibleOrderSummary_order.graphql"
import type * as React from "react"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2CollapsibleOrderSummaryProps {
  order: Order2CollapsibleOrderSummary_order$key
}

// Wrapper component to handle type conversion
const PricingBreakdownWrapper: React.FC<{
  order: Order2CollapsibleOrderSummary_order$key
}> = ({ order }) => {
  const data = useFragment(FRAGMENT, order)
  return <Order2PricingBreakdown order={data as any} />
}

export const Order2CollapsibleOrderSummary: React.FC<
  Order2CollapsibleOrderSummaryProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)
  const [isExpanded, setIsExpanded] = useState(false)

  const artwork = orderData.lineItems[0]?.artwork
  const artworkVersion = orderData.lineItems[0]?.artworkVersion

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box backgroundColor="mono0">
      <Flex py={1} px={2} justifyContent="space-between">
        <RouterLink flex={0} to={`/artwork/${artwork?.slug}`} target="_blank">
          <Image
            mr={1}
            src={artworkVersion?.image?.resized?.url}
            alt={artworkVersion?.title as string}
            width={40}
            height={40}
          />
        </RouterLink>
        <Box overflow="hidden" flex={1} mr={2}>
          <Text overflowEllipsis variant="xs" color="mono100">
            {artworkVersion?.artistNames}
          </Text>
          <Text overflowEllipsis variant="xs" color="mono60">
            {artworkVersion?.title}, {artworkVersion?.date}
          </Text>
        </Box>
        <Clickable display="flex" onClick={handleToggle} flexShrink={0}>
          <Text variant="xs" color="mono100" mr={0.5}>
            {orderData.buyerTotal?.display || orderData.itemsTotal?.display}
          </Text>

          <ChevronDownIcon
            height="18px"
            mt="2px"
            style={{
              transition: "transform 0.3s ease-in-out",
              transform: isExpanded ? "scaleY(-1)" : "scaleY(1)",
            }}
          />
        </Clickable>
      </Flex>
      <Box
        px={2}
        overflow="hidden"
        maxHeight={isExpanded ? "200px" : "0px"}
        style={{
          transition: "max-height 0.3s ease-out",
        }}
      >
        <Spacer y={1} />
        <Box mb={2}>
          <PricingBreakdownWrapper order={order} />
        </Box>
        <Spacer y={1} />
      </Box>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment Order2CollapsibleOrderSummary_order on Order {
    ...Order2PricingBreakdown_order
    source
    buyerTotal {
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
        image {
          resized(width: 185, height: 138) {
            url
          }
        }
      }
    }
  }
`
