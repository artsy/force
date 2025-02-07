import { Box, Join, Spacer } from "@artsy/palette"
import { MyCollectionArtworkSWASectionSubmitted } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWASectionSubmitted"
import { MyCollectionArtworkSWASubmissionStatus } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWASubmissionStatus"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import type { MyCollectionArtworkInsights_artwork$key } from "__generated__/MyCollectionArtworkInsights_artwork.graphql"
import { graphql, useFragment } from "react-relay"
import { MyCollectionArtworkArtistMarketFragmentContainer } from "./MyCollectionArtworkArtistMarket"
import { MyCollectionArtworkAuctionResultsFragmentContainer } from "./MyCollectionArtworkAuctionResults"
import { MyCollectionArtworkComparablesFragmentContainer } from "./MyCollectionArtworkComparables"
import { MyCollectionArtworkDemandIndexFragmentContainer } from "./MyCollectionArtworkDemandIndex"

interface MyCollectionArtworkInsightsProps {
  artwork: MyCollectionArtworkInsights_artwork$key
}

export const MyCollectionArtworkInsights: React.FC<
  React.PropsWithChildren<MyCollectionArtworkInsightsProps>
> = ({ ...restProps }) => {
  const enablePostApprovalSubmissionFlow = useFeatureFlag(
    "onyx_post_approval_submission_flow",
  )

  const artwork = useFragment(FRAGMENT, restProps.artwork)

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
      </Join>
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment MyCollectionArtworkInsights_artwork on Artwork {
    hasPriceEstimateRequest
    isPriceEstimateRequestable
    internalID
    auctionResults: comparableAuctionResults(first: 1) @optionalField {
      totalCount
    }
    ...MyCollectionArtworkComparables_artwork
    ...MyCollectionArtworkSWASectionSubmitted_submissionState
    ...MyCollectionArtworkSWASubmissionStatus_artwork
    artist(shallow: true) {
      slug
      auctionResultsCount: auctionResultsConnection(first: 1) {
        totalCount
      }
      targetSupply {
        priority
      }

      ...MyCollectionArtworkAuctionResults_artist
    }
    consignmentSubmission {
      state
      stateLabel
    }
    marketPriceInsights {
      ...MyCollectionArtworkArtistMarket_marketPriceInsights
      ...MyCollectionArtworkDemandIndex_marketPriceInsights
    }
  }
`
