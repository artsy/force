import { Button, Column, GridColumns, HTML, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
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

          <Button
            variant="secondaryOutline"
            onClick={() => {
              alert("TODO")
            }}
          >
            Follow
          </Button>
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
                      <a href="#example">{node.name}</a>
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
                      <a href="#example">{node.name}</a>
                      {i !== gene.artistsConnection.edges.length - 1 && ", "}
                    </React.Fragment>
                  )
                })}
              </Text>
            </>
          )}
        </Column>
      </GridColumns>

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
      name
      formattedDescription: description(format: HTML)
      similar(first: 10) {
        edges {
          node {
            internalID
            name
          }
        }
      }
      artistsConnection(first: 10) {
        edges {
          node {
            internalID
            name
          }
        }
      }
    }
  `,
})
