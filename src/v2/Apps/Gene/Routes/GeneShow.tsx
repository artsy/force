import { Column, GridColumns, HTML, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FollowGeneButtonFragmentContainer } from "v2/Components/FollowButton/FollowGeneButton"
import { GeneShow_gene } from "v2/__generated__/GeneShow_gene.graphql"
import { GeneArtworkFilterRefetchContainer } from "../Components/GeneArtworkFilter"
import { GeneMetaFragmentContainer } from "../Components/GeneMeta"

interface GeneShowProps {
  gene: GeneShow_gene
}

export const GeneShow: React.FC<GeneShowProps> = ({ gene }) => {
  return (
    <>
      <GeneMetaFragmentContainer gene={gene} />

      <GridColumns my={4} gridRowGap={[2, 0]}>
        <Column span={6}>
          <Text as="h1" variant="xl" mb={2}>
            {gene.displayName || gene.name}
          </Text>

          <FollowGeneButtonFragmentContainer
            gene={gene}
            variant="secondaryBlack"
          />
        </Column>

        <Column span={6}>
          <Text as="h2" variant="xs" textTransform="uppercase" mb={1}>
            About
          </Text>
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          <HTML variant="sm" mb={2} html={gene.formattedDescription} />
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          {gene.similar?.edges.length > 0 && (
            <>
              <Text as="h2" variant="xs" textTransform="uppercase" mb={1}>
                Related Categories
              </Text>

              <Text variant="sm" mb={2}>
                {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
                {gene.similar.edges.map(({ node }, i) => {
                  return (
                    <React.Fragment key={node.internalID}>
                      <RouterLink to={node.href}>{node.name}</RouterLink>
                      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
                      {i !== gene.similar.edges.length - 1 && ", "}
                    </React.Fragment>
                  )
                })}
              </Text>
            </>
          )}
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          {gene.artistsConnection?.edges.length > 0 && (
            <>
              <Text as="h2" variant="xs" textTransform="uppercase" mb={1}>
                Related Artists
              </Text>

              <Text variant="sm">
                {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
                {gene.artistsConnection.edges.map(({ node }, i) => {
                  return (
                    <React.Fragment key={node.internalID}>
                      <RouterLink to={node.href}>{node.name}</RouterLink>
                      {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
                      {i !== gene.artistsConnection.edges.length - 1 && ", "}
                    </React.Fragment>
                  )
                })}
              </Text>
            </>
          )}
        </Column>
      </GridColumns>

      <Spacer mt={12} />

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
      ...FollowGeneButton_gene
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
