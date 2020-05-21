import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { RootQueryRenderer } from "v2/Artsy/Relay/RootQueryRenderer"
import Follow from "../Follow"

function ArtistExample(props: { artistID: string }) {
  return (
    <RootQueryRenderer
      query={graphql`
        query ArtistFollowQuery($artistID: String!) {
          artist(id: $artistID) {
            ...Follow_artist
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState =>
        readyState.props && <Follow {...(readyState.props as any)} />
      }
    />
  )
}

storiesOf("Components/Follow Button", module).add(
  "Follow Button (artist)",
  () => {
    return (
      <div>
        <ArtistExample artistID="damon-zucconi" />
      </div>
    )
  }
)
