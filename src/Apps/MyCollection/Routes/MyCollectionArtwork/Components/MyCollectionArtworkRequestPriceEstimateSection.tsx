import { Button, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { MyCollectionArtworkRequestPriceEstimateSection_artwork$data } from "__generated__/MyCollectionArtworkRequestPriceEstimateSection_artwork.graphql"
import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"

interface MyCollectionArtworkRequestPriceEstimateSectionProps {
  artwork: MyCollectionArtworkRequestPriceEstimateSection_artwork$data
  ctaColor?: "primaryBlack" | "secondaryNeutral" | null
}

export const MyCollectionPriceEstimateSentSection: React.FC = () => {
  return (
    <Flex alignItems="center" flexDirection={"row"} mb={2} mt={2}>
      <CheckmarkStrokeIcon />
      <Text variant="sm" ml={0.5}>
        Price estimate request sent
      </Text>
    </Flex>
  )
}

export const MyCollectionArtworkRequestPriceEstimateSection: React.FC<MyCollectionArtworkRequestPriceEstimateSectionProps> = ({
  artwork,
  ctaColor = "primaryBlack",
}) => {
  if (artwork.hasPriceEstimateRequest) {
    return (
      <>
        <Flex alignItems="center" flexDirection={"row"} mb={2} mt={2}>
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
    <>
      <Text mb={0.5} variant="sm-display">
        Get a Free Price Estimate
      </Text>
      <Text mb={2} color="black60" variant="xs">
        This artwork is eligible for a free evaluation from an Artsy specialist.
      </Text>
      <RouterLink
        to={`/collector-profile/my-collection/artwork/${artwork.internalID}/price-estimate`}
        textDecoration="none"
        display="block"
      >
        <Button variant={ctaColor} width="100%">
          Request a Price Estimate
        </Button>
      </RouterLink>
    </>
  )
}

export const MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer = createFragmentContainer(
  MyCollectionArtworkRequestPriceEstimateSection,
  {
    artwork: graphql`
      fragment MyCollectionArtworkRequestPriceEstimateSection_artwork on Artwork {
        hasPriceEstimateRequest
        isPriceEstimateRequestable
        internalID
      }
    `,
  }
)
