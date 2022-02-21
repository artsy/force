import { Box } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtistConsignRoute_artist$data } from "v2/__generated__/ArtistConsignRoute_artist.graphql"

import { ArtistConsignFAQFragmentContainer as ArtistConsignFAQ } from "./Components/ArtistConsignFAQ"
import { ArtistConsignHeaderFragmentContainer as ArtistConsignHeader } from "./Components/ArtistConsignHeader"
import { ArtistConsignHowtoSellFragmentContainer as ArtistConsignHowtoSell } from "./Components/ArtistConsignHowToSell"
import { ArtistConsignMarketTrendsFragmentContainer as ArtistConsignMarketTrends } from "./Components/ArtistConsignMarketTrends"
import { ArtistConsignMetaFragmentContainer as ArtistConsignMeta } from "./Components/ArtistConsignMeta"
import { ArtistConsignPageViewsFragmentContainer as ArtistConsignPageViews } from "./Components/ArtistConsignPageViews"
import { ArtistConsignRecentlySoldFragmentContainer as ArtistConsignRecentlySold } from "./Components/ArtistConsignRecentlySold"
import { ArtistConsignSellArtFragmentContainer as ArtistConsignSellArt } from "./Components/ArtistConsignSellArt"

import { track } from "v2/System"

export interface ConsignRouteProps {
  artist: ArtistConsignRoute_artist$data
}

const ArtistConsignRoute: React.FC<ConsignRouteProps> = ({ artist }) => {
  return (
    <Box>
      <ArtistConsignMeta artist={artist} />
      <ArtistConsignHeader artist={artist} />
      <ArtistConsignRecentlySold artist={artist} />
      <ArtistConsignPageViews artist={artist} />
      <ArtistConsignMarketTrends artist={artist} />
      <ArtistConsignHowtoSell artist={artist} />
      <ArtistConsignFAQ artist={artist} />
      <ArtistConsignSellArt artist={artist} />
    </Box>
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
