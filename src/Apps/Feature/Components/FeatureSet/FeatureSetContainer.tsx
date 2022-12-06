import * as React from "react"
import { CSSGrid, Join, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Masonry } from "Components/Masonry"
import { FeatureSetContainer_set$data } from "__generated__/FeatureSetContainer_set.graphql"

export interface FeatureSetContainerProps {
  set: FeatureSetContainer_set$data
}

export const FeatureSetContainer: React.FC<FeatureSetContainerProps> = ({
  set,
  children,
}) => {
  const count = set?.orderedItems?.edges?.length ?? 0

  if (set.layout === "FULL") {
    return <Join separator={<Spacer y={4} />}>{children}</Join>
  }

  switch (set.itemType) {
    case "FeaturedLink": {
      return (
        <CSSGrid
          gridTemplateColumns={[
            "repeat(1fr)",
            `repeat(${Math.min(count, 2)}, 1fr)`,
            `repeat(${Math.min(count, 3)}, 1fr)`,
          ]}
          gridColumnGap={2}
          gridRowGap={[4, 6]}
        >
          {children}
        </CSSGrid>
      )
    }

    case "Artwork": {
      return (
        <Masonry columnCount={[Math.min(count, 2), Math.min(count, 4)]}>
          {children}
        </Masonry>
      )
    }

    default:
      console.warn("Feature pages only support FeaturedLinks and Artworks")
      return null
  }
}

export const FeatureSetContainerFragmentContainer = createFragmentContainer(
  FeatureSetContainer,
  {
    set: graphql`
      fragment FeatureSetContainer_set on OrderedSet {
        id
        layout
        itemType
        orderedItems: orderedItemsConnection(first: 99) {
          edges {
            __typename
          }
        }
      }
    `,
  }
)
