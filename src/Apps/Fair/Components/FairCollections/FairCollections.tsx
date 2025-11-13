import { Box, type BoxProps, Shelf, Spacer, Text } from "@artsy/palette"
import type { FairCollections_fair$data } from "__generated__/FairCollections_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairCollectionFragmentContainer as FairCollection } from "./FairCollection"

interface FairCollectionsProps extends BoxProps {
  fair: FairCollections_fair$data
}

export const FairCollections: React.FC<
  React.PropsWithChildren<FairCollectionsProps>
> = ({ fair, ...rest }) => {
  return (
    <Box {...rest}>
      <Text variant="lg">Curated Highlights</Text>

      <Spacer y={4} />

      <Shelf>
        {fair.marketingCollections.map((collection, index) => {
          if (!collection) return <></>

          return (
            <FairCollection
              key={collection.id}
              collection={collection}
              carouselIndex={index}
            />
          )
        })}
      </Shelf>
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
