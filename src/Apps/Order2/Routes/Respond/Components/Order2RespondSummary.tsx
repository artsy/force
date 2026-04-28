import { ContextModule } from "@artsy/cohesion"
import ShieldIcon from "@artsy/icons/ShieldIcon"
import { Box, Flex, Image, Message, Spacer, Text } from "@artsy/palette"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import { Order2CheckoutPricingBreakdown } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutPricingBreakdown"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import { BUYER_GUARANTEE_URL } from "Apps/Order2/constants"
import { RouterLink } from "System/Components/RouterLink"
import type { Order2RespondSummary_order$key } from "__generated__/Order2RespondSummary_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2RespondSummaryProps {
  order: Order2RespondSummary_order$key
}

interface ArtworkData {
  artworkInternalID: string
  artistNames: string
  title: string
  date: string
  price: string
  attributionClass: { shortDescription: string } | null
  image: { resized: { url: string } | null } | null
  dimensions: any
  framedDimensions: any
}

const extractLineItemMetadata = (lineItem: any): ArtworkData => {
  const artworkVersion = lineItem?.artworkVersion
  const artwork = lineItem?.artwork

  return {
    artworkInternalID: artwork?.internalID ?? "",
    artistNames: artworkVersion?.artistNames ?? "",
    title: artworkVersion?.title ?? "",
    date: artworkVersion?.date ?? "",
    price: artwork?.price ?? "",
    attributionClass: artwork?.attributionClass ?? null,
    image: artworkVersion?.image ?? artwork?.images?.[0] ?? null,
    dimensions: artwork?.dimensions ?? null,
    framedDimensions: artwork?.framedDimensions ?? null,
  }
}

export const Order2RespondSummary: React.FC<Order2RespondSummaryProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const { checkoutTracking, artworkPath } = useRespondContext()

  const artworkData = extractLineItemMetadata(orderData.lineItems[0]!)
  const { dimensionsLabelWithoutFrameText: dimensionsLabel } =
    useArtworkDimensions({
      dimensions: artworkData.dimensions,
      framedDimensions: artworkData.framedDimensions,
    })

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Text
        color="mono100"
        fontWeight="bold"
        variant={["sm-display", "sm-display", "md"]}
      >
        Offer summary
      </Text>
      <Flex py={1} justifyContent="space-between" alignItems="flex-start">
        {artworkData?.image?.resized?.url && (
          <RouterLink
            flex={0}
            to={artworkPath}
            target="_blank"
            onClick={() => {
              if (artworkData.artworkInternalID) {
                checkoutTracking.clickedOrderArtworkImage({
                  destinationPageOwnerId: artworkData.artworkInternalID,
                  contextModule: ContextModule.ordersRespond,
                })
              }
            }}
          >
            <Image
              mr={1}
              src={artworkData?.image?.resized?.url}
              alt={artworkData.title || ""}
              width={["65px", "85px"]}
            />
          </RouterLink>
        )}
        <Box overflow="hidden" flex={1}>
          <Text overflowEllipsis variant="sm" color="mono100">
            {artworkData.artistNames}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
            {[artworkData.title, artworkData.date].join(", ")}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
            List price: {artworkData.price}
          </Text>
          {artworkData.attributionClass?.shortDescription && (
            <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
              {artworkData.attributionClass.shortDescription}
            </Text>
          )}
          {dimensionsLabel && (
            <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
              {dimensionsLabel}
            </Text>
          )}
        </Box>
      </Flex>
      <Box>
        <Order2CheckoutPricingBreakdown
          order={orderData}
          contextModule={ContextModule.ordersRespond}
          checkoutTracking={checkoutTracking}
        />
      </Box>
      <Spacer y={2} />
      <Message variant="default" p={1}>
        <Flex>
          <ShieldIcon fill="mono100" />
          <Spacer x={1} />
          <Text variant="xs" color="mono100">
            Your purchase is protected with{" "}
            <RouterLink
              onClick={() =>
                checkoutTracking.clickedBuyerProtection(
                  ContextModule.ordersRespond,
                )
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
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2RespondSummary_order on Order {
    ...Order2CheckoutPricingBreakdown_order
    lineItems {
      artworkVersion {
        artistNames
        title
        date
        image {
          resized(height: 200) {
            url
          }
        }
      }
      artwork {
        internalID
        price
        attributionClass {
          shortDescription
        }
        dimensions {
          in
          cm
        }
        framedDimensions {
          in
          cm
        }
        images(includeAll: false) {
          resized(height: 200) {
            url
          }
        }
      }
    }
  }
`
