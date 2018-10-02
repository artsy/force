import React from "react"
import { ContextProvider } from "reaction/Artsy"
import { data as sd } from "sharify"
import { mapToRelayConnection } from "./utils/mapToRelayConnection"

export const ReactionFillwidth = props => {
  const isClient = typeof window !== "undefined"

  if (isClient) {
    const { Fillwidth } = require("reaction/Components/Artwork/Fillwidth")

    const artworks = mapToRelayConnection(props.artworks) // eslint-disable-line

    return (
      <ContextProvider user={sd.CURRENT_USER}>
        <Fillwidth {...props} artworks={artworks} useRelay={false} />
      </ContextProvider>
    )
  } else {
    return ""
  }
}
