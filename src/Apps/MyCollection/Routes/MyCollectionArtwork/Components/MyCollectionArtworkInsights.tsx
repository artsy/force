import { Join, Spacer, Text } from "@artsy/palette"
import { ArtistCurrentArticlesRailQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistCurrentArticlesRail"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { MyCollectionArtworkInsights_artwork } from "__generated__/MyCollectionArtworkInsights_artwork.graphql"
import { MyCollectionArtworkArtistMarketFragmentContainer } from "./MyCollectionArtworkArtistMarket"
import { MyCollectionArtworkAuctionResultsFragmentContainer } from "./MyCollectionArtworkAuctionResults"
import { MyCollectionArtworkComparablesFragmentContainer } from "./MyCollectionArtworkComparables"
import { MyCollectionArtworkDemandIndexFragmentContainer } from "./MyCollectionArtworkDemandIndex"

interface MyCollectionArtworkInsightsProps {
  artwork: MyCollectionArtworkInsights_artwork
}

const MyCollectionArtworkInsights: React.FC<MyCollectionArtworkInsightsProps> = ({
  artwork,
}) => {
  const enableMyCollectionPhase4ArticlesRail = useFeatureFlag(
    "my-collection-web-phase-4-articles-rail"
  )
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

  const slug = artwork?.artist?.slug!

  return (
    <Join separator={<Spacer mt={[2, 6]} />}>
      <>
        <Text variant={["lg-display", "xl"]}>Insights</Text>

        <Spacer m={[2, 4]} />
      </>

      {!!enableMyCollectionPhase4DemandIndex && (
        <MyCollectionArtworkDemandIndexFragmentContainer
          marketPriceInsights={artwork.marketPriceInsights!}
        />
      )}

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

      {!!enableMyCollectionPhase4ArticlesRail && (
        <ArtistCurrentArticlesRailQueryRenderer slug={slug} />
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
        artist {
          slug
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
