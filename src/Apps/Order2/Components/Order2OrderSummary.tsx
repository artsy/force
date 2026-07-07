import type { ContextModule } from "@artsy/cohesion"
import ShieldIcon from "@artsy/icons/ShieldIcon"
import { Box, Flex, Image, Message, Spacer, Text } from "@artsy/palette"
import { Order2CheckoutPricingBreakdown } from "Apps/Order2/Routes/Checkout/Components/Order2CheckoutPricingBreakdown"
import type { useCheckoutTracking } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutTracking"
import { BUYER_GUARANTEE_URL } from "Apps/Order2/constants"
import { RouterLink } from "System/Components/RouterLink"
import type { Order2OrderSummary_order$key } from "__generated__/Order2OrderSummary_order.graphql"
import { graphql, useFragment } from "react-relay"

export interface Order2OrderSummaryArtwork {
  artworkInternalID?: string | null
  artistNames?: string | null
  title?: string | null
  date?: string | null
  listPriceDisplay?: string | null
  attributionClassLabel?: string | null
  dimensionsLabel?: string | null
  imageURL?: string | null
}

interface Order2OrderSummaryProps {
  order: Order2OrderSummary_order$key
  header: string
  contextModule: ContextModule
  checkoutTracking: ReturnType<typeof useCheckoutTracking>
  artworkPath: string
  artwork: Order2OrderSummaryArtwork
  isPricingLoading?: boolean
  /** Forwarded to the pricing breakdown. */
  priceFromPendingOffer?: boolean
  /** Limited-time offer line rendered within the artwork block, below the list price. */
  limitedTimeOffer?: React.ReactNode
  /** Content rendered below the buyer-guarantee message (e.g. submit + terms). */
  children?: React.ReactNode
}

export const Order2OrderSummary: React.FC<Order2OrderSummaryProps> = ({
  order,
  header,
  contextModule,
  checkoutTracking,
  artworkPath,
  artwork,
  isPricingLoading,
  priceFromPendingOffer,
  limitedTimeOffer,
  children,
}) => {
  const orderData = useFragment(FRAGMENT, order)

  const {
    artworkInternalID,
    artistNames,
    title: artworkTitle,
    date,
    listPriceDisplay,
    attributionClassLabel,
    dimensionsLabel,
    imageURL,
  } = artwork

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
      <Text
        color="mono100"
        fontWeight="bold"
        variant={["sm-display", "sm-display", "md"]}
      >
        {header}
      </Text>
      <Flex py={1} justifyContent="space-between" alignItems="flex-start">
        {imageURL && (
          <RouterLink
            flex={0}
            to={artworkPath}
            target="_blank"
            onClick={() => {
              if (artworkInternalID) {
                checkoutTracking.clickedOrderArtworkImage({
                  destinationPageOwnerId: artworkInternalID,
                  contextModule,
                })
              }
            }}
          >
            <Image
              mr={1}
              src={imageURL}
              alt={artworkTitle || ""}
              width={["65px", "85px"]}
            />
          </RouterLink>
        )}
        <Box overflow="hidden" flex={1}>
          <Text overflowEllipsis variant="sm" color="mono100">
            {artistNames}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
            {[artworkTitle, date].join(", ")}
          </Text>
          <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
            List price: {listPriceDisplay}
          </Text>
          {limitedTimeOffer}
          {attributionClassLabel && (
            <Text overflowEllipsis variant="sm" color="mono60" textAlign="left">
              {attributionClassLabel}
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
          contextModule={contextModule}
          isLoading={isPricingLoading}
          checkoutTracking={checkoutTracking}
          priceFromPendingOffer={priceFromPendingOffer}
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
                checkoutTracking.clickedBuyerProtection(contextModule)
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
      {children}
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2OrderSummary_order on Order {
    ...Order2CheckoutPricingBreakdown_order
  }
`
