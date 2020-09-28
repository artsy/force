import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairCollections_fair } from "v2/__generated__/FairCollections_fair.graphql"
import { Box, BoxProps } from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"
import { FairCollectionFragmentContainer as FairCollection } from "./FairCollection"

interface FairCollectionsProps extends BoxProps {
  fair: FairCollections_fair
}

export const FairCollections: React.FC<FairCollectionsProps> = ({
  fair,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Carousel>
        {fair.marketingCollections.map(collection => {
          return <FairCollection key={collection.id} collection={collection} />
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
        marketingCollections(size: 4) {
          id
          ...FairCollection_collection
        }
      }
    `,
  }
)
