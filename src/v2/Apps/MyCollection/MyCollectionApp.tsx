import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionApp_me } from "v2/__generated__/MyCollectionApp_me.graphql"
import { MyCollectionArtworksQueryRenderer } from "./Components/MyCollectionArtworks"

interface MyCollectionAppProps {
  me: MyCollectionApp_me
}

const MyCollectionApp: React.FC<MyCollectionAppProps> = ({ me }) => {
  return <MyCollectionArtworksQueryRenderer />
}

export const MyCollectionAppFragmentContainer = createFragmentContainer(
  MyCollectionApp,
  {
    me: graphql`
      fragment MyCollectionApp_me on Me {
        name
      }
    `,
  }
)
