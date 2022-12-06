import { Join, Spacer } from "@artsy/palette"
import { MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkRequestPriceEstimateSection"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkInsights_artwork$data } from "__generated__/MyCollectionArtworkInsights_artwork.graphql"
import { MyCollectionArtworkArtistMarketFragmentContainer } from "./MyCollectionArtworkArtistMarket"
import { MyCollectionArtworkAuctionResultsFragmentContainer } from "./MyCollectionArtworkAuctionResults"
import { MyCollectionArtworkComparablesFragmentContainer } from "./MyCollectionArtworkComparables"
import { MyCollectionArtworkDemandIndexFragmentContainer } from "./MyCollectionArtworkDemandIndex"

interface MyCollectionArtworkInsightsProps {
  artwork: MyCollectionArtworkInsights_artwork$data
}

const MyCollectionArtworkInsights: React.FC<MyCollectionArtworkInsightsProps> = ({
  artwork,
}) => {
  const enableMyCollectionPhase4ArtistMarket = useFeatureFlag(
    "my-collection-web-phase-4-artist-market"
  )
  const enableMyCollectionPhase4Comparables = useFeatureFlag(
    "my-collection-web-phase-4-comparables"
  )
  const enableMyCollectionPhase4DemandIndex = useFeatureFlag(
    "my-collection-web-phase-4-demand-index"
  )
  const enableMyCollectionPhase4AuctionResults = useFeatureFlag(
    "my-collection-web-phase-4-auction-results"
  )
  const enableMyCollectionPhase6RequestPreiceEstimate = useFeatureFlag(
    "my-collection-web-phase-6-request-price-estimate"
  )

  return (
    <Join separator={<Spacer y={[4, 6]} />}>
      {!!enableMyCollectionPhase4DemandIndex && (
        <MyCollectionArtworkDemandIndexFragmentContainer
          marketPriceInsights={artwork.marketPriceInsights!}
        />
      )}
      <Media lessThan="sm">
        {!!enableMyCollectionPhase6RequestPreiceEstimate && (
          <MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer
            artwork={artwork}
          />
        )}
      </Media>
      {!!enableMyCollectionPhase4ArtistMarket && (
        <MyCollectionArtworkArtistMarketFragmentContainer
          marketPriceInsights={artwork.marketPriceInsights!}
        />
      )}

      {!!enableMyCollectionPhase4Comparables && (
        <MyCollectionArtworkComparablesFragmentContainer artwork={artwork} />
      )}

      {!!enableMyCollectionPhase4AuctionResults && (
        <MyCollectionArtworkAuctionResultsFragmentContainer
          artist={artwork?.artist!}
        />
      )}
    </Join>
  )
}

export const MyCollectionArtworkInsightsFragmentContainer = createFragmentContainer(
  MyCollectionArtworkInsights,
  {
    artwork: graphql`
      fragment MyCollectionArtworkInsights_artwork on Artwork {
        ...MyCollectionArtworkComparables_artwork
        ...MyCollectionArtworkRequestPriceEstimateSection_artwork
        artist {
          ...MyCollectionArtworkAuctionResults_artist
        }
        marketPriceInsights {
          ...MyCollectionArtworkArtistMarket_marketPriceInsights
          ...MyCollectionArtworkDemandIndex_marketPriceInsights
        }
      }
    `,
  }
)
