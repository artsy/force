import { Spacer } from "@artsy/palette"
import { ArtistHeaderFragmentContainer } from "Apps/Artist/Components/ArtistHeader/ArtistHeader"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { Jump } from "Utils/Hooks/useJump"
import { useScrollToOpenArtistAuthModal } from "Utils/Hooks/useScrollToOpenArtistAuthModal"
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

const artistAppLayoutFragment = graphql`
  fragment ArtistApp_artist on Artist {
    ...ArtistMeta_artist
    ...ArtistHeader_artist
    internalID
    name
  }
`
