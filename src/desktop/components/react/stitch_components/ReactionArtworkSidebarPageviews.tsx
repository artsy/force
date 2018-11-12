import React from "react"
import { Theme, Box, Separator } from "@artsy/palette"
import { ContextProvider } from "reaction/Artsy"
import { ArtworkSidebarPageviewsQueryRenderer } from "reaction/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPageviews"

export const ReactionArtworkSidebarPageviews = props => {
  return (
    <Theme>
      <ContextProvider>
        <Box mt={2} mb={3}>
          <ArtworkSidebarPageviewsQueryRenderer artworkID={props.artworkID} />
        </Box>
        <Separator mb={3} />
      </ContextProvider>
    </Theme>
  )
}
