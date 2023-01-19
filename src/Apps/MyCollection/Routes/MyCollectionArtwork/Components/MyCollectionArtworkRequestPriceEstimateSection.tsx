import { Button, Flex, Separator, Text, WinningBidIcon } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkRequestPriceEstimateSection_artwork$data } from "__generated__/MyCollectionArtworkRequestPriceEstimateSection_artwork.graphql"

interface MyCollectionArtworkRequestPriceEstimateSectionProps {
  artwork: MyCollectionArtworkRequestPriceEstimateSection_artwork$data
}

export const MyCollectionArtworkRequestPriceEstimateSection: React.FC<MyCollectionArtworkRequestPriceEstimateSectionProps> = ({
  artwork,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const isP1Artist = artwork.artist?.targetSupply?.isP1
  const isAlreadySubmitted = artwork.consignmentSubmission?.displayText

  if (artwork.hasPriceEstimateRequest) {
    return (
      <>
        <Separator my={2} />
        <Flex alignItems="center" flexDirection={"row"} mb={2} mt={2}>
          <WinningBidIcon />
          <Text variant="sm" ml={0.5}>
            Price estimate request sent
          </Text>
        </Flex>
        <Media lessThan="sm">
          <Separator my={2} />
        </Media>
      </>
    )
  }

  if (!isP1Artist || isAlreadySubmitted) {
    return null
  }

  return (
    <>
      <Separator my={2} />
      <Text mb={0.5} variant="sm-display">
        Get a Free Price Estimate
      </Text>
      <Text mb={2} color="black60" variant="xs">
        This artwork is eligible for a free evaluation from an Artsy specialist.
      </Text>
      <RouterLink
        to={
          isCollectorProfileEnabled
            ? `/collector-profile/my-collection/artwork/${artwork.internalID}/price-estimate`
            : `/my-collection/artwork/${artwork.internalID}/price-estimate`
        }
        textDecoration="none"
        display="block"
      >
        <Button variant="primaryBlack" width="100%">
          Request a Price Estimate
        </Button>
      </RouterLink>
      <Media lessThan="sm">
        <Separator my={2} />
      </Media>
    </>
  )
}

export const MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer = createFragmentContainer(
  MyCollectionArtworkRequestPriceEstimateSection,
  {
    artwork: graphql`
      fragment MyCollectionArtworkRequestPriceEstimateSection_artwork on Artwork {
        artist {
          targetSupply {
            isP1
          }
        }
        hasPriceEstimateRequest
        internalID
        consignmentSubmission {
          displayText
        }
      }
    `,
  }
)
