import React from "react"
// @ts-ignore
import mediator from "desktop/lib/mediator.coffee"
import { Theme, Box } from "@artsy/palette"
import { ContextProvider } from "reaction/Artsy"
import { ArtistInfoQueryRenderer } from "reaction/Apps/Artwork/Components/ArtistInfo"
import { data as sd } from "sharify"

export const ReactionArtworkArtistInfo = props => {
  return (
    <Theme>
      <ContextProvider user={sd.CURRENT_USER} mediator={mediator}>
        <Box mt={2} mb={6}>
          <ArtistInfoQueryRenderer artistID={props.artistID} />
        </Box>
      </ContextProvider>
    </Theme>
  )
}
