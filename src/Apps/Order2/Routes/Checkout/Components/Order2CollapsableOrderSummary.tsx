import ChevronDownIcon from "@artsy/icons/ChevronDownIcon"
import { Box, Flex, Image, Link, Spacer, Text } from "@artsy/palette"
import type { Order2CollapsableOrderSummary_order$key } from "__generated__/Order2CollapsableOrderSummary_order.graphql"
import type * as React from "react"
import { useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2CollapsableOrderSummaryProps {
  order: Order2CollapsableOrderSummary_order$key
}

export const Order2CollapsableOrderSummary: React.FC<
  Order2CollapsableOrderSummaryProps
> = ({ order }) => {
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
      console.error("Missing artwork data in Order2CollapsableOrderSummary", {
        artworkData,
      })
    }
    if (missingOrderData) {
      console.error("Missing order data in Order2CollapsableOrderSummary", {
        order,
      })
    }
  }, [])

  if (missingArtworkData) {
    return null
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box data-testid="OrderSummary" backgroundColor="mono0">
      <Flex py={1} px={2} justifyContent="space-between">
        <Link flex={0} href={`/artwork/${artworkData.slug}`} target="_blank">
          <Image
            mr={1}
            src={artworkData.imageURL}
            alt={artworkData.title || ""}
            width="40px"
          />
        </Link>
        <Box
          data-testid="OrderSummaryArtworkDetails"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          flex={1}
          mr={2}
        >
          <Text
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            variant="xs"
            color="mono100"
          >
            {artworkData.artistNames}
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
            {artworkData.title}, {artworkData.date}
          </Text>
        </Box>
        <Flex
          as="a"
          aria-role="button"
          style={{ textDecoration: "none" }}
          onClick={handleToggle}
          flexShrink={0}
        >
          <Text variant="xs" color="mono100" mr={0.5}>
            {data.buyerTotal?.display || data.itemsTotal?.display}
          </Text>

          <ChevronDownIcon
            height="18px"
            mt="2px"
            style={{
              transition: "transform 0.3s ease-in", // Smooth flipping animation
              transitionDelay: "0.15s", // Add a delay to the flip animation
              transform: isExpanded ? "scaleY(-1)" : "scaleY(1)", // Flip vertically when expanded
            }}
          />
        </Flex>
      </Flex>
      <Box
        data-testid="OrderSummaryExpandedContent"
        px={2}
        py={isExpanded ? 1 : 0} // Dynamically adjust padding when collapsed        aria-expanded={isExpanded}
        style={{
          maxHeight: isExpanded ? "200px" : "0px", // Dynamically adjust maxHeight
          transition: "max-height 0.3s ease-in, padding 0.3s ease-in", // Smooth transition for maxHeight
          overflow: "hidden", // Hide content when collapsed
        }}
      >
        <Box data-testId="OrderSummaryPriceDetails" mb={2}>
          <Flex data-testid="OrderSummaryPriceLineItem">
            <Text flexGrow={1} variant="sm" color="mono60">
              Price
            </Text>
            <Text flexGrow={0} variant="sm" color="mono60">
              {data.itemsTotal?.display}
            </Text>
          </Flex>
          <Flex data-testid="OrderSummaryShippingLineItem">
            <Text flexGrow={1} variant="sm" color="mono60">
              Shipping
            </Text>
            <Text flexGrow={0} variant="sm" color="mono60">
              {data.shippingTotal?.display || "Calculated in next steps"}
            </Text>
          </Flex>
          <Flex data-testid="OrderSummaryTaxLineItem">
            <Text flexGrow={1} variant="sm" color="mono60">
              Tax*
            </Text>
            <Text flexGrow={0} variant="sm" color="mono60">
              {data.shippingTotal?.display || "Calculated in next steps"}
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
            <Link target="_blank" href="#">
              may apply at import
            </Link>
            .
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment Order2CollapsableOrderSummary_order on Order {
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
