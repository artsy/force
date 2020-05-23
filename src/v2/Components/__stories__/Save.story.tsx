import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "v2/Artsy/Relay/RootQueryRenderer"
import GridItem from "../Artwork/GridItem"

function ArtworkExample(props: { artworkID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query SaveArtworkQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...GridItem_artwork
          }
        }
      `}
      variables={{ artworkID: props.artworkID }}
      render={readyState =>
        readyState.props && <GridItem {...(readyState.props as any)} />
      }
    />
  )
}

storiesOf("Components/Save Button", module).add("Save Button", () => {
  return (
    <div style={{ width: "200px" }}>
      <ArtworkExample artworkID="damon-zucconi-tetradic-edit-1" />
    </div>
  )
})
