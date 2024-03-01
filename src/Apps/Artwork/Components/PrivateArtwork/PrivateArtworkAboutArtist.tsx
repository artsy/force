import { graphql, useFragment } from "react-relay"
import { PrivateArtworkAboutArtist_artwork$key } from "__generated__/PrivateArtworkAboutArtist_artwork.graphql"

interface PrivateArtworkAboutArtistProps {
  artwork: PrivateArtworkAboutArtist_artwork$key
}

export const PrivateArtworkAboutArtist: React.FC<PrivateArtworkAboutArtistProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkAboutArtist_artwork on Artwork {
        title
      }
    `,
    artwork
  )

  return (
    <div>
      <h2>About the Artist</h2>
      <p>
        This artist is known for their use of color and light in their
        landscapes.
      </p>
      <p>{data.title}</p>
    </div>
  )
}
