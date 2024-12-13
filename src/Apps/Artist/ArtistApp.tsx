import { Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistApp_artist$data } from "__generated__/ArtistApp_artist.graphql"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { ArtistHeaderFragmentContainer } from "./Components/ArtistHeader/ArtistHeader"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta/ArtistMeta"
import { useScrollToOpenArtistAuthModal } from "Utils/Hooks/useScrollToOpenArtistAuthModal"
import { Jump } from "Utils/Hooks/useJump"
import { getContext } from "Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import { cdnCacheStatusCacheKey } from "System/Relay/middleware/cdnCacheStatusMiddleware"
import { Match } from "found"

interface ArtistAppProps {
  artist: ArtistApp_artist$data
  match: Match
}

const ArtistApp: React.FC<React.PropsWithChildren<ArtistAppProps>> = ({
  artist,
  children,
  match,
}) => {
  const queryName = "artistRoutes_ArtistAppQuery"
  const cacheStatus = getContext(
    cdnCacheStatusCacheKey(queryName, match.params)
  )
  console.log("cacheStatus", cacheStatus)

  useScrollToOpenArtistAuthModal({ name: artist.name })

  return (
    <>
      <ArtistMetaFragmentContainer artist={artist} />

      <Analytics contextPageOwnerId={artist.internalID}>
        <Spacer y={[0, 4]} />

        <ArtistHeaderFragmentContainer artist={artist} />

        <Spacer y={4} />

        <Jump id="artistContentArea" />

        <RouteTabs data-test="navigationTabs">
          <RouteTab exact to={`/artist/${artist.slug}`}>
            Artworks
          </RouteTab>

          <RouteTab to={`/artist/${artist.slug}/auction-results`}>
            Auction Results
          </RouteTab>

          <RouteTab to={`/artist/${artist.slug}/about`}>About</RouteTab>
        </RouteTabs>

        <Spacer y={[0, 4]} />

        {children}
      </Analytics>
    </>
  )
}

export const ArtistAppFragmentContainer = createFragmentContainer(ArtistApp, {
  artist: graphql`
    fragment ArtistApp_artist on Artist {
      ...ArtistMeta_artist
      ...ArtistHeader_artist
      internalID
      slug
      name
    }
  `,
})
