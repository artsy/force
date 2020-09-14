import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairCollections_fair } from "v2/__generated__/FairCollections_fair.graphql"
import { Box, BoxProps, SmallCard } from "@artsy/palette"
import { crop } from "v2/Utils/resizer"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

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

  // TODO: Improve card image handling
  const images = imageUrls.map(url => crop(url, { width: 375, height: 375 }))

  return (
    // TODO: Cards should extend Box
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
