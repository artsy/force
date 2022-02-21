import { ComponentProps } from "react"
import * as React from "react"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureFeaturedLinkFragmentContainer as FeatureFeaturedLink } from "../FeatureFeaturedLink"
import GridItem from "v2/Components/Artwork/GridItem"
import { FeatureSetItem_setItem$data } from "v2/__generated__/FeatureSetItem_setItem.graphql"

export interface FeatureSetItemProps {
  setItem: FeatureSetItem_setItem$data
  size: ComponentProps<typeof FeatureFeaturedLink>["size"]
}

export const FeatureSetItem: React.FC<FeatureSetItemProps> = ({
  setItem,
  size,
}) => {
  switch (setItem.__typename) {
    case "FeaturedLink":
      return (
        <FeatureFeaturedLink
          size={size}
          key={setItem.id}
          featuredLink={setItem}
        />
      )

    case "Artwork":
      return (
        <Box key={setItem.id} pb={6} maxWidth={400} mx="auto">
          <GridItem artwork={setItem} />
        </Box>
      )

    default:
      console.warn("Feature pages only support FeaturedLinks and Artworks")
      return null
  }
}

export const FeatureSetItemFragmentContainer = createFragmentContainer(
  FeatureSetItem,
  {
    setItem: graphql`
      fragment FeatureSetItem_setItem on OrderedSetItem {
        __typename
        ... on FeaturedLink {
          id
        }
        ... on Artwork {
          id
        }
        ...GridItem_artwork
        ...FeatureFeaturedLink_featuredLink
      }
    `,
  }
)
