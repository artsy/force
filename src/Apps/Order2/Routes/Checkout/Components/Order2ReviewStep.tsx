import ShieldIcon from "@artsy/icons/ShieldIcon"
import { Box, Flex, Image, Message, Spacer, Text } from "@artsy/palette"
import { Order2PricingBreakdown } from "Apps/Order2/Components/Order2PricingBreakdown"
import { RouterLink } from "System/Components/RouterLink"
import type { Order2ReviewStep_order$key } from "__generated__/Order2ReviewStep_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2ReviewStepProps {
  order: Order2ReviewStep_order$key
}

export const Order2ReviewStep: React.FC<Order2ReviewStepProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const artwork = orderData.lineItems[0]?.artwork
  const artworkVersion = orderData.lineItems[0]?.artworkVersion

  return (
    <Flex flexDirection="column" backgroundColor="mono0" p={2}>
      <Text variant="sm-display" fontWeight={500} color="mono100">
        Order summary
      </Text>
      <Flex py={1} justifyContent="space-between" alignItems="flex-start">
        <RouterLink flex={0} to={`/artwork/${artwork?.slug}`} target="_blank">
          <Image
            mr={1}
            src={artworkVersion?.image?.resized?.url}
            alt={artworkVersion?.title || ""}
            width="65px"
          />
        </RouterLink>
        <Box overflow="hidden" flex={1}>
          <Text overflowEllipsis variant="sm" color="mono100">
            {artworkVersion?.artistNames}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
            {artworkVersion?.title}, {artworkVersion?.date}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
            List price: $1,000,000
          </Text>
          <Spacer y={0.5} />
          <Text overflowEllipsis variant="xs" color="mono60" textAlign="left">
            From an unknown edition
          </Text>
          <Text overflowEllipsis variant="xs" color="mono60" textAlign="left">
            78 x 78 x 6in (27.9 x 27.9 x 8.9 cm)
          </Text>
        </Box>
      </Flex>
      <Box mb={2}>
        <Order2PricingBreakdown order={orderData} />
      </Box>
      <Message variant="default">
        <Flex>
          <ShieldIcon fill="mono100" />
          <Spacer x={1} />
          <Text variant="xs" color="mono100">
            Your purchase is protected with Artsy’s Buyer Guarantee.
          </Text>
        </Flex>
      </Message>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2ReviewStep_order on Order {
    ...Order2PricingBreakdown_order
    mode
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
