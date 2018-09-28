import React from "react"
import { Theme } from "@artsy/palette"
import { ContextProvider } from "reaction/Artsy"
import { ArtistInfoQueryRenderer } from "reaction/Apps/Artwork/Components/ArtistInfo"
import { data as sd } from "sharify"

export const ReactionArtworkArtistInfo = _props => {
  return (
    <Theme>
      <ContextProvider user={sd.CURRENT_USER}>
        <ArtistInfoQueryRenderer artistID={"pablo-picasso"} />
      </ContextProvider>
    </Theme>
  )
}
