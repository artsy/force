import { Join, Spacer } from "@artsy/palette"
import { GeneFamilyFragmentContainer } from "./GeneFamily"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneFamilies_geneFamiliesConnection$data } from "__generated__/GeneFamilies_geneFamiliesConnection.graphql"
import { extractNodes } from "Utils/extractNodes"

interface GeneFamiliesProps {
  geneFamiliesConnection: GeneFamilies_geneFamiliesConnection$data
}

const GeneFamilies: React.FC<GeneFamiliesProps> = ({
  geneFamiliesConnection,
}) => {
  const geneFamilies = extractNodes(geneFamiliesConnection)

  return (
    <Join separator={<Spacer y={6} />}>
      {geneFamilies.map(geneFamily => {
        return (
          <GeneFamilyFragmentContainer
            key={geneFamily.internalID}
            geneFamily={geneFamily}
          />
        )
      })}
    </Join>
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
