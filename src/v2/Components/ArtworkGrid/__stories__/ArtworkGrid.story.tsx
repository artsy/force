import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { ArtworkGridQuery } from "v2/__generated__/ArtworkGridQuery.graphql"
import { RootQueryRenderer } from "v2/Artsy/Relay/RootQueryRenderer"
import ArtworkGrid from "../ArtworkGrid"

export function ArtworkGridExample(props: {
  artistID: string
  columnCount?: number
}) {
  return (
    <RootQueryRenderer<ArtworkGridQuery>
      query={graphql`
        query ArtworkGridQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworksConnection(first: 10) {
              ...ArtworkGrid_artworks
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        return (
          readyState.props && (
            <ArtworkGrid {...readyState.props.artist} {...props} />
          )
        )
      }}
    />
  )
}

storiesOf("Components/Artworks/ArtworkGrid", module)
  .add("A typical grid", () => {
    return <ArtworkGridExample artistID="banksy" />
  })
  .add("An empty grid", () => {
    return <ArtworkGridExample artistID="sydney-shen" />
  })
