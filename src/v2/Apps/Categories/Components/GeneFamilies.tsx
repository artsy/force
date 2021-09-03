import { Box } from "@artsy/palette"
import { GeneFamilyFragmentContainer } from "./GeneFamily"
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
      {geneFamilies.map(geneFamily => {
        return (
          <GeneFamilyFragmentContainer
            geneFamily={geneFamily}
            key={geneFamily.internalID}
          />
        )
      })}
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
            internalID
            ...GeneFamily_geneFamily
          }
        }
      }
    `,
  }
)
