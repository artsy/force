import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import { Box, Clickable, Flex, Image, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import createLogger from "Utils/logger"
import type { Order2CollapsibleOrderSummary_order$key } from "__generated__/Order2CollapsibleOrderSummary_order.graphql"
import type * as React from "react"
import { useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2CollapsibleOrderSummary")

interface Order2CollapsibleOrderSummaryProps {
  order: Order2CollapsibleOrderSummary_order$key
}

export const Order2CollapsibleOrderSummary: React.FC<
  Order2CollapsibleOrderSummaryProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)
  const [isExpanded, setIsExpanded] = useState(false)

  const artwork = orderData.lineItems[0]?.artwork
  const artworkVersion = orderData.lineItems[0]?.artworkVersion

  const isRequiredArtworkDataPresent =
    artwork?.slug &&
    artworkVersion?.image?.resized?.url &&
    artworkVersion?.title &&
    artworkVersion?.artistNames &&
    artworkVersion?.date

  const isRequiredOrderDataPresent =
    orderData.buyerTotal?.display || orderData.itemsTotal?.display

  // TODO: Handle missing/required data more intentionally.
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isRequiredArtworkDataPresent) {
      logger.error("Missing artwork data in Order2CollapsibleOrderSummary", {
        artwork,
        artworkVersion,
      })
    }
    if (!isRequiredOrderDataPresent) {
      logger.error("Missing order data in Order2CollapsibleOrderSummary", {
        orderData,
      })
    }
  }, [])

  if (!isRequiredArtworkDataPresent) {
    return null
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box data-testid="OrderSummary" backgroundColor="mono0">
      <Flex py={1} px={2} justifyContent="space-between">
        <RouterLink flex={0} to={`/artwork/${artwork.slug}`} target="_blank">
          <Image
            mr={1}
            src={artworkVersion.image.resized.url}
            alt={artworkVersion.title}
            width="40px"
          />
        </RouterLink>
        <Box
          overflow="hidden"
          data-testid="OrderSummaryArtworkDetails"
          style={{
            whiteSpace: "nowrap",
          }}
          flex={1}
          mr={2}
        >
          <Text
            overflow="hidden"
            style={{
              textOverflow: "ellipsis",
            }}
            variant="xs"
            color="mono100"
          >
            {artworkVersion.artistNames}
          </Text>
          <Text
            overflow="hidden"
            style={{
              textOverflow: "ellipsis",
            }}
            variant="xs"
            color="mono60"
            textAlign="left"
          >
            {artworkVersion.title}, {artworkVersion.date}
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
              transition: "transform 0.3s ease-in", // Smooth flipping animation
              transitionDelay: "0.15s", // Add a delay to the flip animation to help it line up with the height transition below
              transform: isExpanded ? "scaleY(-1)" : "scaleY(1)", // Flip vertically when expanded
            }}
          />
        </Clickable>
      </Flex>
      <Box
        data-testid="OrderSummaryExpandedContent"
        px={2}
        overflow="hidden"
        maxHeight={isExpanded ? "200px" : "0px"} // Set maxHeight to 0 when collapsed
        style={{
          transition: "max-height 0.3s ease-in", // Smooth transition for maxHeight
        }}
      >
        <Spacer y={1} />
        <Box data-testid="OrderSummaryPriceDetails" mb={2}>
          <Flex data-testid="OrderSummaryPriceLineItem">
            <Text flexGrow={1} variant="sm" color="mono60">
              Price
            </Text>
            <Text flexGrow={0} variant="sm" color="mono60">
              {orderData.itemsTotal?.display}
            </Text>
          </Flex>
          <Flex data-testid="OrderSummaryShippingLineItem">
            <Text flexGrow={1} variant="sm" color="mono60">
              Shipping
            </Text>
            <Text flexGrow={0} variant="sm" color="mono60">
              {orderData.shippingTotal?.display || "Calculated in next steps"}
            </Text>
          </Flex>
          <Flex data-testid="OrderSummaryTaxLineItem">
            <Text flexGrow={1} variant="sm" color="mono60">
              Tax*
            </Text>
            <Text flexGrow={0} variant="sm" color="mono60">
              {orderData.shippingTotal?.display || "Calculated in next steps"}
            </Text>
          </Flex>
          <Spacer y={0.5} />
          <Flex data-testid="OrderSummaryTotalPrice">
            <Text
              flexGrow={1}
              variant="sm-display"
              color="mono100"
              fontWeight="medium"
            >
              Total
            </Text>
            <Text
              flexGrow={0}
              variant="sm-display"
              color="mono100"
              fontWeight="medium"
            >
              Waiting for final cost
            </Text>
          </Flex>
          <Text variant="xs" color="mono60" textAlign="left" mt={2}>
            *Additional duties and taxes{" "}
            <RouterLink
              inline
              to="https://support.artsy.net/s/article/How-are-taxes-and-customs-fees-calculated"
              target="_blank"
              rel="noopener noreferrer"
            >
              may apply at import
            </RouterLink>
            .
          </Text>
        </Box>
        <Spacer y={1} />
      </Box>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment Order2CollapsibleOrderSummary_order on Order {
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
