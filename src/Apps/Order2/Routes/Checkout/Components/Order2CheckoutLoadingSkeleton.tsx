import {
  Box,
  Column,
  Flex,
  GridColumns,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Stack,
  breakpoints,
} from "@artsy/palette"
import type { Order2CheckoutLoadingSkeleton_order$key } from "__generated__/Order2CheckoutLoadingSkeleton_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2CheckoutLoadingSkeletonProps {
  order: Order2CheckoutLoadingSkeleton_order$key
}

export const Order2CheckoutLoadingSkeleton: React.FC<
  Order2CheckoutLoadingSkeletonProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)

  const artworkVersion = orderData.lineItems[0]?.artworkVersion

  return (
    <Skeleton aria-label="Checkout loading skeleton" bg="mono5" height="100vh">
      <Order2CollapsibleOrderSummarySkeleton
        artworkTitle={artworkVersion?.title as string}
        artworkArtistNames={artworkVersion?.artistNames as string}
        artworkDate={artworkVersion?.date as string}
        artworkPrice={
          (orderData.buyerTotal?.display ||
            orderData.itemsTotal?.display) as string
        }
      />
    </Skeleton>
  )
}

interface Order2CollapsibleOrderSummarySkeletonProps {
  artworkTitle: string
  artworkArtistNames: string
  artworkDate: string
  artworkPrice: string
}
const Order2CollapsibleOrderSummarySkeleton: React.FC<
  Order2CollapsibleOrderSummarySkeletonProps
> = props => {
  return (
    <GridColumns py={[0, 0, 4]} px={[0, 0, 4]}>
      <Column span={[12, 12, 6]} start={[1, 1, 2]}>
        <Box maxWidth={["100%", breakpoints.sm, "100%"]} mx={[0, "auto", 0]}>
          <Stack gap={1}>
            <Box display={["block", "block", "none"]}>
              <Flex height={60} py={1} px={2} backgroundColor="mono0">
                {/* Artwork image */}
                <SkeletonBox width={40} height={40} />

                {/* Artwork details */}
                <Box ml={1} flexGrow={1}>
                  <Flex>
                    <SkeletonText variant="xs" flexGrow={1}>
                      {props.artworkArtistNames}
                    </SkeletonText>
                    {/* Price and chevron */}
                    <Flex flexGrow={0} justifyContent={"flex-end"}>
                      <SkeletonText variant="xs" mr={0.5}>
                        {props.artworkPrice}
                      </SkeletonText>
                      <SkeletonBox width={18} height={16} mt="2px" />
                    </Flex>
                  </Flex>
                  <SkeletonText variant="xs">
                    {props.artworkTitle}, {props.artworkDate}
                  </SkeletonText>
                </Box>
              </Flex>
            </Box>

            <StepsSkeleton />
          </Stack>
        </Box>
      </Column>

      <Column
        span={[12, 12, 4]}
        start={[1, 1, 8]}
        display={["none", "none", "block"]}
      >
        {/* Order summary skeleton for desktop */}
        <Box backgroundColor="mono0" p={2}>
          <SkeletonText variant="lg-display" mb={2}>
            Order summary
          </SkeletonText>
          <Flex mb={2}>
            <SkeletonBox width={60} height={60} mr={2} />
            <Box flex={1}>
              <SkeletonText variant="sm" mb={1}>
                {props.artworkArtistNames}
              </SkeletonText>
              <SkeletonText variant="xs" mb={1}>
                {props.artworkTitle}, {props.artworkDate}
              </SkeletonText>
              <SkeletonText variant="sm">{props.artworkPrice}</SkeletonText>
            </Box>
          </Flex>
        </Box>
      </Column>
    </GridColumns>
  )
}

const StepsSkeleton = () => {
  return (
    <Flex flexDirection="column" backgroundColor="mono0" p={2}>
      <Flex py={1}>
        <SkeletonText flex={1} variant="sm-display">
          First step title
        </SkeletonText>

        <SkeletonText flex={0} variant="sm-display">
          Loading...
        </SkeletonText>
      </Flex>

      <Spacer y={2} />

      <SkeletonText variant="xs" mb={1}>
        Step content
      </SkeletonText>
      <SkeletonText variant="xs" mb={1}>
        And more ...
      </SkeletonText>

      <Spacer y={1} />

      <SkeletonText variant="sm-display" mb={1}>
        Second step title
      </SkeletonText>
      <SkeletonText variant="xs" mb={1}>
        Still more content
      </SkeletonText>
      <SkeletonText variant="xs" mb={1}>
        Yet more...
      </SkeletonText>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2CheckoutLoadingSkeleton_order on Order {
    buyerTotal {
      display
    }
    itemsTotal {
      display
    }
    lineItems {
      artworkVersion {
        title
        artistNames
        date
      }
    }
  }
`
