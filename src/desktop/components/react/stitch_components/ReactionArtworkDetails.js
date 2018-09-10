import React from 'react'
import { ContextProvider } from 'reaction/Artsy'
import { ArtworkDetailsQueryRenderer as Renderer } from 'reaction/Apps/Artwork/Components/ArtworkDetails'
import { data as sd } from 'sharify'

export const ReactionArtworkDetails = props => {
  return (
    <ContextProvider user={sd.CURRENT_USER}>
      <Renderer artworkID={props.artworkID} />
    </ContextProvider>
  )
}
