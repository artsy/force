import { Spacer } from "@artsy/palette"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { Jump } from "Utils/Hooks/useJump"
import { useScrollToOpenArtistAuthModal } from "Utils/Hooks/useScrollToOpenArtistAuthModal"
import type { Artist2App_artist$key } from "__generated__/Artist2App_artist.graphql"
import { graphql, useFragment } from "react-relay"
import { ArtistAbove } from "./Components/Artist2/ArtistAbove"
import { ArtistMetaFragmentContainer } from "./Components/ArtistMeta/ArtistMeta"

interface Artist2AppProps {
  artist: Artist2App_artist$key
}

export const Artist2App: React.FC<React.PropsWithChildren<Artist2AppProps>> = ({
  artist: artistRef,
  children,
}) => {
  const artist = useFragment(artistAppLayoutFragment, artistRef)

  useScrollToOpenArtistAuthModal({ name: artist.name })

  return (
    <>
      <ArtistMetaFragmentContainer artist={artist} />

      <Analytics contextPageOwnerId={artist.internalID}>
        <Spacer y={2} />

        <ArtistAbove artist={artist} />

        <Spacer y={[0, 4]} />

        <Jump id="artistContentArea" />

        {children}
      </Analytics>
    </>
  )
}

const artistAppLayoutFragment = graphql`
  fragment Artist2App_artist on Artist {
    ...ArtistMeta_artist
    ...ArtistAbove_artist
    internalID
    name
  }
`
