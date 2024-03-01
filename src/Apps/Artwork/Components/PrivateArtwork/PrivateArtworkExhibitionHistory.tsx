import { graphql, useFragment } from "react-relay"
import { PrivateArtworkExhibitionHistory_artwork$key } from "__generated__/PrivateArtworkExhibitionHistory_artwork.graphql"

interface PrivateArtworkExhibitionHistoryProps {
  artwork: PrivateArtworkExhibitionHistory_artwork$key
}

export const PrivateArtworkExhibitionHistory: React.FC<PrivateArtworkExhibitionHistoryProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkExhibitionHistory_artwork on Artwork {
        title
      }
    `,
    artwork
  )

  return (
    <div>
      <h2>Exhibition history</h2>
      <p>Exhibition history</p>
      <p>{data.title}</p>
    </div>
  )
}
