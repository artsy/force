import { MetaTags } from "Components/MetaTags"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionArtworkMeta_artwork$data } from "__generated__/MyCollectionArtworkMeta_artwork.graphql"

interface MyCollectionArtworkMetaProps {
  artwork: MyCollectionArtworkMeta_artwork$data
}

const MyCollectionArtworkMeta: React.FC<MyCollectionArtworkMetaProps> = ({
  artwork,
}) => {
  const { artistNames, title } = artwork

  return (
    <>
      <MetaTags title={`${title} - ${artistNames} | Artsy`} />
    </>
  )
}

export const MyCollectionArtworkMetaFragmentContainer = createFragmentContainer(
  MyCollectionArtworkMeta,
  {
    artwork: graphql`
      fragment MyCollectionArtworkMeta_artwork on Artwork {
        artistNames
        title
      }
    `,
  }
)
