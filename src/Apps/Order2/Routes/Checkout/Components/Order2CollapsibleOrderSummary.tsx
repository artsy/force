import { ContextModule } from "@artsy/cohesion"
import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import { Box, Clickable, Flex, Image, Spacer, Text } from "@artsy/palette"
import { Order2CheckoutPricingBreakdown } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutPricingBreakdown"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { RouterLink } from "System/Components/RouterLink"
import type { Order2CollapsibleOrderSummary_order$key } from "__generated__/Order2CollapsibleOrderSummary_order.graphql"
import type * as React from "react"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2CollapsibleOrderSummaryProps {
  order: Order2CollapsibleOrderSummary_order$key
}

export const Order2CollapsibleOrderSummary: React.FC<
  Order2CollapsibleOrderSummaryProps
> = ({ order }) => {
  const { checkoutTracking, artworkPath } = useCheckoutContext()
  const orderData = useFragment(FRAGMENT, order)
  const [isExpanded, setIsExpanded] = useState(false)

  const artworkVersion = orderData.lineItems[0]?.artworkVersion

  const handleToggle = () => {
    checkoutTracking.toggledCollapsibleOrderSummary(!isExpanded)
    setIsExpanded(!isExpanded)
  }

  // Check for url on the artworkVersion before assigning the resized url
  const fallbackImage = orderData.lineItems[0]?.artwork?.figures?.[0]
  const fallbackImageUrl =
    fallbackImage?.__typename === "Image"
      ? fallbackImage.resizedSquare?.url
      : null

  const imageUrl = artworkVersion?.thumbnail?.url
    ? artworkVersion?.thumbnail?.resizedSquare?.url
    : fallbackImageUrl

  return (
    <Box backgroundColor="mono0">
      <Clickable
        display="flex"
        width="100%"
        onClick={handleToggle}
        py={1}
        px={2}
        justifyContent="space-between"
      >
        {imageUrl && (
          <RouterLink
            flex={0}
            to={artworkPath}
            target="_blank"
            onClick={() => {
              const artworkInternalID =
                orderData.lineItems[0]?.artwork?.internalID
              if (artworkInternalID) {
                checkoutTracking.clickedOrderArtworkImage({
                  destinationPageOwnerId: artworkInternalID,
                  contextModule: ContextModule.ordersCheckout,
                })
              }
            }}
          >
            <Image
              mr={1}
              src={imageUrl}
              alt={artworkVersion?.title as string}
              width={40}
              height={40}
            />
          </RouterLink>
        )}
        <Box overflow="hidden" flex={1} mr={2}>
          <Text overflowEllipsis variant="sm" color="mono100">
            {artworkVersion?.artistNames}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60">
            {[artworkVersion?.title, artworkVersion?.date].join(", ")}
          </Text>
        </Box>
        <Flex flexShrink={0}>
          <Text variant="sm" color="mono100" mr={0.5}>
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
        </Flex>
      </Clickable>
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
          <Order2CheckoutPricingBreakdown
            order={orderData}
            contextModule={ContextModule.ordersCheckout}
          />
        </Box>
        <Spacer y={1} />
      </Box>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment Order2CollapsibleOrderSummary_order on Order {
    ...Order2CheckoutPricingBreakdown_order
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
      artworkVersion {
        title
        artistNames
        date
        thumbnail: image {
          url
          resizedSquare: resized(height: 200, version: ["square"]) {
            url
          }
        }
      }
      artwork {
        internalID
        figures(includeAll: false) {
          __typename
          ... on Image {
            resizedSquare: resized(height: 200, version: ["square"]) {
              url
            }
          }
        }
      }
    }
  }
`
