import { Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistApp_artist$data } from "__generated__/ArtistApp_artist.graphql"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "System/Analytics/AnalyticsContext"
import { ArtistHeaderFragmentContainer } from "./Components/ArtistHeader/ArtistHeader"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta/ArtistMeta"
import { useScrollToOpenArtistAuthModal } from "Utils/Hooks/useScrollToOpenArtistAuthModal"
import { Jump } from "Utils/Hooks/useJump"

interface ArtistAppProps {
  artist: ArtistApp_artist$data
}

const ArtistApp: React.FC<ArtistAppProps> = ({ artist, children }) => {
  const { contextPageOwnerType, contextPageOwnerSlug } = useAnalyticsContext()

  useScrollToOpenArtistAuthModal()

  return (
    <>
      <ArtistMetaFragmentContainer artist={artist} />

      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: artist.internalID,
          contextPageOwnerSlug,
          contextPageOwnerType,
        }}
      >
        <Spacer y={[2, 4]} />

        <ArtistHeaderFragmentContainer artist={artist} />

        <Spacer y={[4, 12]} />

        <Jump id="artistContentArea" />

        <RouteTabs fill data-test="navigationTabs">
          <RouteTab exact to={`/artist/${artist.slug}`}>
            Artworks
          </RouteTab>

          <RouteTab to={`/artist/${artist.slug}/auction-results`}>
            Auction Results
          </RouteTab>

          <RouteTab to={`/artist/${artist.slug}/about`}>About</RouteTab>
        </RouteTabs>

        <Spacer y={4} />

        {children}
      </AnalyticsContext.Provider>
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
    }
  `,
})
