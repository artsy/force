import { graphql, useFragment } from "react-relay"
import { PrivateArtworkAboutWork_artwork$key } from "__generated__/PrivateArtworkAboutWork_artwork.graphql"

interface PrivateArtworkAboutWorkProps {
  artwork: PrivateArtworkAboutWork_artwork$key
}

export const PrivateArtworkAboutWork: React.FC<PrivateArtworkAboutWorkProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkAboutWork_artwork on Artwork {
        title
      }
    `,
    artwork
  )

  return (
    <div>
      <h2>About the Work</h2>
      <p>About the work</p>
      <p>{data.title}</p>
    </div>
  )
}
