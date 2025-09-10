import { Join, Separator } from "@artsy/palette"
import { ArtistAuctionResultsQueryRenderer } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResults"
import { ArtistArtworkFilterQueryRenderer } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilter"
import type { ArtistCombinedRoute_artist$data } from "__generated__/ArtistCombinedRoute_artist.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistCombinedRouteProps {
  artist: ArtistCombinedRoute_artist$data
}

const ArtistCombinedRoute: React.FC<
  React.PropsWithChildren<ArtistCombinedRouteProps>
> = ({ artist }) => {
  return (
    <Join separator={<Separator my={6} />}>
      <ArtistArtworkFilterQueryRenderer id={artist.internalID} />

      <ArtistAuctionResultsQueryRenderer id={artist.internalID} lazyLoad />
    </Join>
  )
}

export const ArtistCombinedRouteFragmentContainer = createFragmentContainer(
  ArtistCombinedRoute,
  {
    artist: graphql`
      fragment ArtistCombinedRoute_artist on Artist {
        id
        internalID
      }
    `,
  },
)
