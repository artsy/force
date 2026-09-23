import { Spacer } from "@artsy/palette"
import { ArtistHeaderFragmentContainer } from "Apps/Artist/Components/ArtistHeader/ArtistHeader"
import { ArtistRecentAuctionResultsProvider } from "Apps/Artist/Components/ArtistRecentAuctionResultsContext"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { Jump } from "Utils/Hooks/useJump"
import { useScrollToOpenArtistAuthModal } from "Utils/Hooks/useScrollToOpenArtistAuthModal"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistApp_artist$key } from "__generated__/ArtistApp_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta/ArtistMeta"

interface ArtistAppProps {
  artist: ArtistApp_artist$key
}

export const ArtistApp: React.FC<React.PropsWithChildren<ArtistAppProps>> = ({
  artist: artistRef,
  children,
}) => {
  const artist = useFragment(artistAppLayoutFragment, artistRef)

  useScrollToOpenArtistAuthModal({ name: artist.name })

  const hasRecentAuctionResults =
    extractNodes(artist.recentAuctionResultsConnection).length > 0

  return (
    <ArtistRecentAuctionResultsProvider value={{ hasRecentAuctionResults }}>
      <ArtistMetaFragmentContainer artist={artist} />

      <Analytics contextPageOwnerId={artist.internalID}>
        <Spacer y={[0, 4]} />
        <ArtistHeaderFragmentContainer artist={artist} />

        <Spacer y={4} />

        <Jump id="artistContentArea" />

        {children}
      </Analytics>
    </ArtistRecentAuctionResultsProvider>
  )
}

const artistAppLayoutFragment = graphql`
  fragment ArtistApp_artist on Artist {
    ...ArtistMeta_artist
    ...ArtistHeader_artist
    internalID
    name
    recentAuctionResultsConnection: auctionResultsConnection(
      first: 10
      sort: DATE_DESC
      saleStartYear: $saleStartYear
      saleEndYear: $saleEndYear
      includeUnknownPrices: false
      allowUnspecifiedSaleDates: false
    ) {
      edges {
        node {
          internalID
        }
      }
    }
  }
`
