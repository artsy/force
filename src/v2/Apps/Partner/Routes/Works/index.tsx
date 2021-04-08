import React from "react"
import { Box, GridColumns, Column } from "@artsy/palette"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { Works_partner } from "v2/__generated__/Works_partner.graphql"

interface ArtworksProps {
  partner: Works_partner
}

export const Works: React.FC<ArtworksProps> = ({ partner }) => {
  const { artworksConnection } = partner
  return (
    <Box mt={126}>
      <GridColumns mt={6} gridRowGap={[2, 4]}>
        <Column span={3}>Filters would be here</Column>
        <Column span={9}>
          <ArtworkGrid
            artworks={artworksConnection}
            columnCount={[2, 2, 3, 3]}
            preloadImageCount={0}
          />
        </Column>
      </GridColumns>
    </Box>
  )
}

export const WorksFragmentContainer = createFragmentContainer(Works, {
  partner: graphql`
    fragment Works_partner on Partner
      @argumentDefinitions(first: { type: "Int", defaultValue: 15 }) {
      slug
      artworksConnection(first: $first)
        @connection(key: "ArtworksQuery_artworksConnection") {
        ...ArtworkGrid_artworks

        # So we know whether or not to render the grid.
        edges {
          node {
            id
          }
        }
      }
    }
  `,
})
