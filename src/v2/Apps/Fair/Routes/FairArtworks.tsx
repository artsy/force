import { Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairArtworks_fair } from "v2/__generated__/FairArtworks_fair.graphql"
import { FairAboveFoldFragmentContainer as FairAboveFold } from "../Components/FairAboveFold"

interface FairArtworksProps {
  fair: FairArtworks_fair
}

const FairArtworks: React.FC<FairArtworksProps> = ({ fair }) => {
  return (
    <>
      <FairAboveFold fair={fair} />

      <Text mt={1}>Artworks</Text>
    </>
  )
}

export const FairArtworksFragmentContainer = createFragmentContainer(
  FairArtworks,
  {
    fair: graphql`
      fragment FairArtworks_fair on Fair {
        ...FairAboveFold_fair
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default FairArtworksFragmentContainer
