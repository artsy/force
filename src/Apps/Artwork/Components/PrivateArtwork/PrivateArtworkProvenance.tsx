import { graphql, useFragment } from "react-relay"
import { PrivateArtworkProvenance_artwork$key } from "__generated__/PrivateArtworkProvenance_artwork.graphql"

interface PrivateArtworkProvenanceProps {
  artwork: PrivateArtworkProvenance_artwork$key
}

export const PrivateArtworkProvenance: React.FC<PrivateArtworkProvenanceProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment PrivateArtworkProvenance_artwork on Artwork {
        title
      }
    `,
    artwork
  )

  return (
    <div>
      <h2>Provenance</h2>
      <p>Provinance</p>
      <p>{data.title}</p>
    </div>
  )
}
