import type { ArtistTombstone_artist$key } from "__generated__/ArtistTombstone_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistTombstoneProps {
  artist: ArtistTombstone_artist$key
}

export const ArtistTombstone: React.FC<ArtistTombstoneProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  return <div>ArtistTombstone: {artist.internalID}</div>
}

const fragment = graphql`
  fragment ArtistTombstone_artist on Artist {
    internalID
  }
`
