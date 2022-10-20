import { Box, Text } from "@artsy/palette"

export const MyCollectionInsightsMedianSalePriceAtAuction = () => {
  return (
    <Box>
      <Text mt={2} variant={"lg-display"}>
        Median Auction Price
      </Text>
      <Text variant={["sm-display", "xs"]} color="black60">
        Track price stability or growth of your artists
      </Text>
    </Box>
  )
}
