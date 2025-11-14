import { ContextModule } from "@artsy/cohesion"
import ShieldIcon from "@artsy/icons/ShieldIcon"
import {
  Box,
  Flex,
  Image,
  Message,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { useOrder2Tracking } from "Apps/Order2/Hooks/useOrder2Tracking"
import { OrderDetailsPricingBreakdown } from "Apps/Order/Routes/Details/Components/OrderDetailsPricingBreakdown"
import { BUYER_GUARANTEE_URL } from "Apps/Order2/constants"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import { RouterLink } from "System/Components/RouterLink"
import type { OrderDetailsOrderSummary_order$key } from "__generated__/OrderDetailsOrderSummary_order.graphql"
import type * as React from "react"
import { graphql, useFragment } from "react-relay"

interface OrderDetailsOrderSummaryProps {
  order: OrderDetailsOrderSummary_order$key
}

export const OrderDetailsOrderSummary: React.FC<
  OrderDetailsOrderSummaryProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)
  const tracking = useOrder2Tracking(orderData.source, orderData.mode)

  const artwork = orderData.lineItems[0]?.artwork
  const artworkVersion = orderData.lineItems[0]?.artworkVersion
  const artworkImage = artworkVersion?.image?.resized
  const artworkOrEditionSet = orderData.lineItems[0]?.artworkOrEditionSet
  const isArtworkOrEdition =
    artworkOrEditionSet &&
    (artworkOrEditionSet.__typename === "Artwork" ||
      artworkOrEditionSet.__typename === "EditionSet")
  const dimensions = isArtworkOrEdition
    ? artworkOrEditionSet.dimensions
    : undefined
  const price = isArtworkOrEdition ? artworkOrEditionSet.price : undefined
  const { dimensionsLabel } = useArtworkDimensions(dimensions)

  return (
    <Box backgroundColor="mono0" px={[2, 4]} py={2}>
      {artworkImage?.url && artworkImage.width && artworkImage.height && (
        <Flex alignItems="center" width="100%" flexDirection="column" p={1}>
          <ResponsiveBox
            aspectWidth={artworkImage.width}
            aspectHeight={artworkImage.height}
            maxWidth={artworkImage.width}
            maxHeight={artworkImage.height}
          >
            {artwork?.slug && artwork?.published ? (
              <RouterLink to={`/artwork/${artwork?.slug}`} target="_blank">
                <Image
                  src={artworkImage.url}
                  width="100%"
                  height="100%"
                  alt={artworkVersion?.title || "Artwork image"}
                  lazyLoad
                />
              </RouterLink>
            ) : (
              <Image
                src={artworkImage.url}
                width="100%"
                height="100%"
                alt={artworkVersion?.title || "Artwork image"}
                lazyLoad
              />
            )}
          </ResponsiveBox>
        </Flex>
      )}

      <Spacer y={2} />
      <Box>
        <Text variant="sm" overflowEllipsis>
          {artworkVersion?.artistNames}
        </Text>
        <Flex>
          <Text variant="sm" color="mono60" minWidth={0} overflowEllipsis>
            {artworkVersion?.title}
          </Text>

          {artworkVersion?.date && (
            <Text variant="sm" color="mono60" flexShrink={0}>
              {artworkVersion?.title ? ", " : ""}
              {artworkVersion.date}
            </Text>
          )}
        </Flex>
        <Text variant="sm" color="mono60">
          {artwork?.partner?.name}
        </Text>
        {price && (
          <Text variant="sm" color="mono60">
            List price: {price}
          </Text>
        )}
      </Box>
      <Spacer y={2} />
      {artworkVersion?.attributionClass?.shortDescription && (
        <Text variant="sm" color="mono60">
          {artworkVersion.attributionClass.shortDescription}
        </Text>
      )}
      {dimensionsLabel && (
        <Text variant="sm" color="mono60">
          {dimensionsLabel}
        </Text>
      )}
      <Spacer y={2} />
      <Box mb={2}>
        <OrderDetailsPricingBreakdown order={orderData} />
      </Box>
      <Spacer y={4} />
      <Message variant="default" p={1}>
        <Flex>
          <ShieldIcon fill="mono100" />
          <Spacer x={1} />
          <Text variant="xs" color="mono100">
            Your purchase is protected with{" "}
            <RouterLink
              onClick={() =>
                tracking.clickedBuyerProtection(ContextModule.ordersDetail)
              }
              inline
              target="_blank"
              to={BUYER_GUARANTEE_URL}
            >
              Artsy&rsquo;s Buyer Guarantee
            </RouterLink>
            .
          </Text>
        </Flex>
      </Message>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment OrderDetailsOrderSummary_order on Order {
    ...OrderDetailsPricingBreakdown_order
    source
    mode
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
        published
        partner {
          name
        }
      }
      artworkOrEditionSet {
        __typename
        ... on Artwork {
          price
          dimensions {
            in
            cm
          }
        }
        ... on EditionSet {
          price
          dimensions {
            in
            cm
          }
        }
      }
      artworkVersion {
        title
        artistNames
        date
        attributionClass {
          shortDescription
        }
        image {
          resized(height: 360, width: 700) {
            url
            width
            height
          }
        }
      }
    }
  }
`
