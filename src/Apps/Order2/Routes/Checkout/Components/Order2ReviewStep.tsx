import ShieldIcon from "@artsy/icons/ShieldIcon"
import { Box, Flex, Image, Link, Message, Spacer, Text } from "@artsy/palette"
import type { Order2ReviewStep_order$key } from "__generated__/Order2ReviewStep_order.graphql"
import { useEffect } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2ReviewStepProps {
  order: Order2ReviewStep_order$key
}

export const Order2ReviewStep: React.FC<Order2ReviewStepProps> = ({
  order,
}) => {
  const data = useFragment(FRAGMENT, order)
  const firstArtwork = data.lineItems[0]?.artwork
  const firstArtworkVersion = data.lineItems[0]?.artworkVersion

  const artworkData = {
    slug: firstArtwork?.slug,
    title: firstArtworkVersion?.title,
    artistNames: firstArtworkVersion?.artistNames,
    date: firstArtworkVersion?.date,
    imageURL: firstArtworkVersion?.image?.resized?.url,
  }

  const missingArtworkData = Object.values(artworkData).some(value => !value)
  const missingOrderData = !data.buyerTotal?.display

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    console.log("*** Order data", data)
    if (missingArtworkData) {
      console.error("Missing artwork data in Order2CollapsibleOrderSummary", {
        artworkData,
      })
    }
    if (missingOrderData) {
      console.error("Missing order data in Order2CollapsibleOrderSummary", {
        data,
      })
    }
  }, [])

  if (missingArtworkData) {
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
        <Link flex={0} href={`/artwork/${artworkData.slug}`} target="_blank">
          <Image
            mr={1}
            src={artworkData.imageURL}
            alt={artworkData.title || ""}
            width="65px"
          />
        </Link>
        <Box
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          flex={1}
        >
          <Text
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="sm"
            color="mono100"
          >
            {artworkData.artistNames}
          </Text>
          <Text
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="sm"
            color="mono60"
            textAlign="left"
          >
            {artworkData.title}, {artworkData.date}
          </Text>
          <Text
            style={{
              overflow: "hidden",
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
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="xs"
            color="mono60"
            textAlign="left"
          >
            From an unknown edition
          </Text>
          <Text
            style={{
              overflow: "hidden",
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
      <Box data-testId="OrderReviewPriceDetails" mb={2}>
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
          <Link color="inherit" target="_blank" href="#">
            may apply at import
          </Link>
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
