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
        <Column span={6}>
          <Text as="h1" variant="largeTitle" mb={2}>
            {gene.name}
          </Text>

          <Button
            variant="primaryBlack"
            onClick={() => {
              alert("TODO")
            }}
          >
            Follow
          </Button>
        </Column>

        <Column span={6}>
          <Text as="h2" variant="subtitle">
            About
          </Text>

          <Text>{gene.description}</Text>

          {gene.similar?.edges.length > 0 && (
            <>
              <Text as="h2" variant="subtitle" mt={2}>
                Related Categories
              </Text>

              <Text>
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
              <Text as="h2" variant="subtitle" mt={2}>
                Related Artists
              </Text>

              <Text>
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
