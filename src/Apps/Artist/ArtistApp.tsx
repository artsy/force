import { Spacer } from "@artsy/palette"
import { Analytics } from "System/Contexts/AnalyticsContext"
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

  return (
    <>
      <ArtistMetaFragmentContainer artist={artist} />

      <Analytics contextPageOwnerId={artist.internalID}>
        <Spacer y={[0, 4]} />

        <ArtistHeaderFragmentContainer artist={artist} />

        <Spacer y={[0, 4]} />

        <Jump id="artistContentArea" />

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
