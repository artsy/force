import React from "react"
import { graphql } from "react-relay"

export const routes = [
  {
    path: "/artist/:artistID",
    getComponent: () => <div>hi</div>,
    query: graphql`
      query FooQuery($artistID: String!) @raw_response_type {
        artist(id: $artistID) @principalField {
          ...ArtistApp_artist
          ...routes_Artist @relay(mask: false)
        }
      }
    `,
  },
]
