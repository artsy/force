import { Column, GridColumns, HTML, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { FollowGeneButtonQueryRenderer } from "Components/FollowButton/FollowGeneButton"
import { GeneShow_gene$data } from "__generated__/GeneShow_gene.graphql"
import { GeneArtworkFilterRefetchContainer } from "Apps/Gene/Components/GeneArtworkFilter"
import { GeneMetaFragmentContainer } from "Apps/Gene/Components/GeneMeta"
import { extractNodes } from "Utils/extractNodes"

interface GeneShowProps {
  gene: GeneShow_gene$data
}

export const GeneShow: React.FC<GeneShowProps> = ({ gene }) => {
  const similar = extractNodes(gene.similar)
  const artists = extractNodes(gene.artistsConnection)

  return (
    <>
      <GeneMetaFragmentContainer gene={gene} />

      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text as="h1" variant="xl" mb={2}>
            {gene.displayName || gene.name}
          </Text>

          <FollowGeneButtonQueryRenderer id={gene.internalID} />
        </Column>

        <Column span={6}>
          <Text as="h2" variant="xs" mb={1}>
            About
          </Text>

          {gene.formattedDescription && (
            <HTML variant="sm" mb={2} html={gene.formattedDescription} />
          )}

          {similar.length > 0 && (
            <>
              <Text as="h2" variant="xs" mb={1}>
                Related Categories
              </Text>

              <Text variant="sm" mb={2}>
                {similar.map((node, i) => {
                  return (
                    <React.Fragment key={node.internalID}>
                      <RouterLink to={node.href}>{node.name}</RouterLink>
                      {i !== similar.length - 1 && ", "}
                    </React.Fragment>
                  )
                })}
              </Text>
            </>
          )}

          {artists.length > 0 && (
            <>
              <Text as="h2" variant="xs" mb={1}>
                Related Artists
              </Text>

              <Text variant="sm">
                {artists.map((node, i) => {
                  return (
                    <React.Fragment key={node.internalID}>
                      <RouterLink to={node.href}>{node.name}</RouterLink>
                      {i !== artists.length - 1 && ", "}
                    </React.Fragment>
                  )
                })}
              </Text>
            </>
          )}
        </Column>
      </GridColumns>

      <Spacer y={12} />

      <GeneArtworkFilterRefetchContainer gene={gene} />
    </>
  )
}
export const GeneShowFragmentContainer = createFragmentContainer(GeneShow, {
  gene: graphql`
    fragment GeneShow_gene on Gene
      @argumentDefinitions(
        input: { type: "FilterArtworksInput" }
        aggregations: { type: "[ArtworkAggregation]" }
        shouldFetchCounts: { type: "Boolean!", defaultValue: false }
      ) {
      ...GeneMeta_gene
      ...GeneArtworkFilter_gene
        @arguments(
          input: $input
          aggregations: $aggregations
          shouldFetchCounts: $shouldFetchCounts
        )
      internalID
      name
      displayName
      formattedDescription: description(format: HTML)
      similar(first: 10) {
        edges {
          node {
            internalID
            name
            href
          }
        }
      }
      artistsConnection(first: 10) {
        edges {
          node {
            internalID
            name
            href
          }
        }
      }
    }
  `,
})
