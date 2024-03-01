import { graphql, useFragment } from "react-relay"
import { PrivateArtworkCondition_artwork$key } from "__generated__/PrivateArtworkCondition_artwork.graphql"

interface PrivateArtworkConditionProps {
  artwork: PrivateArtworkCondition_artwork$key
}

export const PrivateArtworkCondition: React.FC<PrivateArtworkConditionProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkCondition_artwork on Artwork {
        title
      }
    `,
    artwork
  )

  return (
    <div>
      <h2>Condition</h2>
      <p>Condition</p>
      <p>{data.title}</p>
    </div>
  )
}
