import ShieldIcon from "@artsy/icons/ShieldIcon"
import { Box, Flex, Image, Message, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import createLogger from "Utils/logger"
import type { Order2ReviewStep_order$key } from "__generated__/Order2ReviewStep_order.graphql"
import { useEffect } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2ReviewStep")

interface Order2ReviewStepProps {
  order: Order2ReviewStep_order$key
}

export const Order2ReviewStep: React.FC<Order2ReviewStepProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: Check only at mount
  useEffect(() => {
    if (!isRequiredArtworkDataPresent) {
      logger.error(
        "Missing required artwork data in Order2CollapsibleOrderSummary",
        {
          artwork,
          artworkVersion,
        },
      )
    }
    if (!isRequiredOrderDataPresent) {
      logger.error(
        "Missing required order data in Order2CollapsibleOrderSummary",
        {
          orderData,
        },
      )
    }
  }, [])

  if (!isRequiredArtworkDataPresent) {
    return null
  }

  return (
    <Flex
      data-testid="OrderReviewStep"
      flexDirection="column"
      backgroundColor="mono0"
      p={2}
    >
      <Text variant="sm-display" fontWeight="medium" color="mono100">
        Order summary
      </Text>
      <Flex
        data-testid="OrderReviewArtworkDetails"
        py={1}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <RouterLink flex={0} to={`/artwork/${artwork.slug}`} target="_blank">
          <Image
            mr={1}
            src={artworkVersion.image.resized.url}
            alt={artworkVersion.title}
            width="65px"
          />
        </RouterLink>
        <Box
          overflow="hidden"
          style={{
            whiteSpace: "nowrap",
          }}
          flex={1}
        >
          <Text
            overflow="hidden"
            style={{
              textOverflow: "ellipsis",
            }}
            variant="sm"
            color="mono100"
          >
            {artworkVersion.artistNames}
          </Text>
          <Text
            overflow="hidden"
            style={{
              textOverflow: "ellipsis",
            }}
            variant="sm"
            color="mono60"
            textAlign="left"
          >
            {artworkVersion.title}, {artworkVersion.date}
          </Text>
          <Text
            overflow="hidden"
            style={{
              textOverflow: "ellipsis",
            }}
            variant="sm"
            color="mono60"
            textAlign="left"
          >
            List price: $1,000,000
          </Text>
          <Spacer y={0.5} />
          <Text
            overflow="hidden"
            style={{
              textOverflow: "ellipsis",
            }}
            variant="xs"
            color="mono60"
            textAlign="left"
          >
            From an unknown edition
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
            78 x 78 x 6in (27.9 x 27.9 x 8.9 cm)
          </Text>
        </Box>
      </Flex>
      <Box data-testid="OrderReviewPriceDetails" mb={2}>
        <Flex data-testid="OrderSummaryPriceLineItem">
          <Text flexGrow={1} variant="sm" color="mono60">
            Price
          </Text>
          <Text flexGrow={0} variant="sm" color="mono60">
            $15,000
          </Text>
        </Flex>
        <Flex data-testid="OrderSummaryShippingLineItem">
          <Text flexGrow={1} variant="sm" color="mono60">
            Shipping
          </Text>
          <Text flexGrow={0} variant="sm" color="mono60">
            Calculated in next steps
          </Text>
        </Flex>
        <Flex data-testid="OrderSummaryTaxLineItem">
          <Text flexGrow={1} variant="sm" color="mono60">
            Tax*
          </Text>
          <Text flexGrow={0} variant="sm" color="mono60">
            Calculated in next steps
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
      <Message variant="default">
        <Flex>
          <ShieldIcon fill="mono100" />
          <Spacer x={1} />
          <Text variant="xs" color="mono100">
            Your purchase is protected with Artsy’s buyer protection.
          </Text>
        </Flex>
      </Message>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2ReviewStep_order on Order {
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
