import React from "react"
import { Box, CSSGrid, Join, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Masonry } from "../../../../components/Masonry"
// import { FeatureSetContainer_set } from "v2/__generated__/FeatureSetContainer_set.graphql"

export interface FeatureSetContainerProps {
  set: any
}

export const FeatureSetContainer: React.FC<FeatureSetContainerProps> = ({
  set,
  children,
}) => {
  if (!set) {
    return null
  }
  const count = set.orderedItems.edges.length

  if (set.layout === "FULL") {
    return (
      <Box mt={2} mb={6}>
        <Join separator={<Spacer my={6} />}>{children}</Join>
      </Box>
    )
  }

  switch (set.itemType) {
    case "FeaturedLink":
      return (
        <CSSGrid
          mt={2}
          mb={6}
          gridTemplateColumns={[
            "repeat(1fr)",
            `repeat(${Math.min(count, 2)}, 1fr)`,
            `repeat(${Math.min(count, 3)}, 1fr)`,
          ]}
          gridColumnGap={2}
          gridRowGap={6}
        >
          {children}
        </CSSGrid>
      )

    case "Artwork":
      return (
        <Masonry
          columnCount={[Math.min(count, 2), Math.min(count, 3)]}
          gridColumnGap={20}
        >
          {children}
        </Masonry>
      )

    default:
      console.warn("Feature pages only support FeaturedLinks and Artworks")
      return null
  }
}

export default createFragmentContainer(FeatureSetContainer, {
  set: graphql`
    fragment FeatureSetContainer_set on OrderedSet {
      id
      layout
      itemType
      orderedItems: orderedItemsConnection(first: 35) {
        edges {
          __typename
        }
      }
    }
  `,
})
