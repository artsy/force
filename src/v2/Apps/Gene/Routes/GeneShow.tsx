import { Column, GridColumns, HTML, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
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
            {gene.name}
          </Text>

          <FollowGeneButtonFragmentContainer
            gene={gene}
            variant="secondaryOutline"
          />
        </Column>

        <Column span={6}>
          <Text as="h2" variant="xs" textTransform="uppercase" mb={1}>
            About
          </Text>

          <HTML variant="sm" mb={2} html={gene.formattedDescription} />

          {gene.similar?.edges.length > 0 && (
            <>
              <Text as="h2" variant="xs" textTransform="uppercase" mb={1}>
                Related Categories
              </Text>

              <Text variant="sm" mb={2}>
                {gene.similar.edges.map(({ node }, i) => {
                  return (
                    <React.Fragment key={node.internalID}>
                      <RouterLink to={node.href}>{node.name}</RouterLink>
                      {i !== gene.similar.edges.length - 1 && ", "}
                    </React.Fragment>
                  )
                })}
              </Text>
            </>
          )}

          {gene.artistsConnection?.edges.length > 0 && (
            <>
              <Text as="h2" variant="xs" textTransform="uppercase" mb={1}>
                Related Artists
              </Text>

              <Text variant="sm">
                {gene.artistsConnection.edges.map(({ node }, i) => {
                  return (
                    <React.Fragment key={node.internalID}>
                      <RouterLink to={node.href}>{node.name}</RouterLink>
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
      @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
      ...GeneMeta_gene
      ...GeneArtworkFilter_gene @arguments(input: $input)
      ...FollowGeneButton_gene
      name
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
