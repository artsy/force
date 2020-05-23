import React from "react"
import { Box } from "@artsy/palette"
import { ArtistInfoQueryRenderer } from "v2/Apps/Artwork/Components/ArtistInfo"

export const ReactionArtworkArtistInfo = props => {
  return (
    <Box mt={2} mb={6}>
      <ArtistInfoQueryRenderer artistID={props.artistID} />
    </Box>
  )
}
