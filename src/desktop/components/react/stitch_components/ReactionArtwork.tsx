import React from "react"
import { ContextProvider } from "reaction/Artsy"
import { data as sd } from "sharify"
import { Artwork } from "reaction/Components/Artwork"

export const ReactionArtwork = props => {
  return (
    <ContextProvider user={sd.CURRENT_USER}>
      <Artwork {...props} useRelay={false} />
    </ContextProvider>
  )
}
