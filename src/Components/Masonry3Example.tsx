import { graphql } from "react-relay"

import { Spacer } from "@artsy/palette"
import ArtworkGridItemFragmentContainer from "Components/Artwork/GridItem"
import { Masonry3 } from "Components/Masonry3"
import { Fragment } from "react"
import { RootQueryRenderer } from "System/Relay/RootQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { Masonry3ExampleQuery } from "__generated__/Masonry3ExampleQuery.graphql"

export function Masonry3Example(props: {
  artistID: string
  columnCount?: number
}) {
  return (
    <RootQueryRenderer<Masonry3ExampleQuery>
      query={graphql`
        query Masonry3ExampleQuery($artistID: String!) {
          artist(id: $artistID) {
            artworks: artworksConnection(first: 10) {
              edges {
                node {
                  internalID
                  image {
                    aspectRatio
                  }
                  ...GridItem_artwork
                }
              }
            }
          }
        }
      `}
      variables={{ artistID: props.artistID }}
      render={readyState => {
        if (!readyState.props) return null

        const artworks = extractNodes(readyState.props.artist?.artworks) as any

        const handleLoadMore = () => {
          console.log("Load more")
        }

        return (
          <Masonry3
            data={artworks}
            renderItem={artwork => {
              return (
                <Fragment key={artwork.internalID}>
                  <ArtworkGridItemFragmentContainer artwork={artwork} />

                  <Spacer y={4} />
                </Fragment>
              )
            }}
            onLoadMore={handleLoadMore}
          />
        )
      }}
    />
  )
}
