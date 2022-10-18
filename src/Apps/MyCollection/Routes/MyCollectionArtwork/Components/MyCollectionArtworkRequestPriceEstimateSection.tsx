import { Button, Flex, Separator, Text, WinningBidIcon } from "@artsy/palette"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkRequestPriceEstimateSection_artwork$data } from "__generated__/MyCollectionArtworkRequestPriceEstimateSection_artwork.graphql"

interface MyCollectionArtworkRequestPriceEstimateSectionProps {
  artwork: MyCollectionArtworkRequestPriceEstimateSection_artwork$data
}

export const MyCollectionArtworkRequestPriceEstimateSection: React.FC<MyCollectionArtworkRequestPriceEstimateSectionProps> = ({
  artwork,
}) => {
  const [isPriceEstimteRequested, setIsPriceEstimteRequested] = useState<
    boolean
  >(false)

  return (
    <>
      <Separator my={2} />
      {isPriceEstimteRequested ? (
        <Flex alignItems="center" flexDirection={"row"} mb={2} mt={2}>
          <WinningBidIcon />
          <Text variant="sm" ml={0.5}>
            Price estimate request sent
          </Text>
        </Flex>
      ) : (
        <>
          <Text mb={0.5} variant="sm-display">
            Get a Free Price Estimate
          </Text>
          <Text mb={2} color="black60" variant="xs">
            This artwork is eligible for a free evaluation from an Artsy
            specialist.
          </Text>
          <RouterLink
            to={`/my-collection/artwork/${artwork.internalID}/price-estimate`}
            textDecoration="none"
            display="block"
            onClick={() => setIsPriceEstimteRequested(true)}
          >
            <Button variant="primaryBlack" width="100%">
              Request a Price Estimate
            </Button>
          </RouterLink>
        </>
      )}
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
        internalID
      }
    `,
  }
)
