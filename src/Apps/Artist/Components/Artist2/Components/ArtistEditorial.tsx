import type { ArtistEditorial_artist$key } from "__generated__/ArtistEditorial_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistEditorialProps {
  artist: ArtistEditorial_artist$key
}

export const ArtistEditorial: React.FC<ArtistEditorialProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  return <div>ArtistEditorial: {artist.internalID}</div>
}

const fragment = graphql`
  fragment ArtistEditorial_artist on Artist {
    internalID
  }
`
