import { Box, Join, Spacer } from "@artsy/palette"
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
  const artwork = useFragment(FRAGMENT, restProps.artwork)

  const hasAuctionResults = artwork.auctionResults?.totalCount
  const artistHasAuctionResults =
    artwork.artist?.auctionResultsCount?.totalCount
  return (
    <Box pt={[1, 0]}>
      <Join separator={<Spacer y={[4, 6]} />}>
        {artwork.marketPriceInsights && (
          <MyCollectionArtworkDemandIndexFragmentContainer
            marketPriceInsights={artwork.marketPriceInsights}
          />
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
    internalID
    auctionResults: comparableAuctionResults(first: 1) @optionalField {
      totalCount
    }
    ...MyCollectionArtworkComparables_artwork
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
    marketPriceInsights {
      ...MyCollectionArtworkArtistMarket_marketPriceInsights
      ...MyCollectionArtworkDemandIndex_marketPriceInsights
    }
  }
`
