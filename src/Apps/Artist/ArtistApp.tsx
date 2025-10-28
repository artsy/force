import { Spacer } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { useIsRouteActive } from "System/Hooks/useRouter"
import { Jump } from "Utils/Hooks/useJump"
import { useScrollToOpenArtistAuthModal } from "Utils/Hooks/useScrollToOpenArtistAuthModal"
import type { ArtistApp_artist$data } from "__generated__/ArtistApp_artist.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistHeaderFragmentContainer } from "./Components/ArtistHeader/ArtistHeader"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta/ArtistMeta"

interface ArtistAppProps {
  artist: ArtistApp_artist$data
}

const ArtistApp: React.FC<React.PropsWithChildren<ArtistAppProps>> = ({
  artist,
  children,
}) => {
  useScrollToOpenArtistAuthModal({ name: artist.name })

  const isCombinedRoute = useIsRouteActive(`/artist/${artist.slug}/combined`)
  const isExperimentEnabled = useFlag("diamond_artist-combined-layout")
  const isCombinedPage = isCombinedRoute || isExperimentEnabled

  return (
    <>
      <ArtistMetaFragmentContainer artist={artist} />

      <Analytics contextPageOwnerId={artist.internalID}>
        <Spacer y={[0, 4]} />

        <ArtistHeaderFragmentContainer artist={artist} />

        <Spacer y={4} />

        <Jump id="artistContentArea" />

        {!isCombinedPage && (
          <>
            <RouteTabs data-test="navigationTabs">
              <RouteTab exact to={`/artist/${artist.slug}`}>
                Artworks
              </RouteTab>

              <RouteTab to={`/artist/${artist.slug}/auction-results`}>
                Auction Results
              </RouteTab>

              <RouteTab to={`/artist/${artist.slug}/about`}>About</RouteTab>
            </RouteTabs>

            <Spacer y={[2, 4]} />
          </>
        )}

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
