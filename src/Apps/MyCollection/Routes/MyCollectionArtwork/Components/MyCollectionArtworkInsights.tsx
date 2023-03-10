import { Join, Spacer } from "@artsy/palette"
import { MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkRequestPriceEstimateSection"
import { Media } from "Utils/Responsive"
import { MyCollectionArtworkInsights_artwork$data } from "__generated__/MyCollectionArtworkInsights_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
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
  return (
    <Join separator={<Spacer y={[4, 6]} />}>
      <MyCollectionArtworkDemandIndexFragmentContainer
        marketPriceInsights={artwork.marketPriceInsights!}
      />
      <Media lessThan="sm">
        <MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer
          artwork={artwork}
        />
      </Media>
      <MyCollectionArtworkArtistMarketFragmentContainer
        marketPriceInsights={artwork.marketPriceInsights!}
      />

      <MyCollectionArtworkComparablesFragmentContainer artwork={artwork} />

      <MyCollectionArtworkAuctionResultsFragmentContainer
        artist={artwork?.artist!}
      />
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
