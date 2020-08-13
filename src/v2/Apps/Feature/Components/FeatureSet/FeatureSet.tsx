import React from "react"
import styled from "styled-components"
import { Box, BoxProps, Spacer, color } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureSet_set } from "v2/__generated__/FeatureSet_set.graphql"
import { FeatureSetMetaFragmentContainer as FeatureSetMeta } from "./FeatureSetMeta"
import { FeatureSetContainerFragmentContainer as FeatureSetContainer } from "./FeatureSetContainer"
import { FeatureSetItemFragmentContainer as FeatureSetItem } from "./FeatureSetItem"

const Container = styled(Box)`
  border-top: 1px solid ${color("black100")};
  margin-top: -1px;
`

export interface FeatureSetProps extends Omit<BoxProps, "color"> {
  set: FeatureSet_set
}

const SUPPORTED_ITEM_TYPES = ["FeaturedLink", "Artwork"]

export const FeatureSet: React.FC<FeatureSetProps> = ({ set, ...rest }) => {
  const count = set.orderedItems.edges.length
  const size =
    set.layout === "FULL"
      ? "full"
      : { 1: "large", 2: "medium" }[set.orderedItems.edges.length] ?? "small"

  if (
    // Nothing to render: it's possible to have a completely empty yet valid set
    (!set.name && !set.description && count === 0) ||
    // Or the set isn't a supported type (Sale, etc.)
    !SUPPORTED_ITEM_TYPES.includes(set.itemType)
  ) {
    return null
  }

  return (
    <Container {...rest}>
      {set.name || set.description ? (
        <FeatureSetMeta set={set} mt={4} mb={2} />
      ) : (
        <Spacer my={4} />
      )}

      <FeatureSetContainer set={set}>
        {set.orderedItems.edges.map(({ node: setItem }) => {
          return (
            <FeatureSetItem key={setItem.id} setItem={setItem} size={size} />
          )
        })}
      </FeatureSetContainer>
    </Container>
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
      orderedItems: orderedItemsConnection(first: 35) {
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
