import {
  type FeaturedLinkSize,
  FeatureFeaturedLinkFragmentContainer as FeatureFeaturedLink,
} from "Apps/Feature/Components/FeatureFeaturedLink"
import { FeatureSetVideoFragmentContainer as FeatureSetVideo } from "Apps/Feature/Components/FeatureSet/FeatureSetVideo"
import GridItem from "Components/Artwork/GridItem"
import { Box } from "@artsy/palette"
import type { FeatureSetItem_setItem$data } from "__generated__/FeatureSetItem_setItem.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface FeatureSetItemProps {
  setItem: FeatureSetItem_setItem$data
  size: FeaturedLinkSize
}

export const FeatureSetItem: React.FC<
  React.PropsWithChildren<FeatureSetItemProps>
> = ({ setItem, size }) => {
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
        <Box key={setItem.id} pb={6}>
          <GridItem artwork={setItem} />
        </Box>
      )

    case "Video":
      return <FeatureSetVideo video={setItem} />

    default:
      console.warn(
        "Feature pages only support FeaturedLinks, Artworks, and Videos",
      )
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
        ... on Video {
          id
        }
        ...GridItem_artwork
        ...FeatureFeaturedLink_featuredLink
        ...FeatureSetVideo_video
      }
    `,
  },
)
