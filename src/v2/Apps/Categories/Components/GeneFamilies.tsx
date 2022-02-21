import { Box, Spacer } from "@artsy/palette"
import { GeneFamilyFragmentContainer } from "./GeneFamily"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneFamilies_geneFamiliesConnection$data } from "v2/__generated__/GeneFamilies_geneFamiliesConnection.graphql"
import { extractNodes } from "v2/Utils/extractNodes"

interface GeneFamiliesProps {
  geneFamiliesConnection: GeneFamilies_geneFamiliesConnection$data
}

const GeneFamilies: React.FC<GeneFamiliesProps> = props => {
  const { geneFamiliesConnection } = props
  const geneFamilies = extractNodes(geneFamiliesConnection)

  return (
    <Box>
      {geneFamilies.map(geneFamily => {
        return (
          <Box key={geneFamily.internalID}>
            <GeneFamilyFragmentContainer geneFamily={geneFamily} />
            <Spacer mt={6} />
          </Box>
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
