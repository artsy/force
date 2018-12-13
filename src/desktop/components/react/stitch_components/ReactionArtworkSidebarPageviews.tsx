import React from "react"
import { Box, Separator } from "@artsy/palette"
import { ArtworkSidebarPageviewsQueryRenderer } from "reaction/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPageviews"

export const ReactionArtworkSidebarPageviews = props => {
  return (
    <>
      <Box mt={2} mb={3}>
        <ArtworkSidebarPageviewsQueryRenderer artworkID={props.artworkID} />
      </Box>
      <Separator mb={3} />
    </>
  )
}
