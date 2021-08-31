import { Box } from "@artsy/palette"
import { GeneFamily } from "./GeneFamily"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneFamilies_geneFamiliesConnection } from "v2/__generated__/GeneFamilies_geneFamiliesConnection.graphql"
import { extractNodes } from "v2/Utils/extractNodes"

interface GeneFamiliesProps {
  geneFamiliesConnection: GeneFamilies_geneFamiliesConnection
}

const GeneFamilies: React.FC<GeneFamiliesProps> = props => {
  const { geneFamiliesConnection } = props
  const geneFamilies = extractNodes(geneFamiliesConnection)

  return (
    <Box>
      <GeneFamily geneFamily={geneFamilies[0]} />
    </Box>
  )
}

export const GeneFamiliesFragmentContainer = createFragmentContainer(
  GeneFamilies,
  {
    geneFamiliesConnection: graphql`
      fragment GeneFamilies_geneFamiliesConnection on GeneFamilyConnection {
        edges {
          node {
            id
            slug
            name
            genes {
              id
              slug
              name
              displayName
              isPublished
            }
            featuredGeneLinks {
              href
              title
              image {
                url(version: "large_rectangle")
              }
            }
          }
        }
      }
    `,
  }
)
