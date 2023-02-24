import * as React from "react"
import { Box, BoxProps, Join, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureSet_set$data } from "__generated__/FeatureSet_set.graphql"
import { FeatureSetMetaFragmentContainer as FeatureSetMeta } from "./FeatureSetMeta"
import { FeatureSetContainerFragmentContainer as FeatureSetContainer } from "./FeatureSetContainer"
import { FeatureSetItemFragmentContainer as FeatureSetItem } from "./FeatureSetItem"
import { extractNodes } from "Utils/extractNodes"
import { useMemo } from "react"

interface FeatureSetProps extends Omit<BoxProps, "color"> {
  set: FeatureSet_set$data
}

const SUPPORTED_ITEM_TYPES = ["FeaturedLink", "Artwork"]

export const FeatureSet: React.FC<FeatureSetProps> = ({ set, ...rest }) => {
  const orderedItems = extractNodes(set.orderedItems)
  const count = orderedItems.length
  const size = useMemo(() => {
    if (set.layout === "FULL") {
      return "full"
    }

    if (orderedItems.length === 1) {
      return "large"
    }

    if (orderedItems.length === 2) {
      return "medium"
    }

    return "small"
  }, [orderedItems.length, set.layout])

  if (
    // Nothing to render: it's possible to have a completely empty yet valid set
    (!set.name && !set.description && count === 0) ||
    // Or the set isn't a supported type (Sale, etc.)
    !SUPPORTED_ITEM_TYPES.includes(set.itemType ?? "")
  ) {
    return null
  }

  return (
    <Box {...rest}>
      <Join separator={<Spacer y={4} />}>
        {(set.name || set.description) && <FeatureSetMeta set={set} />}

        <FeatureSetContainer set={set}>
          {orderedItems.map(setItem => {
            return (
              <FeatureSetItem key={setItem.id} setItem={setItem} size={size} />
            )
          })}
        </FeatureSetContainer>
      </Join>
    </Box>
  )
}

export const FeatureSetFragmentContainer = createFragmentContainer(FeatureSet, {
  set: graphql`
    fragment FeatureSet_set on OrderedSet {
      id
      layout
      name
      description(format: HTML)
      itemType
      orderedItems: orderedItemsConnection(first: 99) {
        edges {
          __typename
          node {
            ... on Artwork {
              id
            }
            ... on FeaturedLink {
              id
            }
            ...FeatureSetItem_setItem
          }
        }
      }
      ...FeatureSetMeta_set
      ...FeatureSetContainer_set
    }
  `,
})
