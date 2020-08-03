import React from "react"
import styled from "styled-components"
import {
  Box,
  BoxProps,
  CSSGrid,
  HTML,
  Spacer,
  Text,
  color,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FeatureFeaturedLinkFragmentContainer as FeatureFeaturedLink } from "./FeatureFeaturedLink"
import GridItem from "v2/Components/Artwork/GridItem"
import { Masonry } from "v2/Components/Masonry"
import { FeatureSet_set } from "v2/__generated__/FeatureSet_set.graphql"

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
        <Box mt={4} mb={2}>
          {set.name && (
            <Text variant="title" color="black100">
              {set.name}
            </Text>
          )}

          {set.description && (
            <HTML variant="text" color="black60" html={set.description} />
          )}
        </Box>
      ) : (
        <Spacer my={4} />
      )}

      {(() => {
        // Set is being utilized for layout text instead of rendering items
        if (count === 0) {
          return <Spacer my={4} />
        }

        switch (set.itemType) {
          case "FeaturedLink":
            return (
              <CSSGrid
                key={set.id}
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
                {set.orderedItems.edges.map(({ node }) => {
                  if (!node || node.__typename !== "FeaturedLink") {
                    return null
                  }

                  return (
                    <FeatureFeaturedLink
                      size={
                        { 1: "large", 2: "medium" }[
                          set.orderedItems.edges.length
                        ] ?? "small"
                      }
                      key={node.id}
                      featuredLink={node}
                    />
                  )
                })}
              </CSSGrid>
            )

          case "Artwork":
            return (
              <Masonry
                key={set.id}
                columnCount={[Math.min(count, 2), Math.min(count, 3)]}
                gridColumnGap={20}
              >
                {set.orderedItems.edges.map(({ node }) => {
                  if (!node || node.__typename !== "Artwork") {
                    return null
                  }

                  return (
                    <Box key={node.id} pb={6} maxWidth={400} mx="auto">
                      <GridItem artwork={node} />
                    </Box>
                  )
                })}
              </Masonry>
            )
          default:
            console.warn(
              "Feature pages only support FeaturedLinks and Artworks"
            )

            return null
        }
      })()}
    </Container>
  )
}

export const FeatureSetFragmentContainer = createFragmentContainer(FeatureSet, {
  set: graphql`
    fragment FeatureSet_set on OrderedSet {
      id
      name
      description(format: HTML)
      itemType
      # TODO: Handle pagination
      orderedItems: orderedItemsConnection(first: 35) {
        edges {
          node {
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
        }
      }
    }
  `,
})
