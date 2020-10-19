import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

const ConsignApp = props => {
  return <div>hello consign app {props.artist.name}</div>
}

export default createFragmentContainer(ConsignApp, {
  artist: graphql`
    fragment ConsignApp_artist on Artist {
      name
    }
  `,
})
