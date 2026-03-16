import type { ArtistRepresentation_artist$key } from "__generated__/ArtistRepresentation_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistRepresentationProps {
  artist: ArtistRepresentation_artist$key
}

export const ArtistRepresentation: React.FC<ArtistRepresentationProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  return <div>ArtistRepresentation: {artist.internalID}</div>
}

const fragment = graphql`
  fragment ArtistRepresentation_artist on Artist {
    internalID
  }
`
