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
import { Order2PricingBreakdown } from "Apps/Order2/Components/Order2PricingBreakdown"
import { useOrder2Tracking } from "Apps/Order2/Hooks/useOrder2Tracking"
import { BUYER_GUARANTEE_URL } from "Apps/Order2/constants"
import { RouterLink } from "System/Components/RouterLink"
import type { Order2DetailsOrderSummary_order$key } from "__generated__/Order2DetailsOrderSummary_order.graphql"
import type * as React from "react"
import { graphql, useFragment } from "react-relay"

interface Order2DetailsOrderSummaryProps {
  order: Order2DetailsOrderSummary_order$key
}

export const Order2DetailsOrderSummary: React.FC<
  Order2DetailsOrderSummaryProps
> = ({ order }) => {
  const tracking = useOrder2Tracking()
  const orderData = useFragment(FRAGMENT, order)

  const artwork = orderData.lineItems[0]?.artwork
  const artworkVersion = orderData.lineItems[0]?.artworkVersion
  const artworkImage = artworkVersion?.image?.resized

  return (
    <Box backgroundColor="mono0" p={[2, 4]}>
      {artworkImage?.url && artworkImage.width && artworkImage.height && (
        <Flex alignItems="center" width="100%" flexDirection="column" p={1}>
          <ResponsiveBox
            aspectWidth={artworkImage.width}
            aspectHeight={artworkImage.height}
            maxWidth={artworkImage.width}
            maxHeight={artworkImage.height}
          >
            <RouterLink to={`/artwork/${artwork?.slug}`} target="_blank">
              <Image
                src={artworkImage.url}
                width="100%"
                height="100%"
                alt={artworkVersion?.title || "Artwork image"}
                lazyLoad
              />
            </RouterLink>
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
        partner {
          name
        }
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
