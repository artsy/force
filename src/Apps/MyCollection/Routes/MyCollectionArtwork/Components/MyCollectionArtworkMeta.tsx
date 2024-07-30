import { MyCollectionArtworkMeta_artwork$key } from "__generated__/MyCollectionArtworkMeta_artwork.graphql"
import { MetaTags } from "Components/MetaTags"
import { graphql, useFragment } from "react-relay"

interface MyCollectionArtworkMetaProps {
  artwork: MyCollectionArtworkMeta_artwork$key
}

export const MyCollectionArtworkMeta: React.FC<MyCollectionArtworkMetaProps> = props => {
  const { artistNames, title } = useFragment(FRAGMENT, props.artwork)

  return (
    <>
      <MetaTags title={`${title} - ${artistNames} | Artsy`} />
    </>
  )
}

const FRAGMENT = graphql`
  fragment MyCollectionArtworkMeta_artwork on Artwork {
    artistNames
    title
  }
`
