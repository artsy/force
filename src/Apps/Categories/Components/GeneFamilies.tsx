import { extractNodes } from "Utils/extractNodes"
import { Join, Spacer } from "@artsy/palette"
import type { GeneFamilies_geneFamiliesConnection$data } from "__generated__/GeneFamilies_geneFamiliesConnection.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { GeneFamilyFragmentContainer } from "./GeneFamily"

interface GeneFamiliesProps {
  geneFamiliesConnection: GeneFamilies_geneFamiliesConnection$data
}

const GeneFamilies: React.FC<React.PropsWithChildren<GeneFamiliesProps>> = ({
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
