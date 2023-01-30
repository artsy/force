import { HTML, Shelf, SkeletonText, Spacer, Text } from "@artsy/palette"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { ArtQuizTrendingCollection_collection$data } from "__generated__/ArtQuizTrendingCollection_collection.graphql"

interface ArtQuizTrendingCollectionProps {
  collection: ArtQuizTrendingCollection_collection$data
}

const ArtQuizTrendingCollection: FC<ArtQuizTrendingCollectionProps> = ({
  collection,
}) => {
  const artworks = extractNodes(collection.artworksConnection)

  if (artworks.length === 0) return null

  return (
    <>
      <Text variant="lg-display">{collection.title}</Text>

      {collection.description && (
        <HTML
          color="black60"
          html={collection.description}
          variant="lg-display"
        />
      )}

      <Spacer y={[2, 4]} />

      <Shelf>
        {artworks.map(artwork => {
          return (
            <ShelfArtworkFragmentContainer
              key={artwork.internalID}
              artwork={artwork}
            />
          )
        })}
      </Shelf>
    </>
  )
}

export const ArtQuizTrendingCollectionPlaceholder: FC = () => {
  return (
    <>
      <SkeletonText variant="lg-display">Example Collection Title</SkeletonText>

      <SkeletonText variant="lg-display">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </SkeletonText>

      <Spacer y={[2, 4]} />

      <Shelf>
        {[...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })}
      </Shelf>
    </>
  )
}

export const ArtQuizTrendingCollectionFragmentContainer = createFragmentContainer(
  ArtQuizTrendingCollection,
  {
    collection: graphql`
      fragment ArtQuizTrendingCollection_collection on MarketingCollection {
        title
        description
        artworksConnection(first: 16) {
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
            }
          }
        }
      }
    `,
  }
)
