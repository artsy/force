import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistConsignRoute_artist } from "v2/__generated__/ArtistConsignRoute_artist.graphql"
import { ArtistConsignFAQFragmentContainer } from "./Components/ArtistConsignFAQ"
import { ArtistConsignHeaderFragmentContainer } from "./Components/ArtistConsignHeader"
import { ArtistConsignHowtoSellFragmentContainer } from "./Components/ArtistConsignHowToSell"
import { ArtistConsignMarketTrendsFragmentContainer } from "./Components/ArtistConsignMarketTrends"
import { ArtistConsignMetaFragmentContainer } from "./Components/ArtistConsignMeta"
import { ArtistConsignPageViewsFragmentContainer } from "./Components/ArtistConsignPageViews"
import { ArtistConsignRecentlySoldFragmentContainer } from "./Components/ArtistConsignRecentlySold"
import { ArtistConsignSellArtFragmentContainer } from "./Components/ArtistConsignSellArt"
import { track } from "v2/System"
import { Spacer } from "@artsy/palette"

export interface ConsignRouteProps {
  artist: ArtistConsignRoute_artist
}

const ArtistConsignRoute: React.FC<ConsignRouteProps> = ({ artist }) => {
  return (
    <>
      {/* Offset needed to combat the spacer that exists in the Artist page layout */}
      <Spacer mt={[-2, -4]} />

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
