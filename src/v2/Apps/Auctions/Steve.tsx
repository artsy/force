import React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Steve_viewer } from "v2/__generated__/Steve_viewer.graphql"
import { Steve2FragmentContainer } from "./Steve2"

export interface SteveProps {
  viewer: Steve_viewer
}

const Steve: React.FC<SteveProps> = props => {
  const { viewer } = props

  return (
    <>
      <Text variant="xl" as="h1">
        Steve
      </Text>
      <Text variant="md">
        {viewer.standoutLotsConnection?.edges?.map(
          x => x?.node?.sale?.isClosed
        )}
      </Text>
      {viewer.standoutLotsConnection?.edges?.map(edge => {
        return <Steve2FragmentContainer sale={edge?.node?.sale!} />
      })}
    </>
  )
}

export const SteveFragmentContainer = createFragmentContainer(Steve, {
  viewer: graphql`
    fragment Steve_viewer on Viewer {
      standoutLotsConnection: saleArtworksConnection(
        first: 5
        geneIDs: "highlights-at-auction"
      ) {
        edges {
          node {
            sale {
              isClosed
              ...Steve2_sale
            }
          }
        }
      }
    }
  `,
})
