import { Button, Column, GridColumns, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneShow_gene } from "v2/__generated__/GeneShow_gene.graphql"
import { GeneMetaFragmentContainer } from "../Components/GeneMeta"

interface GeneShowProps {
  gene: GeneShow_gene
}

export const GeneShow: React.FC<GeneShowProps> = ({ gene }) => {
  return (
    <>
      <GeneMetaFragmentContainer gene={gene} />

      <GridColumns my={4}>
        <Column span={6} mb={2}>
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

        <Column span={6} mb={2}>
          <Text as="h2" variant="xs" textTransform="uppercase" mb={1}>
            About
          </Text>

          <Text variant="sm" mb={2}>
            {gene.description}
          </Text>

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

              <Text variant="sm" mb={2}>
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
    </>
  )
}
export const GeneShowFragmentContainer = createFragmentContainer(GeneShow, {
  gene: graphql`
    fragment GeneShow_gene on Gene {
      ...GeneMeta_gene
      name
      # TODO: use (format: HTML) once added in Metaphysics
      description
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
