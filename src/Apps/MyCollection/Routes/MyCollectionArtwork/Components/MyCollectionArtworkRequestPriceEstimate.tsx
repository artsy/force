import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"
import { Box, Button, Flex, Separator, Text } from "@artsy/palette"
import { MyCollectionArtworkRequestPriceEstimate_artwork$key } from "__generated__/MyCollectionArtworkRequestPriceEstimate_artwork.graphql"
import { graphql, useFragment } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"

interface MyCollectionArtworkRequestPriceEstimateProps {
  artwork: MyCollectionArtworkRequestPriceEstimate_artwork$key
  ctaColor?: "primaryBlack" | "secondaryNeutral" | null
}

export const MyCollectionArtworkRequestPriceEstimate: React.FC<MyCollectionArtworkRequestPriceEstimateProps> = ({
  ctaColor = "primaryBlack",
  ...props
}) => {
  const artwork = useFragment(FRAGMENT, props.artwork)
  if (artwork.hasPriceEstimateRequest) {
    return (
      <>
        <Separator my={4} />

        <Flex alignItems="center" flexDirection="row">
          <CheckmarkStrokeIcon />
          <Text variant="sm" ml={0.5}>
            Price estimate request sent
          </Text>
        </Flex>
      </>
    )
  }

  if (!artwork.isPriceEstimateRequestable) {
    return null
  }

  return (
    <Box>
      <Separator my={4} />

      <Text mb={0.5} variant="md">
        Get a Free Price Estimate
      </Text>

      <Text mb={2} color="black60" variant="sm">
        This artwork is eligible for a free evaluation from an Artsy specialist.
      </Text>

      <RouterLink
        to={`/collector-profile/my-collection/artwork/${artwork.internalID}/price-estimate`}
        textDecoration="none"
        display="block"
      >
        <Button variant={ctaColor}>Request a Price Estimate</Button>
      </RouterLink>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment MyCollectionArtworkRequestPriceEstimate_artwork on Artwork {
    hasPriceEstimateRequest
    isPriceEstimateRequestable
    internalID
  }
`
