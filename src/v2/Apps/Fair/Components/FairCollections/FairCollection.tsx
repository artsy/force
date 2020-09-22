import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairCollection_collection } from "v2/__generated__/FairCollection_collection.graphql"
import { SmallCard } from "@artsy/palette"
import { crop } from "v2/Utils/resizer"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { compact } from "lodash"

const CARD_WIDTH = 263
const CARD_LARGE_IMAGE_SIZE = 170
const CARD_SMALL_IMAGE_SIZE = CARD_WIDTH - CARD_LARGE_IMAGE_SIZE

const CARD_IMAGE_SIZES = [
  CARD_LARGE_IMAGE_SIZE,
  CARD_SMALL_IMAGE_SIZE,
  CARD_SMALL_IMAGE_SIZE,
]

interface FairCollectionProps {
  collection: FairCollection_collection
}

export const FairCollection: React.FC<FairCollectionProps> = ({
  collection,
}) => {
  const imageUrls = compact(
    collection.artworks.edges.map(({ node }) => node?.image?.url)
  )

  const images = imageUrls.map((url, i) => {
    const _1x = crop(url, {
      width: CARD_IMAGE_SIZES[i],
      height: CARD_IMAGE_SIZES[i],
    })

    const _2x = crop(url, {
      width: CARD_IMAGE_SIZES[i] * 2,
      height: CARD_IMAGE_SIZES[i] * 2,
    })

    return {
      src: _1x,
      srcSet: `${_1x} 1x, ${_2x} 2x`,
    }
  })

  return (
    <RouterLink to={`/collection/${collection.slug}`} noUnderline>
      <SmallCard
        width={CARD_WIDTH}
        title={collection.title}
        subtitle={collection.category}
        images={images}
      />
    </RouterLink>
  )
}

export const FairCollectionFragmentContainer = createFragmentContainer(
  FairCollection,
  {
    collection: graphql`
      fragment FairCollection_collection on MarketingCollection {
        slug
        title
        category
        artworks: artworksConnection(first: 3) {
          edges {
            node {
              image {
                url(version: "larger")
              }
            }
          }
        }
      }
    `,
  }
)
