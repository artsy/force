import { Box, type BoxProps, FullBleed, Join, Spacer } from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import type { FeatureSet_set$data } from "__generated__/FeatureSet_set.graphql"
import type * as React from "react"
import { useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureSetContainerFragmentContainer as FeatureSetContainer } from "./FeatureSetContainer"
import { FeatureSetItemFragmentContainer as FeatureSetItem } from "./FeatureSetItem"
import { FeatureSetMetaFragmentContainer as FeatureSetMeta } from "./FeatureSetMeta"

interface FeatureSetProps extends Omit<BoxProps, "color"> {
  set: FeatureSet_set$data
}

const SUPPORTED_ITEM_TYPES = ["FeaturedLink", "Artwork", "Video"]

export const FeatureSet: React.FC<React.PropsWithChildren<FeatureSetProps>> = ({
  set,
  ...rest
}) => {
  const orderedItems = extractNodes(set.orderedItems)

  // For Video sets, only show the first item
  const itemsToRender =
    set.itemType === "Video" ? orderedItems.slice(0, 1) : orderedItems
  const count = itemsToRender.length
  const size = useMemo(() => {
    if (set.layout === "FULL") {
      return "full"
    }

    if (itemsToRender.length === 1) {
      return "large"
    }

    if (itemsToRender.length === 2) {
      return "medium"
    }

    return "small"
  }, [itemsToRender.length, set.layout])

  if (
    // Nothing to render: it's possible to have a completely empty yet valid set
    (!set.name && !set.description && count === 0) ||
    // Or the set isn't a supported type (Sale, etc.)
    !SUPPORTED_ITEM_TYPES.includes(set.itemType ?? "")
  ) {
    return null
  }

  if (set.itemType === "Video") {
    return (
      <Box {...rest}>
        <Join separator={<Spacer y={4} />}>
          {(set.name || set.description) && <FeatureSetMeta set={set} />}

          <FullBleed>
            {itemsToRender.map(setItem => (
              <FeatureSetItem key={setItem.id} setItem={setItem} size={size} />
            ))}
          </FullBleed>
        </Join>
      </Box>
    )
  }

  return (
    <Box {...rest}>
      <Join separator={<Spacer y={4} />}>
        {(set.name || set.description) && <FeatureSetMeta set={set} />}

        <FeatureSetContainer set={set}>
          {itemsToRender.map(setItem => (
            <FeatureSetItem key={setItem.id} setItem={setItem} size={size} />
          ))}
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
            __typename
            ... on Artwork {
              id
            }
            ... on FeaturedLink {
              id
            }
            ... on Video {
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
