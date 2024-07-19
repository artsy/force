import { Box, Join, Separator, Spacer } from "@artsy/palette"
import {
  MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer,
  MyCollectionPriceEstimateSentSection,
} from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkRequestPriceEstimateSection"
import { MyCollectionArtworkSWASection } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWASection"
import { MyCollectionArtworkSWASectionSubmitted } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWASectionSubmitted"
import { MyCollectionArtworkSWASubmissionStatus } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWASubmissionStatus"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkInsights_artwork$data } from "__generated__/MyCollectionArtworkInsights_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionArtworkArtistMarketFragmentContainer } from "./MyCollectionArtworkArtistMarket"
import { MyCollectionArtworkAuctionResultsFragmentContainer } from "./MyCollectionArtworkAuctionResults"
import { MyCollectionArtworkComparablesFragmentContainer } from "./MyCollectionArtworkComparables"
import { MyCollectionArtworkDemandIndexFragmentContainer } from "./MyCollectionArtworkDemandIndex"

interface MyCollectionArtworkInsightsProps {
  artwork: MyCollectionArtworkInsights_artwork$data
  isP1Artist?: boolean | null
  displayText?: string | null
}

const MyCollectionArtworkInsights: React.FC<MyCollectionArtworkInsightsProps> = ({
  artwork,
  isP1Artist,
  displayText,
}) => {
  const enablePostApprovalSubmissionFlow = useFeatureFlag(
    "onyx_post_approval_submission_flow"
  )
  const showSubmitForSaleCtaMobile = isP1Artist && !displayText
  const hasAuctionResults = artwork.auctionResults?.totalCount ?? 0 > 0
  const artistHasAuctionResults =
    artwork.artist?.auctionResultsCount?.totalCount ?? 0 > 0

  const displaySubmissionStateSection =
    artwork.consignmentSubmission?.state === "REJECTED"
  return (
    <Box pt={[1, 0]}>
      <Join separator={<Spacer y={[4, 6]} />}>
        {artwork.marketPriceInsights && (
          <MyCollectionArtworkDemandIndexFragmentContainer
            marketPriceInsights={artwork.marketPriceInsights}
          />
        )}

        {!!displaySubmissionStateSection && (
          <Box mb={4}>
            {enablePostApprovalSubmissionFlow ? (
              <MyCollectionArtworkSWASubmissionStatus artwork={artwork} />
            ) : (
              <MyCollectionArtworkSWASectionSubmitted artwork={artwork} />
            )}
          </Box>
        )}

        {artwork.hasPriceEstimateRequest && (
          <Media lessThan="sm">
            <MyCollectionPriceEstimateSentSection />
          </Media>
        )}

        {showSubmitForSaleCtaMobile && (
          <Media lessThan="sm">
            <MyCollectionArtworkSWASection artwork={artwork} />
          </Media>
        )}

        {artwork.marketPriceInsights && (
          <MyCollectionArtworkArtistMarketFragmentContainer
            marketPriceInsights={artwork.marketPriceInsights}
          />
        )}

        {hasAuctionResults && (
          <MyCollectionArtworkComparablesFragmentContainer artwork={artwork} />
        )}

        {artistHasAuctionResults && artwork?.artist && (
          <MyCollectionArtworkAuctionResultsFragmentContainer
            artist={artwork.artist}
          />
        )}

        {!artwork.hasPriceEstimateRequest &&
          artwork.isPriceEstimateRequestable && (
            <Media lessThan="sm">
              <Separator my={2} />
              <MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer
                artwork={artwork}
                ctaColor={
                  showSubmitForSaleCtaMobile
                    ? "secondaryNeutral"
                    : "primaryBlack"
                }
              />
              <Separator my={2} />
            </Media>
          )}
      </Join>
    </Box>
  )
}

export const MyCollectionArtworkInsightsFragmentContainer = createFragmentContainer(
  MyCollectionArtworkInsights,
  {
    artwork: graphql`
      fragment MyCollectionArtworkInsights_artwork on Artwork {
        hasPriceEstimateRequest
        isPriceEstimateRequestable
        internalID
        auctionResults: comparableAuctionResults(first: 1) @optionalField {
          totalCount
        }
        ...MyCollectionArtworkComparables_artwork
        ...MyCollectionArtworkRequestPriceEstimateSection_artwork
        ...MyCollectionArtworkSWASectionSubmitted_submissionState
        ...MyCollectionArtworkSWASubmissionStatus_artwork
        artist {
          slug
          auctionResultsCount: auctionResultsConnection(first: 1) {
            totalCount
          }
          ...MyCollectionArtworkAuctionResults_artist
        }
        consignmentSubmission {
          state
        }
        marketPriceInsights {
          ...MyCollectionArtworkArtistMarket_marketPriceInsights
          ...MyCollectionArtworkDemandIndex_marketPriceInsights
        }
        ...MyCollectionArtworkSWASection_artwork
      }
    `,
  }
)
