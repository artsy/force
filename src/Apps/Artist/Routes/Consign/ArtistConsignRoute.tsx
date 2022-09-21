import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistConsignRoute_artist$data } from "__generated__/ArtistConsignRoute_artist.graphql"
import { ArtistConsignFAQFragmentContainer } from "./Components/ArtistConsignFAQ"
import { ArtistConsignHeaderFragmentContainer } from "./Components/ArtistConsignHeader"
import { ArtistConsignHowtoSellFragmentContainer } from "./Components/ArtistConsignHowToSell"
import { ArtistConsignMarketTrendsFragmentContainer } from "./Components/ArtistConsignMarketTrends"
import { ArtistConsignMetaFragmentContainer } from "./Components/ArtistConsignMeta"
import { ArtistConsignPageViewsFragmentContainer } from "./Components/ArtistConsignPageViews"
import { ArtistConsignRecentlySoldFragmentContainer } from "./Components/ArtistConsignRecentlySold"
import { ArtistConsignSellArtFragmentContainer } from "./Components/ArtistConsignSellArt"
import { Spacer } from "@artsy/palette"
import track from "react-tracking"

export interface ConsignRouteProps {
  artist: ArtistConsignRoute_artist$data
}

const ArtistConsignRoute: React.FC<ConsignRouteProps> = ({ artist }) => {
  return (
    <>
      {/* Offset needed to combat the spacer that exists in the Artist page layout */}
      <Spacer mt={[-2, -4]} />

      {/* @ts-ignore RELAY UPGRADE 13 */}
      <ArtistConsignMetaFragmentContainer artist={artist} />
      {/* @ts-ignore RELAY UPGRADE 13 */}
      <ArtistConsignHeaderFragmentContainer artist={artist} />
      {/* @ts-ignore RELAY UPGRADE 13 */}
      <ArtistConsignRecentlySoldFragmentContainer artist={artist} />
      {/* @ts-ignore RELAY UPGRADE 13 */}
      <ArtistConsignPageViewsFragmentContainer artist={artist} />
      {/* @ts-ignore RELAY UPGRADE 13 */}
      <ArtistConsignMarketTrendsFragmentContainer artist={artist} />
      {/* @ts-ignore RELAY UPGRADE 13 */}
      <ArtistConsignHowtoSellFragmentContainer artist={artist} />
      {/* @ts-ignore RELAY UPGRADE 13 */}
      <ArtistConsignFAQFragmentContainer artist={artist} />
      {/* @ts-ignore RELAY UPGRADE 13 */}
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
