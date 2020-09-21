import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairCollections_fair } from "v2/__generated__/FairCollections_fair.graphql"
import { Box, BoxProps, SmallCard } from "@artsy/palette"
import { crop } from "v2/Utils/resizer"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

const CARD_IMAGE_SIZES = [360, 180, 180]

interface FairCollectionsProps extends BoxProps {
  fair: FairCollections_fair
}

export const FairCollections: React.FC<FairCollectionsProps> = ({
  fair,
  ...rest
}) => {
  const [collection] = fair.marketingCollections

  const imageUrls = collection.artworks.edges.map(
    ({
      node: {
        image: { url },
      },
    }) => url
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
    <Box {...rest}>
      <RouterLink to={`/collection/${collection.slug}`} noUnderline>
        <SmallCard
          title={collection.title}
          subtitle={collection.category}
          images={images}
        />
      </RouterLink>
    </Box>
  )
}

export const FairCollectionsFragmentContainer = createFragmentContainer(
  FairCollections,
  {
    fair: graphql`
      fragment FairCollections_fair on Fair {
        marketingCollections(size: 1) {
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
      }
    `,
  }
)
