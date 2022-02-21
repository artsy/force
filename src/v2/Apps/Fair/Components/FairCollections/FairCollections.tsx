import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairCollections_fair$data } from "v2/__generated__/FairCollections_fair.graphql"
import { Box, BoxProps } from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"
import { FairCollectionFragmentContainer as FairCollection } from "./FairCollection"

interface FairCollectionsProps extends BoxProps {
  fair: FairCollections_fair$data
}

export const FairCollections: React.FC<FairCollectionsProps> = ({
  fair,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Carousel>
        {fair.marketingCollections.map((collection, index) => {
          return (
            <FairCollection
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              key={collection.id}
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              collection={collection}
              carouselIndex={index}
            />
          )
        })}
      </Carousel>
    </Box>
  )
}

export const FairCollectionsFragmentContainer = createFragmentContainer(
  FairCollections,
  {
    fair: graphql`
      fragment FairCollections_fair on Fair {
        marketingCollections(size: 5) {
          id
          slug
          ...FairCollection_collection
        }
      }
    `,
  }
)
