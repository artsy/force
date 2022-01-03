import * as React from "react"
import { Box, BoxProps, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureSet_set } from "v2/__generated__/FeatureSet_set.graphql"
import { FeatureSetMetaFragmentContainer as FeatureSetMeta } from "./FeatureSetMeta"
import { FeatureSetContainerFragmentContainer as FeatureSetContainer } from "./FeatureSetContainer"
import { FeatureSetItemFragmentContainer as FeatureSetItem } from "./FeatureSetItem"

export interface FeatureSetProps extends Omit<BoxProps, "color"> {
  set: FeatureSet_set
}

const SUPPORTED_ITEM_TYPES = ["FeaturedLink", "Artwork"]

export const FeatureSet: React.FC<FeatureSetProps> = ({ set, ...rest }) => {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const count = set.orderedItems.edges.length
  const size =
    set.layout === "FULL"
      ? "full"
      : // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        ({ 1: "large", 2: "medium" }[set.orderedItems.edges.length] as
          | "medium"
          | "large"
          | undefined) ?? "small"

  if (
    // Nothing to render: it's possible to have a completely empty yet valid set
    (!set.name && !set.description && count === 0) ||
    // Or the set isn't a supported type (Sale, etc.)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    !SUPPORTED_ITEM_TYPES.includes(set.itemType)
  ) {
    return null
  }

  return (
    <Box {...rest}>
      {set.name || set.description ? (
        <FeatureSetMeta set={set} mt={4} mb={2} />
      ) : (
        <Spacer my={4} />
      )}
      <FeatureSetContainer set={set}>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        {set.orderedItems.edges.map(({ node: setItem }) => {
          return (
            <FeatureSetItem key={setItem.id} setItem={setItem} size={size} />
          )
        })}
      </FeatureSetContainer>
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
