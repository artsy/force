import { Spacer } from "@artsy/palette"
import type { ArtistConsignRoute_artist$data } from "__generated__/ArtistConsignRoute_artist.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import track from "react-tracking"
import { ArtistConsignFAQFragmentContainer } from "./Components/ArtistConsignFAQ"
import { ArtistConsignHeaderFragmentContainer } from "./Components/ArtistConsignHeader"
import { ArtistConsignHowtoSellFragmentContainer } from "./Components/ArtistConsignHowToSell"
import { ArtistConsignMarketTrendsFragmentContainer } from "./Components/ArtistConsignMarketTrends"
import { ArtistConsignMetaFragmentContainer } from "./Components/ArtistConsignMeta"
import { ArtistConsignPageViewsFragmentContainer } from "./Components/ArtistConsignPageViews"
import { ArtistConsignRecentlySoldFragmentContainer } from "./Components/ArtistConsignRecentlySold"
import { ArtistConsignSellArtFragmentContainer } from "./Components/ArtistConsignSellArt"

export interface ConsignRouteProps {
  artist: ArtistConsignRoute_artist$data
}

const ArtistConsignRoute: React.FC<
  React.PropsWithChildren<ConsignRouteProps>
> = ({ artist }) => {
  return (
    <>
      {/* Offset needed to combat the spacer that exists in the Artist page layout */}
      <Spacer y={[-2, -4]} />

      <ArtistConsignMetaFragmentContainer artist={artist} />

      <ArtistConsignHeaderFragmentContainer artist={artist} />

      <ArtistConsignRecentlySoldFragmentContainer artist={artist} />

      <ArtistConsignPageViewsFragmentContainer artist={artist} />

      <ArtistConsignMarketTrendsFragmentContainer artist={artist} />

      <ArtistConsignHowtoSellFragmentContainer artist={artist} />

      <ArtistConsignFAQFragmentContainer artist={artist} />

      <ArtistConsignSellArtFragmentContainer artist={artist} />
    </>
  )
}

const TrackedConsignRoute = track()((props: ConsignRouteProps) => {
  return <ArtistConsignRoute {...props} />
})

export const ArtistConsignRouteFragmentContainer = createFragmentContainer(
  TrackedConsignRoute,
  {
    artist: graphql`
      fragment ArtistConsignRoute_artist on Artist {
        ...ArtistConsignMeta_artist
        ...ArtistConsignHeader_artist
        ...ArtistConsignRecentlySold_artist
        ...ArtistConsignPageViews_artist
        ...ArtistConsignMarketTrends_artist
        ...ArtistConsignHowToSell_artist
        ...ArtistConsignFAQ_artist
        ...ArtistConsignSellArt_artist
      }
    `,
  }
)
