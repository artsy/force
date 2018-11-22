import React from "react"
import { mapToRelayConnection } from "./utils/mapToRelayConnection"

export const ReactionFillwidth = props => {
  const isClient = typeof window !== "undefined"

  if (isClient) {
    const { Fillwidth } = require("reaction/Components/Artwork/Fillwidth")

    const artworks = mapToRelayConnection(props.artworks) // eslint-disable-line

    return <Fillwidth {...props} artworks={artworks} useRelay={false} />
  } else {
    return ""
  }
}
