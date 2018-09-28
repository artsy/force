import React from "react"
import { Theme } from "@artsy/palette"
import { ContextProvider } from "reaction/Artsy"
import { ArtworkDetailsQueryRenderer } from "reaction/Apps/Artwork/Components/ArtworkDetails"
import { data as sd } from "sharify"

export const ReactionArtworkDetails = props => {
  return (
    <Theme>
      <ContextProvider user={sd.CURRENT_USER}>
        <ArtworkDetailsQueryRenderer artworkID={props.artworkID} />
      </ContextProvider>
    </Theme>
  )
}
