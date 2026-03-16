import type { ArtistAbout_artist$key } from "__generated__/ArtistAbout_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistAboutProps {
  artist: ArtistAbout_artist$key
}

export const ArtistAbout: React.FC<ArtistAboutProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  return <div>ArtistAbout: {artist.internalID}</div>
}

const fragment = graphql`
  fragment ArtistAbout_artist on Artist {
    internalID
  }
`
