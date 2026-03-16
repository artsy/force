import type { ArtistNotableWorks_artist$key } from "__generated__/ArtistNotableWorks_artist.graphql"
import { graphql, useFragment } from "react-relay"

interface ArtistNotableWorksProps {
  artist: ArtistNotableWorks_artist$key
}

export const ArtistNotableWorks: React.FC<ArtistNotableWorksProps> = ({
  artist: artistRef,
}) => {
  const artist = useFragment(fragment, artistRef)

  return <div>ArtistNotableWorks: {artist.internalID}</div>
}

const fragment = graphql`
  fragment ArtistNotableWorks_artist on Artist {
    internalID
  }
`
