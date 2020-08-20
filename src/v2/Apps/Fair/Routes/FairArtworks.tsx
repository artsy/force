import { Box, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairArtworks_fair } from "v2/__generated__/FairArtworks_fair.graphql"

interface FairArtworksProps {
  fair: FairArtworks_fair
}

const FairArtworks: React.FC<FairArtworksProps> = ({ fair }) => {
  return (
    <Box py={2}>
      <Text variant="text">Artworks</Text>
    </Box>
  )
}

export const FairArtworksFragmentContainer = createFragmentContainer(
  FairArtworks,
  {
    fair: graphql`
      fragment FairArtworks_fair on Fair {
        id
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default FairArtworksFragmentContainer
